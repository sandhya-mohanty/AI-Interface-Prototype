import React, { useState } from 'react';
import { Copy, Download, RefreshCw, Cpu } from 'lucide-react';
import { Button } from '../ui';
import type { ChatMessage } from '../../types';

interface ChatMessageProps {
  message: ChatMessage;
  onCopy: (content: string) => void;
  onExport: (content: string) => void;
}

export const ChatMessages: React.FC<ChatMessageProps> = ({ message, onCopy, onExport }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    onCopy(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-2 sm:gap-4 p-3 sm:p-4 ${
      message.role === 'assistant' ? 'bg-slate-50 dark:bg-slate-800' : ''
    } rounded-lg`}>
      <MessageAvatar role={message.role} />
      <div className="flex-1 min-w-0">
        <MessageHeader 
          role={message.role}
          onCopy={handleCopy}
          onExport={() => onExport(message.content)}
          copied={copied}
          showExport={message.role === 'assistant'}
        />
        <MessageContent content={message.content} />
        <MessageTimestamp timestamp={message.timestamp} />
      </div>
    </div>
  );
};

interface MessageAvatarProps {
  role: 'user' | 'assistant';
}

const MessageAvatar: React.FC<MessageAvatarProps> = ({ role }) => {
  return (
    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs sm:text-base ${
      role === 'user' 
        ? 'bg-blue-600 text-white' 
        : 'bg-emerald-600 text-white'
    }`}>
      {role === 'user' ? '👤' : '🤖'}
    </div>
  );
};

interface MessageHeaderProps {
  role: 'user' | 'assistant';
  onCopy: () => void;
  onExport: () => void;
  copied: boolean;
  showExport: boolean;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ 
  role, 
  onCopy, 
  onExport, 
  copied, 
  showExport 
}) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-slate-900 dark:text-slate-100 capitalize">
        {role}
      </span>
      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="sm" onClick={onCopy}>
          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
        {showExport && (
          <Button variant="ghost" size="sm" onClick={onExport}>
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        )}
      </div>
    </div>
  );
};

interface MessageContentProps {
  content: string;
}

const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
  return (
    <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words leading-relaxed">
      {content}
    </div>
  );
};

interface MessageTimestampProps {
  timestamp: Date;
}

const MessageTimestamp: React.FC<MessageTimestampProps> = ({ timestamp }) => {
  return (
    <div className="text-xs text-slate-400 mt-2">
      {timestamp.toLocaleTimeString()}
    </div>
  );
};

export const LoadingMessage: React.FC = () => {
  return (
    <div className="flex gap-2 sm:gap-4 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
      <MessageAvatar role="assistant" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Assistant</span>
          <RefreshCw className="w-3 h-3 text-blue-600 animate-spin" />
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">Thinking...</div>
      </div>
    </div>
  );
};

interface EmptyStateProps {
  modelName: string;
  onOpenTemplates: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ modelName, onOpenTemplates }) => {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="text-center max-w-sm">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
        </div>
        <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
          Ready to assist
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Start a conversation with {modelName} or choose a template to get started.
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenTemplates}
        >
          Browse Templates
        </Button>
      </div>
    </div>
  );
};