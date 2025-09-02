import React from 'react';
// import { ChatMessage as ChatMessageType } from '../../types';
import { ChatMessages, LoadingMessage, EmptyState } from '../Chat';
import type { ChatMessage } from '../../types';

interface ChatAreaProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  modelName: string;
  onOpenTemplates: () => void;
  onCopyMessage: (content: string) => void;
  onExportMessage: (content: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ 
  messages, 
  isGenerating, 
  modelName, 
  onOpenTemplates, 
  onCopyMessage, 
  onExportMessage 
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-2 sm:p-4">
      {messages.length === 0 ? (
        <EmptyState modelName={modelName} onOpenTemplates={onOpenTemplates} />
      ) : (
        <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
          {messages.map(message => (
            <ChatMessages 
              key={message.id} 
              message={message} 
              onCopy={onCopyMessage}
              onExport={onExportMessage}
            />
          ))}
          {isGenerating && <LoadingMessage />}
        </div>
      )}
    </div>
  );
};