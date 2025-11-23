"use client";

import { useState, useRef, useEffect } from "react";
import { ModelCard } from "@/types/model";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatInterface({ model }: { model: ModelCard }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I can help you learn about ${model.name} based on the information in the model card. You can ask me about:\n\n• Model details (architecture, parameters, framework)\n• Performance metrics\n• Use cases and limitations\n• Training data\n• Model rating\n• Resources and citations\n\nWhat would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API call - In production, this would call the actual model API
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(input.trim(), model),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: `Hello! I can help you learn about ${model.name} based on the information in the model card. You can ask me about:\n\n• Model details (architecture, parameters, framework)\n• Performance metrics\n• Use cases and limitations\n• Training data\n• Model rating\n• Resources and citations\n\nWhat would you like to know?`,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs mt-1 opacity-60">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the model card information... (Press Enter to send, Shift+Enter for new line)"
              className="w-full px-4 py-3 pr-12 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 max-h-32 overflow-y-auto"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
          <button
            onClick={clearChat}
            className="px-4 py-3 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            title="Clear chat"
          >
            Clear
          </button>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 text-center">
          Ask questions about the {model.name} model card information gathered from the resources.
        </p>
      </div>
    </div>
  );
}

// Response generator based on model card information
function generateResponse(userInput: string, model: ModelCard): string {
  const lowerInput = userInput.toLowerCase();
  
  // Greetings
  if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
    return `Hello! I can help you learn about ${model.name} based on the model card information. What would you like to know?`;
  }
  
  // Model details
  if (lowerInput.includes("what is") || lowerInput.includes("tell me about") || lowerInput.includes("describe")) {
    if (lowerInput.includes("architecture")) {
      return `According to the model card, ${model.name} uses a ${model.architecture} architecture with ${model.parameters} parameters. The model is built using the ${model.framework} framework.`;
    }
    if (lowerInput.includes("parameters") || lowerInput.includes("size")) {
      return `Based on the model card, ${model.name} has ${model.parameters} parameters and uses the ${model.framework} framework.`;
    }
    return `According to the model card, ${model.name} is ${model.description}`;
  }
  
  // Architecture and technical details
  if (lowerInput.includes("architecture") || lowerInput.includes("framework")) {
    return `From the model card:\n\n• Architecture: ${model.architecture}\n• Parameters: ${model.parameters}\n• Framework: ${model.framework}\n• License: ${model.license}\n• Release Date: ${model.releaseDate}`;
  }
  
  // Capabilities and use cases
  if (lowerInput.includes("capabilities") || lowerInput.includes("what can") || lowerInput.includes("use cases") || lowerInput.includes("use case")) {
    return `According to the model card, ${model.name} is designed for the following use cases:\n\n${model.useCases.map((uc, i) => `${i + 1}. ${uc}`).join("\n")}\n\nPerformance metrics from the card:\n${model.performance.map(p => `• ${p.metric}: ${p.value} (${p.dataset})`).join("\n")}`;
  }
  
  // Limitations
  if (lowerInput.includes("limitations") || lowerInput.includes("limitation") || lowerInput.includes("constraints") || lowerInput.includes("weaknesses")) {
    return `The model card lists the following limitations for ${model.name}:\n\n${model.limitations.map((lim, i) => `${i + 1}. ${lim}`).join("\n")}\n\nIt's important to be aware of these when using the model.`;
  }
  
  // Performance metrics
  if (lowerInput.includes("performance") || lowerInput.includes("metrics") || lowerInput.includes("benchmark") || lowerInput.includes("scores")) {
    return `Performance metrics for ${model.name} according to the model card:\n\n${model.performance.map(p => `• **${p.metric}**: ${p.value}\n  Dataset: ${p.dataset}`).join("\n\n")}`;
  }
  
  // Training data
  if (lowerInput.includes("training") || lowerInput.includes("trained on") || lowerInput.includes("data")) {
    return `According to the model card, ${model.name} was trained on: ${model.trainingData}`;
  }
  
  // Rating
  if (lowerInput.includes("rating") || lowerInput.includes("rate") || lowerInput.includes("grade")) {
    const ratingDescription = 
      model.rating === 'AAA' ? "Excellent - demonstrates outstanding performance and reliability" :
      model.rating === 'AA' ? "Very Good - shows strong performance with high reliability" :
      model.rating === 'A' ? "Good - demonstrates solid performance" :
      model.rating === 'BBB' ? "Moderate - shows acceptable performance with some limitations" :
      model.rating === 'BB' ? "Below Average - has notable limitations" :
      model.rating === 'B' ? "Average - meets basic standards with limitations" :
      "Below Standard - has significant limitations or concerns";
    
    return `The model rating for ${model.name} is ${model.rating}, which indicates ${ratingDescription}.`;
  }
  
  // Resources and citations
  if (lowerInput.includes("resources") || lowerInput.includes("sources") || lowerInput.includes("where") || lowerInput.includes("citation")) {
    let response = `Information sources for ${model.name}:\n\n`;
    
    if (model.resources && model.resources.length > 0) {
      response += `**Resources:**\n${model.resources.map((r, i) => `${i + 1}. ${r.title} (${r.type}): ${r.url}`).join("\n")}\n\n`;
    }
    
    if (model.citations && model.citations.length > 0) {
      response += `**Citations:**\n${model.citations.map((c, i) => `${i + 1}. ${c}`).join("\n")}`;
    }
    
    return response;
  }
  
  // Organization and version
  if (lowerInput.includes("organization") || lowerInput.includes("who made") || lowerInput.includes("created by") || lowerInput.includes("developer")) {
    return `According to the model card, ${model.name} was developed by ${model.organization} and is currently at version ${model.version}. It was released on ${model.releaseDate}.`;
  }
  
  // License
  if (lowerInput.includes("license") || lowerInput.includes("licensing") || lowerInput.includes("open source")) {
    return `The model card indicates that ${model.name} is licensed under: ${model.license}`;
  }
  
  // Tags
  if (lowerInput.includes("tags") || lowerInput.includes("categories") || lowerInput.includes("type")) {
    return `The model card tags ${model.name} as: ${model.tags.join(", ")}`;
  }
  
  // Download links
  if (lowerInput.includes("download") || lowerInput.includes("where to get") || lowerInput.includes("access")) {
    return `According to the model card, you can access ${model.name}:\n\n• Model: ${model.downloadLinks.model}\n• Documentation: ${model.downloadLinks.documentation}`;
  }
  
  // General help
  if (lowerInput.includes("help") || lowerInput.includes("what can you tell")) {
    return `I can answer questions about ${model.name} based on the model card information. You can ask about:\n\n• Model details (architecture, parameters, framework)\n• Performance metrics and benchmarks\n• Use cases and capabilities\n• Limitations and constraints\n• Training data\n• Model rating\n• Resources and citations\n• License and organization\n• Download links\n\nWhat would you like to know?`;
  }
  
  // Default response - try to extract key information
  const keywords = ["architecture", "parameters", "performance", "limitations", "use cases", "training", "rating", "license", "organization"];
  const foundKeywords = keywords.filter(kw => lowerInput.includes(kw));
  
  if (foundKeywords.length > 0) {
    return `I found information about ${foundKeywords.join(", ")} in the model card. Could you be more specific about what you'd like to know? For example:\n\n• "What is the architecture?"\n• "What are the performance metrics?"\n• "What are the limitations?"\n• "What is the model rating?"`;
  }
  
  // Default fallback
  return `I can help you find information about ${model.name} from the model card. Try asking about:\n\n• Model architecture and parameters\n• Performance metrics\n• Use cases and limitations\n• Training data\n• Model rating\n• Resources and citations\n\nWhat specific information are you looking for?`;
}

