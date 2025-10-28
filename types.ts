import type React from 'react';

export interface Problem {
  id: number;
  title: string;
  image: string;
  points: string[];
  icon: React.ReactElement;
  color: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}
