// Load environment variables from .env file
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';

import { models } from '@/data/list-models';
import { proposedFramework } from '@/data/framework';
import Perplexity from '@perplexity-ai/perplexity_ai';
import OpenAI from 'openai';

const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
if (!perplexityApiKey) {
  console.error('Error: PERPLEXITY_API_KEY environment variable is not set');
  process.exit(1);
}

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error('Error: OPENAI_API_KEY environment variable is not set');
  process.exit(1);
}

const perplexityClient = new Perplexity({ apiKey: perplexityApiKey });
const openaiClient = new OpenAI({ apiKey: openaiApiKey });

// Logging system for API calls
const apiLogs: any[] = [];
let logFilepath: string | null = null;

async function initializeLogging() {
  const logsDir = path.join(process.cwd(), 'scraper', 'logs');
  await fs.mkdir(logsDir, { recursive: true });
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  logFilepath = path.join(logsDir, `api-calls_${timestamp}.json`);
  
  console.log(`API logs will be saved to: ${logFilepath}\n`);
}

function logApiCall(service: 'perplexity' | 'openai', type: 'request' | 'response', data: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    service,
    type,
    data: JSON.parse(JSON.stringify(data)) // Deep clone to avoid reference issues
  };
  
  apiLogs.push(logEntry);
  
  // Also log to console for immediate visibility
  if (type === 'request') {
    console.log(`\n[${service.toUpperCase()}] ${type.toUpperCase()}:`, JSON.stringify(data, null, 2).substring(0, 500));
  }
}

async function saveLogs() {
  if (logFilepath) {
    await fs.writeFile(logFilepath, JSON.stringify(apiLogs, null, 2));
    console.log(`\nAll API logs saved to: ${logFilepath}`);
    console.log(`   Total API calls logged: ${apiLogs.length}`);
  }
}

// Search query for Perplexity
function createSearchQuery(
  modelName: string,
  provider: string,
  sectionName: string,
  subsectionNames: string[]
): string {
  const subsectionsList = subsectionNames.join(', ');
  
  return `Find official model card documentation and technical details
          for ${modelName} by ${provider}, focusing on "${sectionName}"
          such as ${subsectionsList}. Include authoritative links to documentation,
          technical papers, GitHub, APIs, model cards, release notes, or blog posts
          from ${provider} and trusted sources.`;
}

// Score subsections across all aggregated resources using ChatGPT
async function checkSubsectionsAggregate(
  resources: Array<{ title: string; url: string; snippet: string }>,
  subsectionNames: string[],
  modelName: string,
  sectionName: string
): Promise<Record<string, { score: number; explanation: string }>> {
  // Combine all snippets and URLs into one aggregated text
  const resourcesText = resources.map((resource, index) => 
    `Resource ${index + 1}:\nTitle: ${resource.title}\nURL: ${resource.url}\nContent:\n${resource.snippet}\n\n`
  ).join('---\n\n');
  
  const subsectionList = subsectionNames.map((name, index) => `${index + 1}. ${name}`).join('\n');
  
  const prompt = `You are analyzing model card documentation for ${modelName}, specifically the "${sectionName}" section.
  You have been provided with multiple resources (documentation, articles, model cards, etc.) that contain information about this model.
  Analyze ALL resources together as an aggregate to determine if each subsection is mentioned or discussed across any of these resources.
  Subsections to check:
  ${subsectionList}
  Aggregated Resources:
  ${resourcesText}
  For each subsection, return:
  - score: 1 if it is mentioned or discussed in ANY of the provided resources, or 0 if it is not mentioned in any resource.
  - explanation: If score is 1, provide a direct quote (30 words or less) from the resources that mentions this subsection. 
  If score is 0, use exactly: "did not mention this idea"
  
  Respond ONLY with a JSON object in this exact format:
  {
    "${subsectionNames[0]}": {
      "score": 0 or 1,
      "explanation": "quote or 'did not mention this idea'"
    },
    "${subsectionNames[1]}": {
      "score": 0 or 1,
      "explanation": "quote or 'did not mention this idea'"
    },
    ...
  }
  Do not include any other text, only the JSON object.`;
  
  try {
    const messages = [
      {
        role: 'system' as const,
        content: 'You are a helpful assistant that analyzes aggregated text from multiple sources and returns JSON responses only.'
      },
      {
        role: 'user' as const,
        content: prompt
      }
    ];
    
    // Log OpenAI API request
    logApiCall('openai', 'request', {
      model: 'gpt-4o-mini',
      messages: messages.map(m => ({ role: m.role, content: m.content.substring(0, 500) + '...' })),
      response_format: { type: 'json_object' },
      temperature: 0.1,
      promptLength: prompt.length,
      resourcesCount: resources.length
    });
    
    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      response_format: { type: 'json_object' },
      temperature: 0.1
    });

    const responseContent = completion.choices[0]?.message?.content || '{}';
    
    // Log OpenAI API response
    logApiCall('openai', 'response', {
      model: completion.model,
      usage: completion.usage,
      responseLength: responseContent.length,
      responsePreview: responseContent.substring(0, 500)
    });
    
    const checks = JSON.parse(responseContent);
    
    // Ensure all subsections are included with proper structure
    const result: Record<string, { score: number; explanation: string }> = {};
    subsectionNames.forEach(name => {
      if (checks[name] && typeof checks[name] === 'object') {
        result[name] = {
          score: checks[name].score === 1 ? 1 : 0,
          explanation: checks[name].explanation || (checks[name].score === 1 ? 'mentioned' : 'did not mention this idea')
        };
      } else {
        // Fallback for old format or missing data
        result[name] = {
          score: checks[name] === 1 ? 1 : 0,
          explanation: checks[name] === 1 ? 'mentioned' : 'did not mention this idea'
        };
      }
    });
    
    return result;
  } catch (error) {
    console.error(`  Error checking subsections: ${error instanceof Error ? error.message : 'Unknown error'}`);
    // Return all zeros with default explanations if there's an error
    const result: Record<string, { score: number; explanation: string }> = {};
    subsectionNames.forEach(name => {
      result[name] = {
        score: 0,
        explanation: 'did not mention this idea'
      };
    });
    return result;
  }
}

async function runSearch() {
  // Initialize logging
  await initializeLogging();
  
  const allResults: Array<{ model: string; provider: string; type: string; sections: any[] }> = [];
  
  console.log(`Processing ${models.length} models`);
  console.log(`Total Sections per model: ${proposedFramework.sections.length}\n`);
  
  // Iterate through all models
  for (const model of models) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Processing Model: ${model.name} (${model.provider})`);
    console.log(`${'='.repeat(80)}\n`);
    
    const modelSections: any[] = [];
    
    // Iterate through all sections for this model
    for (const section of proposedFramework.sections) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Processing Section: ${section.name} (${section.id})`);
    console.log(`${'='.repeat(60)}\n`);
    
    // Collect all subsection names for this section into an array
    const subsectionNames = section.subsections.map(subsection => subsection.name);
    
    // Create one search prompt with all subsections
    const searchQuery = createSearchQuery(model.name, model.provider, section.name, subsectionNames);
    console.log(`Search Query:\n${searchQuery}\n`);

    // Log Perplexity API request
    const perplexityRequest = {
      query: searchQuery,
      max_results: 5,
      max_tokens_per_page: 1024
    };
    logApiCall('perplexity', 'request', perplexityRequest);
    
    const search = await perplexityClient.search.create(perplexityRequest);
    
    // Log Perplexity API response
    logApiCall('perplexity', 'response', {
      resultsCount: search.results.length,
      results: search.results.map(r => ({
        title: r.title,
        url: r.url,
        snippetLength: r.snippet?.length || 0
      }))
    });

    console.log(`Found ${search.results.length} results:\n`);
    
    // Collect all resources (snippets and URLs)
    const resources = search.results.map((result, index) => ({
      snippetId: `${section.id}-snippet-${index + 1}`,
      url: result.url,
      snippet: result.snippet || ''
    }));
    
    // Display all resources
    resources.forEach((resource, index) => {
      console.log(`${index + 1}. ${resource.url}`);
    });
    
    console.log(`\nAnalyzing all resources together for aggregate subsection evaluation...\n`);
    
    // Check subsections across ALL resources aggregated
    const aggregateSubsectionChecks = await checkSubsectionsAggregate(
      resources.map(r => ({ title: '', url: r.url, snippet: r.snippet })),
      subsectionNames,
      model.name,
      section.name
    );
    
    // Convert subsectionChecks from object to array format
    const subsectionChecksArray = Object.entries(aggregateSubsectionChecks).map(([name, data]) => ({
      name,
      score: data.score,
      explanation: data.explanation
    }));
    
    // Create section result with new structure
    const sectionResult = {
      sectionId: section.id,
      sectionSnippets: resources,
      subsectionChecks: subsectionChecksArray
    };
    
    console.log(`Aggregate Subsection Checks:`, aggregateSubsectionChecks);
    
    modelSections.push(sectionResult);
    
    // Add delay between sections to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
    }
    
    // Push model data to results array
    allResults.push({
      model: model.name,
      provider: model.provider,
      type: model.type,
      sections: modelSections
    });
    
    console.log(`\n Completed processing ${model.name}: ${modelSections.length} sections`);
    
    // Add delay between models to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 second delay between models
  }
  
  // Save all results to JSON file
  const outputDir = path.join(process.cwd(), 'scraper', 'results');
  await fs.mkdir(outputDir, { recursive: true });
  
  const filename = `${models.length}-models-scraped_${Date.now()}.json`;
  const filepath = path.join(outputDir, filename);
  
  await fs.writeFile(filepath, JSON.stringify(allResults, null, 2));
  console.log(`\n${'='.repeat(80)}`);
  console.log(`All results saved to: ${filepath}`);
  console.log(`Total models processed: ${allResults.length}`);
  console.log(`Total sections across all models: ${allResults.reduce((sum, m) => sum + m.sections.length, 0)}`);
  console.log(`${'='.repeat(80)}`);
  
  // Save all API logs
  await saveLogs();
  
  return allResults;
}

runSearch().catch((error) => {
  console.error('Error running search:', error);
  process.exit(1);
});

