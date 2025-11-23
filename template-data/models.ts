// This is for future work.
export interface ModelCard {
  id: string;
  name: string;
  description: string;
  version: string;
  organization: string;
  license: string;
  releaseDate: string;
  architecture: string;
  parameters: string;
  trainingData: string;
  useCases: string[];
  limitations: string[];
  performance: {
    metric: string;
    value: string;
    dataset: string;
  }[];
  rating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC' | 'CC' | 'C'; // Model rating scale (AAA = highest, C = lowest)
  framework: string;
  downloadLinks: {
    model: string;
    documentation: string;
  };
  citations?: string[];
  resources?: {
    title: string;
    url: string;
    type: 'Documentation' | 'Paper' | 'Blog' | 'GitHub' | 'Other';
  }[];
  tags: string[];
  featured?: boolean; // Whether this model is featured on the homepage
}


export const models: ModelCard[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'A large multimodal model capable of understanding and generating text and images. GPT-4 demonstrates improved performance on various benchmarks and better alignment with human values.',
    version: '4.0',
    organization: 'OpenAI',
    license: 'Proprietary',
    releaseDate: '2023-03-14',
    architecture: 'Transformer',
    parameters: '~1.7T',
    trainingData: 'Large-scale text and code data from internet',
    useCases: [
      'Natural language understanding',
      'Code generation',
      'Creative writing',
      'Question answering',
      'Translation'
    ],
    limitations: [
      'May generate incorrect information',
      'Limited knowledge cutoff date',
      'Can be verbose or repetitive',
      'May exhibit biases from training data'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '86.4%',
        dataset: 'Massive Multitask Language Understanding'
      },
      {
        metric: 'HellaSwag',
        value: '95.3%',
        dataset: 'Commonsense reasoning'
      },
      {
        metric: 'HumanEval',
        value: '67.0%',
        dataset: 'Python code generation'
      }
    ],
    rating: 'BBB',
    framework: 'PyTorch',
    downloadLinks: {
      model: 'https://platform.openai.com/docs/models/gpt-4',
      documentation: 'https://platform.openai.com/docs/models/gpt-4'
    },
    citations: [
      'OpenAI. (2023). GPT-4 Technical Report. arXiv:2303.08774'
    ],
    resources: [
      {
        title: 'GPT-4 Technical Report',
        url: 'https://arxiv.org/abs/2303.08774',
        type: 'Paper'
      },
      {
        title: 'OpenAI GPT-4 Documentation',
        url: 'https://platform.openai.com/docs/models/gpt-4',
        type: 'Documentation'
      },
      {
        title: 'GPT-4 System Card',
        url: 'https://openai.com/research/gpt-4',
        type: 'Documentation'
      }
    ],
    tags: ['NLP', 'Multimodal', 'Large Language Model', 'Transformer'],
    featured: true
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Anthropic\'s most capable model, designed for complex tasks requiring deep understanding and nuanced reasoning. Features improved safety and helpfulness.',
    version: '3.0',
    organization: 'Anthropic',
    license: 'Proprietary',
    releaseDate: '2024-03-04',
    architecture: 'Transformer',
    parameters: 'Not disclosed',
    trainingData: 'Curated high-quality text data',
    useCases: [
      'Complex reasoning',
      'Long-form content generation',
      'Analysis and synthesis',
      'Code review and generation',
      'Research assistance'
    ],
    limitations: [
      'Knowledge cutoff limitations',
      'May refuse certain requests',
      'Can be slow for real-time applications',
      'Limited multimodal capabilities'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '86.8%',
        dataset: 'Massive Multitask Language Understanding'
      },
      {
        metric: 'GPQA',
        value: '59.4%',
        dataset: 'Graduate-level questions'
      },
      {
        metric: 'HumanEval',
        value: '84.9%',
        dataset: 'Python code generation'
      }
    ],
    rating: 'A',
    framework: 'Custom',
    downloadLinks: {
      model: 'https://www.anthropic.com/claude',
      documentation: 'https://docs.anthropic.com/claude/docs'
    },
    citations: [
      'Anthropic. (2024). Claude 3 Model Card.'
    ],
    resources: [
      {
        title: 'Claude 3 Model Documentation',
        url: 'https://docs.anthropic.com/claude/docs',
        type: 'Documentation'
      },
      {
        title: 'Claude 3 Announcement',
        url: 'https://www.anthropic.com/news/claude-3-family',
        type: 'Blog'
      },
      {
        title: 'Claude 3 Model Card',
        url: 'https://www.anthropic.com/research/claude-3-model-card',
        type: 'Documentation'
      }
    ],
    tags: ['NLP', 'Safety', 'Reasoning', 'Large Language Model'],
    featured: true
  },
  {
    id: 'llama-3-70b',
    name: 'LLaMA 3 70B',
    description: 'Meta\'s open-source large language model with 70 billion parameters. Designed for research and commercial use with permissive licensing.',
    version: '3.0',
    organization: 'Meta',
    license: 'Llama 3 Community License',
    releaseDate: '2024-04-18',
    architecture: 'Transformer',
    parameters: '70B',
    trainingData: '15T tokens from publicly available sources',
    useCases: [
      'Research and experimentation',
      'Commercial applications',
      'Fine-tuning for specific tasks',
      'Educational purposes',
      'Open-source development'
    ],
    limitations: [
      'Requires significant computational resources',
      'May require fine-tuning for specific tasks',
      'Training data biases may be present',
      'Limited safety training compared to proprietary models'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '79.6%',
        dataset: 'Massive Multitask Language Understanding'
      },
      {
        metric: 'HumanEval',
        value: '81.7%',
        dataset: 'Python code generation'
      },
      {
        metric: 'GSM-8K',
        value: '87.8%',
        dataset: 'Grade school math'
      }
    ],
    rating: 'AA',
    framework: 'PyTorch',
    downloadLinks: {
      model: 'https://huggingface.co/meta-llama/Meta-Llama-3-70B',
      documentation: 'https://llama.meta.com/llama3/'
    },
    citations: [
      'Meta AI. (2024). Llama 3 Model Card.'
    ],
    resources: [
      {
        title: 'Llama 3 Official Website',
        url: 'https://llama.meta.com/llama3/',
        type: 'Documentation'
      },
      {
        title: 'Llama 3 on Hugging Face',
        url: 'https://huggingface.co/meta-llama/Meta-Llama-3-70B',
        type: 'GitHub'
      },
      {
        title: 'Llama 3 Blog Post',
        url: 'https://ai.meta.com/blog/meta-llama-3/',
        type: 'Blog'
      },
      {
        title: 'Llama 3 GitHub Repository',
        url: 'https://github.com/meta-llama/llama3',
        type: 'GitHub'
      }
    ],
    tags: ['Open Source', 'NLP', 'Large Language Model', 'Research'],
    featured: true
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Google\'s multimodal AI model capable of understanding text, images, audio, and video. Optimized for various tasks across different modalities.',
    version: '1.0',
    organization: 'Google DeepMind',
    license: 'Proprietary',
    releaseDate: '2023-12-06',
    architecture: 'Transformer',
    parameters: 'Not disclosed',
    trainingData: 'Multimodal data including text, images, audio, video',
    useCases: [
      'Multimodal understanding',
      'Image analysis',
      'Video understanding',
      'Code generation',
      'Scientific research'
    ],
    limitations: [
      'May generate inaccurate information',
      'Limited real-time capabilities',
      'API rate limits',
      'May struggle with very long contexts'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '83.7%',
        dataset: 'Massive Multitask Language Understanding'
      },
      {
        metric: 'HellaSwag',
        value: '87.8%',
        dataset: 'Commonsense reasoning'
      },
      {
        metric: 'HumanEval',
        value: '74.4%',
        dataset: 'Python code generation'
      }
    ],
    rating: 'BB',
    framework: 'JAX',
    downloadLinks: {
      model: 'https://deepmind.google/technologies/gemini/',
      documentation: 'https://ai.google.dev/docs'
    },
    citations: [
      'Google DeepMind. (2023). Gemini: A Family of Highly Capable Multimodal Models.'
    ],
    resources: [
      {
        title: 'Gemini Technical Report',
        url: 'https://arxiv.org/abs/2312.11805',
        type: 'Paper'
      },
      {
        title: 'Gemini API Documentation',
        url: 'https://ai.google.dev/docs',
        type: 'Documentation'
      },
      {
        title: 'Gemini Announcement',
        url: 'https://deepmind.google/technologies/gemini/',
        type: 'Blog'
      },
      {
        title: 'Gemini Model Card',
        url: 'https://ai.google.dev/gemini/docs/model-card',
        type: 'Documentation'
      }
    ],
    tags: ['Multimodal', 'NLP', 'Vision', 'Large Language Model'],
    featured: true
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    description: 'A compact yet powerful 7-billion parameter language model from Mistral AI. Designed for efficiency and performance with open-source availability.',
    version: '0.2',
    organization: 'Mistral AI',
    license: 'Apache 2.0',
    releaseDate: '2023-09-27',
    architecture: 'Transformer',
    parameters: '7B',
    trainingData: 'Curated text data from internet',
    useCases: [
      'Efficient inference',
      'Edge deployment',
      'Fine-tuning for specific domains',
      'Research and development',
      'Commercial applications'
    ],
    limitations: [
      'Smaller context window compared to larger models',
      'May require fine-tuning for specialized tasks',
      'Limited multimodal capabilities',
      'Performance trade-offs with larger models'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '60.1%',
        dataset: 'Massive Multitask Language Understanding'
      },
      {
        metric: 'HumanEval',
        value: '30.5%',
        dataset: 'Python code generation'
      },
      {
        metric: 'HellaSwag',
        value: '83.3%',
        dataset: 'Commonsense reasoning'
      }
    ],
    rating: 'AAA',
    framework: 'PyTorch',
    downloadLinks: {
      model: 'https://huggingface.co/mistralai/Mistral-7B-v0.2',
      documentation: 'https://docs.mistral.ai/'
    },
    citations: [
      'Mistral AI. (2023). Mistral 7B Model Card.'
    ],
    resources: [
      {
        title: 'Mistral 7B on Hugging Face',
        url: 'https://huggingface.co/mistralai/Mistral-7B-v0.2',
        type: 'GitHub'
      },
      {
        title: 'Mistral AI Documentation',
        url: 'https://docs.mistral.ai/',
        type: 'Documentation'
      },
      {
        title: 'Mistral 7B Blog Post',
        url: 'https://mistral.ai/news/announcing-mistral-7b/',
        type: 'Blog'
      },
      {
        title: 'Mistral GitHub Repository',
        url: 'https://github.com/mistralai/mistral-src',
        type: 'GitHub'
      }
    ],
    tags: ['Open Source', 'Efficient', 'NLP', 'Small Language Model'],
    featured: true
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'OpenAI\'s fast and cost-effective language model, optimized for chat applications and general text tasks.',
    version: '3.5',
    organization: 'OpenAI',
    license: 'Proprietary',
    releaseDate: '2022-11-30',
    architecture: 'Transformer',
    parameters: '175B',
    trainingData: 'Large-scale text and code data',
    useCases: [
      'Chat applications',
      'Text completion',
      'Code generation',
      'Content creation',
      'API integration'
    ],
    limitations: [
      'Knowledge cutoff limitations',
      'May generate incorrect information',
      'Limited context window',
      'Can be verbose'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '70.0%',
        dataset: 'Massive Multitask Language Understanding'
      },
      {
        metric: 'HumanEval',
        value: '48.1%',
        dataset: 'Python code generation'
      }
    ],
    rating: 'BBB',
    framework: 'PyTorch',
    downloadLinks: {
      model: 'https://platform.openai.com/docs/models/gpt-3-5',
      documentation: 'https://platform.openai.com/docs/models/gpt-3-5'
    },
    resources: [
      {
        title: 'GPT-3.5 Documentation',
        url: 'https://platform.openai.com/docs/models/gpt-3-5',
        type: 'Documentation'
      }
    ],
    tags: ['NLP', 'Chat', 'API', 'Large Language Model'],
    featured: false
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    description: 'Anthropic\'s balanced model offering strong performance and speed for most tasks.',
    version: '3.0',
    organization: 'Anthropic',
    license: 'Proprietary',
    releaseDate: '2024-03-04',
    architecture: 'Transformer',
    parameters: 'Not disclosed',
    trainingData: 'Curated high-quality text data',
    useCases: [
      'General purpose tasks',
      'Content generation',
      'Analysis',
      'Code assistance'
    ],
    limitations: [
      'Knowledge cutoff limitations',
      'May refuse certain requests'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '82.5%',
        dataset: 'Massive Multitask Language Understanding'
      }
    ],
    rating: 'A',
    framework: 'Custom',
    downloadLinks: {
      model: 'https://www.anthropic.com/claude',
      documentation: 'https://docs.anthropic.com/claude/docs'
    },
    resources: [
      {
        title: 'Claude 3 Sonnet Documentation',
        url: 'https://docs.anthropic.com/claude/docs',
        type: 'Documentation'
      }
    ],
    tags: ['NLP', 'General Purpose', 'Large Language Model'],
    featured: false
  },
  {
    id: 'llama-2-70b',
    name: 'LLaMA 2 70B',
    description: 'Meta\'s previous generation open-source large language model with 70 billion parameters.',
    version: '2.0',
    organization: 'Meta',
    license: 'Llama 2 Community License',
    releaseDate: '2023-07-18',
    architecture: 'Transformer',
    parameters: '70B',
    trainingData: '2T tokens from publicly available sources',
    useCases: [
      'Research',
      'Commercial applications',
      'Fine-tuning',
      'Educational purposes'
    ],
    limitations: [
      'Requires significant computational resources',
      'May require fine-tuning',
      'Training data biases may be present'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '69.8%',
        dataset: 'Massive Multitask Language Understanding'
      },
      {
        metric: 'HumanEval',
        value: '29.9%',
        dataset: 'Python code generation'
      }
    ],
    rating: 'A',
    framework: 'PyTorch',
    downloadLinks: {
      model: 'https://huggingface.co/meta-llama/Llama-2-70b-hf',
      documentation: 'https://ai.meta.com/llama/'
    },
    resources: [
      {
        title: 'LLaMA 2 Paper',
        url: 'https://arxiv.org/abs/2307.09288',
        type: 'Paper'
      },
      {
        title: 'LLaMA 2 on Hugging Face',
        url: 'https://huggingface.co/meta-llama/Llama-2-70b-hf',
        type: 'GitHub'
      }
    ],
    tags: ['Open Source', 'NLP', 'Large Language Model'],
    featured: false
  },
  {
    id: 'gemini-ultra',
    name: 'Gemini Ultra',
    description: 'Google\'s most capable multimodal model, designed for complex reasoning and understanding tasks.',
    version: '1.0',
    organization: 'Google DeepMind',
    license: 'Proprietary',
    releaseDate: '2024-02-15',
    architecture: 'Transformer',
    parameters: 'Not disclosed',
    trainingData: 'Multimodal data including text, images, audio, video',
    useCases: [
      'Complex reasoning',
      'Multimodal understanding',
      'Scientific research',
      'Advanced analysis'
    ],
    limitations: [
      'May generate inaccurate information',
      'Limited availability',
      'API rate limits'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '90.0%',
        dataset: 'Massive Multitask Language Understanding'
      }
    ],
    rating: 'BB',
    framework: 'JAX',
    downloadLinks: {
      model: 'https://deepmind.google/technologies/gemini/',
      documentation: 'https://ai.google.dev/docs'
    },
    resources: [
      {
        title: 'Gemini Ultra Documentation',
        url: 'https://ai.google.dev/docs',
        type: 'Documentation'
      }
    ],
    tags: ['Multimodal', 'NLP', 'Reasoning', 'Large Language Model'],
    featured: false
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    description: 'Mistral AI\'s flagship model offering strong performance across various tasks.',
    version: '1.0',
    organization: 'Mistral AI',
    license: 'Proprietary',
    releaseDate: '2024-02-26',
    architecture: 'Transformer',
    parameters: 'Not disclosed',
    trainingData: 'Curated text data',
    useCases: [
      'Complex reasoning',
      'Code generation',
      'Content creation',
      'Analysis'
    ],
    limitations: [
      'Knowledge cutoff limitations',
      'May require fine-tuning for specialized tasks'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '81.2%',
        dataset: 'Massive Multitask Language Understanding'
      },
      {
        metric: 'HumanEval',
        value: '60.1%',
        dataset: 'Python code generation'
      }
    ],
    rating: 'AA',
    framework: 'PyTorch',
    downloadLinks: {
      model: 'https://mistral.ai/news/mistral-large/',
      documentation: 'https://docs.mistral.ai/'
    },
    resources: [
      {
        title: 'Mistral Large Documentation',
        url: 'https://docs.mistral.ai/',
        type: 'Documentation'
      },
      {
        title: 'Mistral Large Announcement',
        url: 'https://mistral.ai/news/mistral-large/',
        type: 'Blog'
      }
    ],
    tags: ['NLP', 'Reasoning', 'Large Language Model'],
    featured: false
  },
  {
    id: 'phi-3',
    name: 'Phi-3',
    description: 'Microsoft\'s small language model series, optimized for efficiency and performance on mobile devices.',
    version: '3.0',
    organization: 'Microsoft',
    license: 'MIT',
    releaseDate: '2024-04-23',
    architecture: 'Transformer',
    parameters: '3.8B-14B',
    trainingData: 'Synthetic and filtered web data',
    useCases: [
      'Mobile deployment',
      'Edge computing',
      'Efficient inference',
      'On-device AI'
    ],
    limitations: [
      'Smaller context window',
      'Limited capabilities compared to larger models',
      'May require fine-tuning'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '69.0%',
        dataset: 'Massive Multitask Language Understanding'
      }
    ],
    rating: 'AAA',
    framework: 'PyTorch',
    downloadLinks: {
      model: 'https://huggingface.co/microsoft/Phi-3-mini-4k-instruct',
      documentation: 'https://www.microsoft.com/en-us/research/blog/phi-3/'
    },
    resources: [
      {
        title: 'Phi-3 Paper',
        url: 'https://arxiv.org/abs/2404.14219',
        type: 'Paper'
      },
      {
        title: 'Phi-3 on Hugging Face',
        url: 'https://huggingface.co/microsoft/Phi-3-mini-4k-instruct',
        type: 'GitHub'
      }
    ],
    tags: ['Open Source', 'Efficient', 'Small Language Model', 'Mobile'],
    featured: false
  },
  {
    id: 'qwen-2.5',
    name: 'Qwen 2.5',
    description: 'Alibaba\'s open-source large language model series with strong multilingual capabilities.',
    version: '2.5',
    organization: 'Alibaba Cloud',
    license: 'Apache 2.0',
    releaseDate: '2024-04-03',
    architecture: 'Transformer',
    parameters: '0.5B-72B',
    trainingData: 'Multilingual text data',
    useCases: [
      'Multilingual applications',
      'Research',
      'Commercial use',
      'Fine-tuning'
    ],
    limitations: [
      'May require fine-tuning for specific languages',
      'Training data biases may be present'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '77.8%',
        dataset: 'Massive Multitask Language Understanding'
      }
    ],
    rating: 'AA',
    framework: 'PyTorch',
    downloadLinks: {
      model: 'https://huggingface.co/Qwen/Qwen2.5-7B-Instruct',
      documentation: 'https://qwenlm.github.io/'
    },
    resources: [
      {
        title: 'Qwen 2.5 Documentation',
        url: 'https://qwenlm.github.io/',
        type: 'Documentation'
      },
      {
        title: 'Qwen 2.5 on Hugging Face',
        url: 'https://huggingface.co/Qwen/Qwen2.5-7B-Instruct',
        type: 'GitHub'
      }
    ],
    tags: ['Open Source', 'Multilingual', 'Large Language Model'],
    featured: false
  },
  {
    id: 'cohere-command',
    name: 'Cohere Command',
    description: 'Cohere\'s enterprise-focused language model designed for business applications.',
    version: 'R+',
    organization: 'Cohere',
    license: 'Proprietary',
    releaseDate: '2024-01-15',
    architecture: 'Transformer',
    parameters: 'Not disclosed',
    trainingData: 'Enterprise-focused text data',
    useCases: [
      'Enterprise applications',
      'Business intelligence',
      'Content generation',
      'Data analysis'
    ],
    limitations: [
      'Knowledge cutoff limitations',
      'May require fine-tuning for specific domains'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '75.0%',
        dataset: 'Massive Multitask Language Understanding'
      }
    ],
    rating: 'A',
    framework: 'Custom',
    downloadLinks: {
      model: 'https://cohere.com/command',
      documentation: 'https://docs.cohere.com/'
    },
    resources: [
      {
        title: 'Cohere Command Documentation',
        url: 'https://docs.cohere.com/',
        type: 'Documentation'
      }
    ],
    tags: ['Enterprise', 'NLP', 'Business', 'Large Language Model'],
    featured: false
  },
  {
    id: 'falcon-180b',
    name: 'Falcon 180B',
    description: 'Technology Innovation Institute\'s massive open-source language model with 180 billion parameters.',
    version: '1.0',
    organization: 'TII',
    license: 'Apache 2.0',
    releaseDate: '2023-09-06',
    architecture: 'Transformer',
    parameters: '180B',
    trainingData: '3.5T tokens from RefinedWeb dataset',
    useCases: [
      'Research',
      'Large-scale applications',
      'Fine-tuning',
      'Open-source development'
    ],
    limitations: [
      'Requires massive computational resources',
      'High memory requirements',
      'May require fine-tuning'
    ],
    performance: [
      {
        metric: 'MMLU',
        value: '74.6%',
        dataset: 'Massive Multitask Language Understanding'
      }
    ],
    rating: 'BBB',
    framework: 'PyTorch',
    downloadLinks: {
      model: 'https://huggingface.co/tiiuae/falcon-180B',
      documentation: 'https://falconllm.tii.ae/'
    },
    resources: [
      {
        title: 'Falcon 180B Paper',
        url: 'https://arxiv.org/abs/2311.04967',
        type: 'Paper'
      },
      {
        title: 'Falcon 180B on Hugging Face',
        url: 'https://huggingface.co/tiiuae/falcon-180B',
        type: 'GitHub'
      }
    ],
    tags: ['Open Source', 'NLP', 'Large Language Model', 'Research'],
    featured: false
  }
];

