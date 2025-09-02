export interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: string;
  maxTokens: number;
  capabilities: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  content: string;
  tags: string[];
}

export interface Parameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}