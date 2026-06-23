export interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
}

export interface Experience {
  role: string;
  company: string;
  logo: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Education {
  degree: string;
  institution: string;
  logo: string;
  period: string;
}

export interface FAQItem {
  question: string;
  answer?: string; // Content wasn't strictly provided in input, but good for structure
}
