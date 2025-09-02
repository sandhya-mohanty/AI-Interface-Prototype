import React from 'react';
import { Menu, FolderOpen, Trash2, Download } from 'lucide-react';
import { Button } from '../ui';

interface ChatHeaderProps {
  modelName: string;
  onOpenTemplates: () => void;
  onClearChat: () => void;
  onExportChat: () => void;
  onOpenSidebar: () => void;
  messageCount: number;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  modelName, 
  onOpenTemplates, 
  onClearChat, 
  onExportChat, 
  onOpenSidebar, 
  messageCount 
}) => {
  return (
    <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <MobileMenuButton onClick={onOpenSidebar} />
          <ChatHeaderTitle modelName={modelName} />
        </div>
        <ChatHeaderActions
          onOpenTemplates={onOpenTemplates}
          onClearChat={onClearChat}
          onExportChat={onExportChat}
          messageCount={messageCount}
        />
      </div>
    </div>
  );
};

interface MobileMenuButtonProps {
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
    >
      <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
    </button>
  );
};

interface ChatHeaderTitleProps {
  modelName: string;
}

const ChatHeaderTitle: React.FC<ChatHeaderTitleProps> = ({ modelName }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
      <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
        <span className="hidden sm:inline">Chat with </span>{modelName}
      </h2>
      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex-shrink-0">
        Ready
      </span>
    </div>
  );
};

interface ChatHeaderActionsProps {
  onOpenTemplates: () => void;
  onClearChat: () => void;
  onExportChat: () => void;
  messageCount: number;
}

const ChatHeaderActions: React.FC<ChatHeaderActionsProps> = ({ 
  onOpenTemplates, 
  onClearChat, 
  onExportChat, 
  messageCount 
}) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Button variant="ghost" size="sm" onClick={onOpenTemplates}>
        <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden md:inline">Templates</span>
      </Button>
      {messageCount > 0 && (
        <>
          <Button variant="ghost" size="sm" onClick={onClearChat}>
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden md:inline">Clear</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={onExportChat}>
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden md:inline">Export</span>
          </Button>
        </>
      )}
    </div>
  );
};