import type { AIModel, PromptTemplate } from "../types";

export const mockModels: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Most capable model for complex reasoning and creative tasks',
    provider: 'OpenAI',
    maxTokens: 8192,
    capabilities: ['Text Generation', 'Code', 'Math', 'Creative Writing']
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient model for most conversational tasks',
    provider: 'OpenAI',
    maxTokens: 4096,
    capabilities: ['Text Generation', 'Code', 'Conversations']
  },
  {
    id: 'claude-sonnet',
    name: 'Claude Sonnet',
    description: 'Balanced model excellent at analysis and creative tasks',
    provider: 'Anthropic',
    maxTokens: 8000,
    capabilities: ['Analysis', 'Creative Writing', 'Code', 'Math']
  },
  {
    id: 'claude-haiku',
    name: 'Claude Haiku',
    description: 'Fast and cost-effective model for quick interactions',
    provider: 'Anthropic',
    maxTokens: 4000,
    capabilities: ['Quick Tasks', 'Text Generation', 'Code']
  }
];

export const mockTemplates: PromptTemplate[] = [
  {
    id: '1',
    name: 'Creative Writing Assistant',
    category: 'Creative',
    description: 'Help with storytelling and creative content',
    content: 'You are a creative writing assistant. Help me write engaging content by providing vivid descriptions, compelling characters, and interesting plot developments.',
    tags: ['writing', 'creativity', 'storytelling']
  },
  {
    id: '2',
    name: 'Code Review Expert',
    category: 'Development',
    description: 'Analyze and improve code quality',
    content: 'You are an expert code reviewer. Analyze the following code for best practices, potential bugs, performance issues, and suggest improvements.',
    tags: ['code', 'review', 'development']
  },
  {
    id: '3',
    name: 'Data Analysis Guide',
    category: 'Analytics',
    description: 'Help interpret and analyze data',
    content: 'You are a data analysis expert. Help me understand patterns, trends, and insights from the data provided. Focus on actionable recommendations.',
    tags: ['data', 'analysis', 'insights']
  },
  {
    id: '4',
    name: 'Learning Tutor',
    category: 'Education',
    description: 'Explain complex concepts simply',
    content: 'You are a patient and knowledgeable tutor. Break down complex concepts into simple, understandable explanations with examples and analogies.',
    tags: ['education', 'learning', 'explanation']
  }
];