// Model Card type definition for AI Transparency Atlas
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

