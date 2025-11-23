"use client";

import { ModelCard } from "@/types/model";

function generateMarkdown(model: ModelCard): string {
  return `# Model Card: ${model.name}

## Model Details

- **Name**: ${model.name}
- **Version**: ${model.version}
- **Organization**: ${model.organization}
- **License**: ${model.license}
- **Release Date**: ${model.releaseDate}
- **Architecture**: ${model.architecture}
- **Parameters**: ${model.parameters}
- **Framework**: ${model.framework}

## Description

${model.description}

## Training Data

${model.trainingData}

## Intended Use Cases

${model.useCases.map((useCase) => `- ${useCase}`).join("\n")}

## Limitations

${model.limitations.map((limitation) => `- ${limitation}`).join("\n")}

## Performance Metrics

${model.performance
  .map(
    (metric) =>
      `- **${metric.metric}**: ${metric.value} (Dataset: ${metric.dataset})`
  )
  .join("\n")}

## Model Rating

**Rating**: ${model.rating}

${
  model.rating === 'AAA' || model.rating === 'AA' || model.rating === 'A'
    ? "Excellent to Good rating - Model demonstrates strong performance and reliability."
    : model.rating === 'BBB' || model.rating === 'BB' || model.rating === 'B'
    ? "Moderate to Average rating - Model shows acceptable performance with some limitations."
    : "Below Standard rating - Model may have significant limitations or concerns."
}

## Tags

${model.tags.map((tag) => `- ${tag}`).join("\n")}

## Download Links

- **Model**: ${model.downloadLinks.model}
- **Documentation**: ${model.downloadLinks.documentation}

${
  model.citations && model.citations.length > 0
    ? `## Citations\n\n${model.citations.map((citation) => `- ${citation}`).join("\n")}`
    : ""
}

${
  model.resources && model.resources.length > 0
    ? `## Information Sources\n\nThe following resources were used to gather information for this model card:\n\n${model.resources.map((resource) => `- **${resource.title}** (${resource.type}): ${resource.url}`).join("\n")}`
    : ""
}

---
*Generated from Model Cards Repository*
`;
}

export default function DownloadButtons({ model }: { model: ModelCard }) {
  const downloadMarkdown = () => {
    const markdown = generateMarkdown(model);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${model.id}-model-card.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    const json = JSON.stringify(model, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${model.id}-model-card.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={downloadMarkdown}
        className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Download Markdown
      </button>
      <button
        onClick={downloadJSON}
        className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
      >
        Download JSON
      </button>
    </div>
  );
}

