import React, { useState } from 'react';
import { ChevronDown, Zap, Brain } from 'lucide-react';
import type { AIModel } from '../../types';

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
  models: AIModel[];
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  selectedModel, 
  onModelChange, 
  models 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
            {selectedModel.provider === 'OpenAI' ? 
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" /> : 
              <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            }
          </div>
          <div className="text-left min-w-0">
            <div className="font-medium text-slate-900 dark:text-slate-100 text-sm sm:text-base truncate">
              {selectedModel.name}
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
              {selectedModel.provider}
            </div>
          </div>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <ModelDropdown 
          models={models} 
          onSelect={onModelChange} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
};

interface ModelDropdownProps {
  models: AIModel[];
  onSelect: (model: AIModel) => void;
  onClose: () => void;
}

const ModelDropdown: React.FC<ModelDropdownProps> = ({ models, onSelect, onClose }) => {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 max-h-80 sm:max-h-96 overflow-y-auto">
      {models.map((model) => (
        <ModelOption
          key={model.id}
          model={model}
          onClick={() => {
            onSelect(model);
            onClose();
          }}
        />
      ))}
    </div>
  );
};

interface ModelOptionProps {
  model: AIModel;
  onClick: () => void;
}

const ModelOption: React.FC<ModelOptionProps> = ({ model, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200 border-b border-slate-100 dark:border-slate-700 last:border-b-0"
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="p-1.5 sm:p-2 bg-slate-100 dark:bg-slate-700 rounded-lg flex-shrink-0">
          {model.provider === 'OpenAI' ? 
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600 dark:text-slate-300" /> : 
            <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600 dark:text-slate-300" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-slate-900 dark:text-slate-100 text-sm sm:text-base">
            {model.name}
          </div>
          <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-2 line-clamp-2">
            {model.description}
          </div>
          <div className="flex flex-wrap gap-1">
            {model.capabilities.slice(0, 3).map((cap) => (
              <CapabilityBadge key={cap} capability={cap} />
            ))}
            {model.capabilities.length > 3 && (
              <span className="text-xs text-slate-400">+{model.capabilities.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

interface CapabilityBadgeProps {
  capability: string;
}

const CapabilityBadge: React.FC<CapabilityBadgeProps> = ({ capability }) => {
  return (
    <span className="px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
      {capability}
    </span>
  );
};