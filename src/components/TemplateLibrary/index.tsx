import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { PromptTemplate } from '../../types';

interface TemplateLibraryProps {
  templates: PromptTemplate[];
  onTemplateSelect: (template: PromptTemplate) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ 
  templates, 
  onTemplateSelect, 
  isOpen, 
  onClose 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden">
        <TemplateLibraryHeader onClose={onClose} />
        <TemplateLibraryFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          templates={templates}
        />
        <TemplateLibraryGrid
          templates={templates}
          selectedCategory={selectedCategory}
          onTemplateSelect={(template) => {
            onTemplateSelect(template);
            onClose();
          }}
        />
      </div>
    </div>
  );
};

interface TemplateLibraryHeaderProps {
  onClose: () => void;
}

const TemplateLibraryHeader: React.FC<TemplateLibraryHeaderProps> = ({ onClose }) => {
  return (
    <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">Template Library</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

interface TemplateLibraryFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  templates: PromptTemplate[];
}

const TemplateLibraryFilters: React.FC<TemplateLibraryFiltersProps> = ({ 
  selectedCategory, 
  onCategoryChange, 
  templates 
}) => {
  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];
  
  return (
    <div className="px-4 sm:px-6 pb-4">
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

interface TemplateLibraryGridProps {
  templates: PromptTemplate[];
  selectedCategory: string;
  onTemplateSelect: (template: PromptTemplate) => void;
}

const TemplateLibraryGrid: React.FC<TemplateLibraryGridProps> = ({ 
  templates, 
  selectedCategory, 
  onTemplateSelect 
}) => {
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] sm:max-h-96">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filteredTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onClick={() => onTemplateSelect(template)}
          />
        ))}
      </div>
    </div>
  );
};

interface TemplateCardProps {
  template: PromptTemplate;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick }) => {
  return (
    <div
      className="p-3 sm:p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-2 text-sm sm:text-base">
        {template.name}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
        {template.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {template.tags.map(tag => (
          <span 
            key={tag} 
            className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};