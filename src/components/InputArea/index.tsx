import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui';
import type { AIModel, Parameters } from '../../types';

interface InputAreaProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSend: () => void;
  isGenerating: boolean;
  selectedModel: AIModel;
  parameters: Parameters;
}

export const InputArea: React.FC<InputAreaProps> = ({ 
  prompt, 
  onPromptChange, 
  onSend, 
  isGenerating, 
  selectedModel, 
  parameters 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <InputField
          prompt={prompt}
          onPromptChange={onPromptChange}
          onKeyDown={handleKeyDown}
          onSend={onSend}
          isGenerating={isGenerating}
        />
        <InputFooter
          modelName={selectedModel.name}
          temperature={parameters.temperature}
          maxTokens={parameters.maxTokens}
        />
      </div>
    </div>
  );
};

interface InputFieldProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  isGenerating: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  prompt, 
  onPromptChange, 
  onKeyDown, 
  onSend, 
  isGenerating 
}) => {
  return (
    <div className="flex gap-2 sm:gap-3">
      <div className="flex-1 relative">
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter your prompt here... (Cmd/Ctrl + Enter to send)"
          className="w-full p-3 pr-16 sm:pr-20 border border-slate-200 dark:border-slate-700 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 transition-colors text-sm sm:text-base"
          rows={3}
          disabled={isGenerating}
        />
        <div className="absolute bottom-2 right-2 text-xs text-slate-400">
          {prompt.length}
          <span className="hidden sm:inline"> chars</span>
        </div>
      </div>
      <div className="flex flex-col">
        <Button 
          onClick={onSend}
          disabled={!prompt.trim() || isGenerating}
          className="h-full min-h-[3.5rem] sm:min-h-[4.5rem]"
          size="md"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </Button>
      </div>
    </div>
  );
};

interface InputFooterProps {
  modelName: string;
  temperature: number;
  maxTokens: number;
}

const InputFooter: React.FC<InputFooterProps> = ({ modelName, temperature, maxTokens }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 sm:mt-3 text-xs text-slate-500 dark:text-slate-400 gap-2">
      <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
        <span className="whitespace-nowrap">Model: {modelName}</span>
        <span className="whitespace-nowrap">Temp: {temperature}</span>
        <span className="whitespace-nowrap">Tokens: {maxTokens}</span>
      </div>
      <span className="hidden sm:block whitespace-nowrap">Press Cmd+Enter to send</span>
    </div>
  );
};