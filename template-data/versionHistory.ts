// This is for future work.
export interface VersionChange {
  field: string;
  oldValue: string | string[];
  newValue: string | string[];
  changeType: 'added' | 'removed' | 'modified';
}

export interface FrameworkMetrics {
  documentationQuality: number; // 0-100
  transparency: number; // 0-100
  safetyMeasures: number; // 0-100
  performanceScore: number; // 0-100
  overallScore: number; // 0-100
}

export interface ModelVersionHistory {
  modelId: string;
  version: string;
  date: string; // ISO date string
  changes: VersionChange[];
  summary: string;
  changedBy?: string; // Optional: who made the change
  frameworkMetrics?: FrameworkMetrics; // Framework evaluation metrics
}



export const versionHistory: Record<string, ModelVersionHistory[]> = {
  'gpt-4': [
    {
      modelId: 'gpt-4',
      version: '4.0',
      date: '2024-12-15',
      summary: 'Updated performance metrics and rating based on latest evaluations',
      changes: [
        {
          field: 'rating',
          oldValue: 'BBB',
          newValue: 'BBB',
          changeType: 'modified'
        },
        {
          field: 'performance',
          oldValue: ['MMLU: 85.0%'],
          newValue: ['MMLU: 86.4%'],
          changeType: 'modified'
        },
        {
          field: 'resources',
          oldValue: [],
          newValue: ['GPT-4 System Card'],
          changeType: 'added'
        }
      ],
      frameworkMetrics: {
        documentationQuality: 75,
        transparency: 60,
        safetyMeasures: 70,
        performanceScore: 86,
        overallScore: 73
      }
    },
    {
      modelId: 'gpt-4',
      version: '4.0',
      date: '2024-10-01',
      summary: 'Initial model card creation',
      changes: [
        {
          field: 'model_card',
          oldValue: '',
          newValue: 'Initial model card created',
          changeType: 'added'
        }
      ],
      frameworkMetrics: {
        documentationQuality: 70,
        transparency: 55,
        safetyMeasures: 65,
        performanceScore: 85,
        overallScore: 69
      }
    }
  ],
  'claude-3-opus': [
    {
      modelId: 'claude-3-opus',
      version: '3.0',
      date: '2024-11-20',
      summary: 'Updated rating from A to A based on improved safety documentation',
      changes: [
        {
          field: 'rating',
          oldValue: 'A',
          newValue: 'A',
          changeType: 'modified'
        },
        {
          field: 'limitations',
          oldValue: ['Knowledge cutoff limitations', 'May refuse certain requests'],
          newValue: ['Knowledge cutoff limitations', 'May refuse certain requests', 'Can be slow for real-time applications', 'Limited multimodal capabilities'],
          changeType: 'added'
        }
      ],
      frameworkMetrics: {
        documentationQuality: 85,
        transparency: 75,
        safetyMeasures: 90,
        performanceScore: 87,
        overallScore: 84
      }
    },
    {
      modelId: 'claude-3-opus',
      version: '3.0',
      date: '2024-03-15',
      summary: 'Initial model card creation after Claude 3 release',
      changes: [
        {
          field: 'model_card',
          oldValue: '',
          newValue: 'Initial model card created',
          changeType: 'added'
        }
      ],
      frameworkMetrics: {
        documentationQuality: 80,
        transparency: 70,
        safetyMeasures: 85,
        performanceScore: 87,
        overallScore: 81
      }
    }
  ],
  'llama-3-70b': [
    {
      modelId: 'llama-3-70b',
      version: '3.0',
      date: '2024-12-10',
      summary: 'Updated performance metrics and added new resources',
      changes: [
        {
          field: 'performance',
          oldValue: ['MMLU: 78.0%'],
          newValue: ['MMLU: 79.6%'],
          changeType: 'modified'
        },
        {
          field: 'resources',
          oldValue: ['Llama 3 Official Website'],
          newValue: ['Llama 3 Official Website', 'Llama 3 GitHub Repository'],
          changeType: 'added'
        }
      ],
      frameworkMetrics: {
        documentationQuality: 90,
        transparency: 85,
        safetyMeasures: 70,
        performanceScore: 80,
        overallScore: 81
      }
    },
    {
      modelId: 'llama-3-70b',
      version: '3.0',
      date: '2024-05-01',
      summary: 'Initial model card creation',
      changes: [
        {
          field: 'model_card',
          oldValue: '',
          newValue: 'Initial model card created',
          changeType: 'added'
        }
      ],
      frameworkMetrics: {
        documentationQuality: 85,
        transparency: 80,
        safetyMeasures: 65,
        performanceScore: 78,
        overallScore: 77
      }
    }
  ],
  'gemini-pro': [
    {
      modelId: 'gemini-pro',
      version: '1.0',
      date: '2024-11-05',
      summary: 'Rating updated from BB to BB after comprehensive evaluation',
      changes: [
        {
          field: 'rating',
          oldValue: 'BB',
          newValue: 'BB',
          changeType: 'modified'
        },
        {
          field: 'description',
          oldValue: 'Google\'s multimodal AI model',
          newValue: 'Google\'s multimodal AI model capable of understanding text, images, audio, and video. Optimized for various tasks across different modalities.',
          changeType: 'modified'
        }
      ],
      frameworkMetrics: {
        documentationQuality: 65,
        transparency: 55,
        safetyMeasures: 60,
        performanceScore: 84,
        overallScore: 66
      }
    },
    {
      modelId: 'gemini-pro',
      version: '1.0',
      date: '2024-01-10',
      summary: 'Initial model card creation',
      changes: [
        {
          field: 'model_card',
          oldValue: '',
          newValue: 'Initial model card created',
          changeType: 'added'
        }
      ],
      frameworkMetrics: {
        documentationQuality: 60,
        transparency: 50,
        safetyMeasures: 55,
        performanceScore: 84,
        overallScore: 62
      }
    }
  ],
  'mistral-7b': [
    {
      modelId: 'mistral-7b',
      version: '0.2',
      date: '2024-12-01',
      summary: 'Rating improved from AA to AAA based on updated performance benchmarks',
      changes: [
        {
          field: 'rating',
          oldValue: 'AA',
          newValue: 'AAA',
          changeType: 'modified'
        },
        {
          field: 'performance',
          oldValue: ['MMLU: 58.0%'],
          newValue: ['MMLU: 60.1%'],
          changeType: 'modified'
        }
      ],
      frameworkMetrics: {
        documentationQuality: 95,
        transparency: 90,
        safetyMeasures: 85,
        performanceScore: 60,
        overallScore: 83
      }
    },
    {
      modelId: 'mistral-7b',
      version: '0.2',
      date: '2024-09-15',
      summary: 'Initial model card creation',
      changes: [
        {
          field: 'model_card',
          oldValue: '',
          newValue: 'Initial model card created',
          changeType: 'added'
        }
      ],
      frameworkMetrics: {
        documentationQuality: 90,
        transparency: 85,
        safetyMeasures: 80,
        performanceScore: 58,
        overallScore: 78
      }
    }
  ]
};

