import React from 'react';
import { Settings, Sparkles, X, Sun, Moon } from 'lucide-react';
// import { AIModel, Parameters } from '../../types';
import { ParameterSlider } from '../ui';
import { ModelSelector } from '../ModelSelector';
import { mockModels } from '../../data/mockData';
import { useTheme } from '../../contexts/ThemeContext';
import type { AIModel, Parameters } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
  parameters: Parameters;
  onParametersChange: (params: Parameters) => void;
  isMobile: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onToggle, 
  selectedModel, 
  onModelChange, 
  parameters, 
  onParametersChange, 
  isMobile 
}) => {
  return (
    <>
      <MobileSidebarOverlay isOpen={isOpen && isMobile} onClose={onToggle} />
      <div className={`
        ${isMobile 
          ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`
          : 'relative'
        }
        ${isOpen ? 'w-80' : isMobile ? 'w-0' : 'w-16'} 
        bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 
        transition-all duration-300 flex flex-col
        ${isMobile && !isOpen ? 'overflow-hidden' : ''}
      `}>
        <SidebarHeader isOpen={isOpen} onToggle={onToggle} isMobile={isMobile} />
        
        {isOpen && (
          <>
            <div className="p-3 sm:p-4 flex-1 overflow-y-auto">
              <SidebarModelSection
                selectedModel={selectedModel}
                onModelChange={onModelChange}
              />
              <ParametersPanel
                parameters={parameters}
                onParametersChange={onParametersChange}
                maxTokens={selectedModel.maxTokens}
              />
            </div>
            
            <div className="mt-auto p-3 sm:p-4 border-t border-slate-200 dark:border-slate-700">
              <ThemeToggle />
            </div>
          </>
        )}
      </div>
    </>
  );
};


interface MobileSidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebarOverlay: React.FC<MobileSidebarOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      onClick={onClose}
    />
  );
};

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, onToggle, isMobile }) => {
  return (
    <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        {isOpen && (
          <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <span className="hidden sm:inline">AI Interface</span>
            <span className="sm:hidden">AI</span>
          </h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          {isMobile && isOpen ? (
            <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          ) : (
            <Settings className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          )}
        </button>
      </div>
    </div>
  );
};

interface SidebarModelSectionProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

const SidebarModelSection: React.FC<SidebarModelSectionProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Model Selection</h3>
      <ModelSelector
        selectedModel={selectedModel}
        onModelChange={onModelChange}
        models={mockModels} // Import mockModels at the top
      />
    </div>
  );
};

interface ParametersPanelProps {
  parameters: Parameters;
  onParametersChange: (params: Parameters) => void;
  maxTokens: number;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({ 
  parameters, 
  onParametersChange, 
  maxTokens 
}) => {
  const updateParameter = (key: keyof Parameters, value: number) => {
    onParametersChange({ ...parameters, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Parameters</h3>
      
      <ParameterSlider
        label="Temperature"
        value={parameters.temperature}
        onChange={(value) => updateParameter('temperature', value)}
        min={0}
        max={2}
        step={0.1}
        description="Controls randomness in responses"
      />
      
      <ParameterSlider
        label="Max Tokens"
        value={parameters.maxTokens}
        onChange={(value) => updateParameter('maxTokens', value)}
        min={1}
        max={maxTokens}
        step={1}
        description="Maximum length of response"
      />
      
      <ParameterSlider
        label="Top P"
        value={parameters.topP}
        onChange={(value) => updateParameter('topP', value)}
        min={0}
        max={1}
        step={0.1}
        description="Controls diversity via nucleus sampling"
      />
      
      <ParameterSlider
        label="Frequency Penalty"
        value={parameters.frequencyPenalty}
        onChange={(value) => updateParameter('frequencyPenalty', value)}
        min={-2}
        max={2}
        step={0.1}
        description="Reduces repetition in responses"
      />
    </div>
  );
};

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-600 dark:text-slate-400">Theme</span>
      <button
        onClick={toggleTheme}
        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
      >
        {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
      </button>
    </div>
  );
}