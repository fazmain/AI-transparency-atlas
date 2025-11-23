// Our new model card framework
import { Framework } from '@/types/framework';

export const proposedFramework: Framework = {
  id: 'proposed-new-framework',
  name: 'Proposed New Framework',
  version: '1.0',
  description: 'Comprehensive evaluation framework for model cards',
  sections: [
    {
      id: 'model-details',
      name: 'Model Details',
      weight: 15,
      subsections: [
        {
          id: 'model-overview',
          name: 'Model overview',
          score: 3,
        },
        {
          id: 'organization',
          name: 'Organization developing the model',
          score: 1,
        },
        {
          id: 'model-version',
          name: 'Model Version',
          score: 2,
        },
        {
          id: 'model-release-date',
          name: 'Model Release Date',
          score: 0.5,
        },
        {
          id: 'model-version-progression',
          name: 'Model Version Progression',
          score: 1,
        },
        {
          id: 'model-architecture',
          name: 'Model Architecture',
          score: 4,
        },
        {
          id: 'model-dependencies',
          name: 'Model Dependencies',
          score: 1,
        },
        {
          id: 'paper-links',
          name: 'Paper and relevant links',
          score: 0.5,
        },
        {
          id: 'model-distribution-forms',
          name: 'Model Distribution Forms',
          score: 2,
        },
      ],
    },
    {
      id: 'model-inputs-outputs',
      name: 'Model Inputs & Outputs',
      weight: 6,
      subsections: [
        {
          id: 'inputs',
          name: 'Inputs',
          score: 2,
        },
        {
          id: 'outputs',
          name: 'Outputs',
          score: 2,
        },
        {
          id: 'token-count',
          name: 'Token Count',
          score: 2,
        },
      ],
    },
    {
      id: 'model-data',
      name: 'Model Data',
      weight: 15,
      subsections: [
        {
          id: 'training-dataset',
          name: 'Training Dataset',
          score: 7,
        },
        {
          id: 'training-data-processing',
          name: 'Training Data Processing',
          score: 6,
        },
        {
          id: 'knowledge-count',
          name: 'Knowledge Count',
          score: 2,
        },
      ],
    },
    {
      id: 'model-implementation-sustainability',
      name: 'Model Implementation and Sustainability',
      weight: 5,
      subsections: [
        {
          id: 'hardware-used',
          name: 'Hardware Used During Training & Inference',
          score: 2,
        },
        {
          id: 'software-frameworks',
          name: 'Software Frameworks & Tooling',
          score: 2,
        },
        {
          id: 'energy-sustainability',
          name: 'Energy Use/ Sustainability Metrics',
          score: 1,
        },
      ],
    },
    {
      id: 'intended-use',
      name: 'Intended Use',
      weight: 10,
      subsections: [
        {
          id: 'primary-intended-uses',
          name: 'Primary intended uses',
          score: 5,
        },
        {
          id: 'primary-intended-users',
          name: 'Primary intended users',
          score: 2,
        },
        {
          id: 'out-of-scope-use-cases',
          name: 'Out-of-scope use cases',
          score: 3,
        },
      ],
    },
    {
      id: 'critical-risk',
      name: 'Critical Risk',
      weight: 20,
      subsections: [
        {
          id: 'cbrn',
          name: 'CBRN (Chemical, Biological, Radiological or Nuclear)',
          score: 5,
        },
        {
          id: 'cyber-risk',
          name: 'Cyber Risk',
          score: 5,
        },
        {
          id: 'harmful-manipulation',
          name: 'Harmful Manipulation',
          score: 4,
        },
        {
          id: 'child-safety',
          name: 'Child Safety Evaluations',
          score: 4,
        },
        {
          id: 'privacy-risks',
          name: 'Privacy Risks',
          score: 2,
        },
      ],
    },
    {
      id: 'safety-evaluation',
      name: 'Safety Evaluation',
      weight: 25,
      subsections: [
        {
          id: 'refusals',
          name: 'Refusals',
          score: 1,
        },
        {
          id: 'disallowed-content-handling',
          name: 'Disallowed Content Handling',
          score: 4,
        },
        {
          id: 'sycophancy',
          name: 'Sycophancy',
          score: 2,
        },
        {
          id: 'jailbreak',
          name: 'Jailbreak',
          score: 4,
        },
        {
          id: 'hallucinations',
          name: 'Hallucinations',
          score: 4,
        },
        {
          id: 'deception-behaviors',
          name: 'Deception Behaviors',
          score: 4,
        },
        {
          id: 'fairness-bias',
          name: 'Fairness & Bias Evaluations (incl. BBQ)',
          score: 3,
        },
        {
          id: 'adversarial-robustness',
          name: 'Adversarial Robustness',
          score: 2,
        },
        {
          id: 'red-teaming-results',
          name: 'Red Teaming Results',
          score: 1,
        },
      ],
    },
    {
      id: 'risk-mitigations',
      name: 'Risk Mitigations',
      weight: 4,
      subsections: [
        {
          id: 'risk-mitigations',
          name: 'Risk Mitigations',
          score: 4,
        },
      ],
    },
  ],
};

