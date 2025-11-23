export interface FrameworkSubsection {
  id: string;
  name: string;
  score: number; // Score as percentage of 100%
  description?: string;
}

export interface FrameworkSection {
  id: string;
  name: string;
  weight: number; // Weight as percentage of 100%
  subsections: FrameworkSubsection[];
}

export interface Framework {
  id: string;
  name: string;
  version?: string;
  description?: string;
  sections: FrameworkSection[];
}

