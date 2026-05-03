import React from 'react';
import { Shield, AlertTriangle, XCircle, FileText, Smartphone, Mail, MessageSquare, ShoppingBag, Globe } from 'lucide-react';
import { Scenario } from '@workspace/api-client-react';
import { motion } from 'framer-motion';

interface ScenarioCardProps {
  scenario: Scenario;
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  const getIcon = () => {
    switch (scenario.type) {
      case 'sms': return <Smartphone className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'dm': return <MessageSquare className="w-5 h-5" />;
      case 'marketplace': return <ShoppingBag className="w-5 h-5" />;
      case 'login': return <Globe className="w-5 h-5" />;
      case 'ai_voice': return <FileText className="w-5 h-5" />;
      default: return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getLabel = () => {
    switch (scenario.type) {
      case 'sms': return 'Text Message';
      case 'email': return 'Email';
      case 'dm': return 'Direct Message';
      case 'marketplace': return 'Marketplace Chat';
      case 'login': return 'Web Browser';
      case 'ai_voice': return 'Voice Transcript';
      default: return 'Message';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-card rounded-xl border border-card-border overflow-hidden shadow-xl"
    >
      <div className="bg-muted px-4 py-3 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          {getIcon()}
          <span>{getLabel()}</span>
        </div>
        <span className="text-xs bg-background/50 px-2 py-1 rounded-md text-muted-foreground font-mono">
          ID: {scenario.id.split('-')[1] || scenario.id.substring(0,4)}
        </span>
      </div>

      <div className="p-6">
        {scenario.type === 'sms' && (
          <div className="flex flex-col gap-4">
            <div className="text-center text-xs text-muted-foreground mb-2">Today 10:42 AM</div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-secondary-foreground">{scenario.sender.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">{scenario.sender}</div>
                <div className="bg-secondary text-secondary-foreground p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed whitespace-pre-wrap">
                  {scenario.content}
                </div>
              </div>
            </div>
          </div>
        )}

        {scenario.type === 'email' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-foreground">From:</span>
                  <span className="text-sm text-muted-foreground">{scenario.sender}</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap mt-2">
              {scenario.content}
            </div>
          </div>
        )}

        {scenario.type === 'dm' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-accent">{scenario.sender.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{scenario.sender}</div>
                <div className="text-xs text-muted-foreground">@{(scenario.sender.toLowerCase().replace(/\s/g, ''))}</div>
              </div>
            </div>
            <div className="bg-secondary text-secondary-foreground p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap">
              {scenario.content}
            </div>
          </div>
        )}

        {scenario.type === 'marketplace' && (
          <div className="flex flex-col gap-4">
            <div className="text-center text-xs font-medium text-muted-foreground bg-muted py-1 rounded-md mb-2">Item: Sofa / $350</div>
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary">{scenario.sender.charAt(0).toUpperCase()}</span>
              </div>
              <div className="bg-secondary text-secondary-foreground p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed whitespace-pre-wrap">
                {scenario.content}
              </div>
            </div>
          </div>
        )}

        {scenario.type === 'login' && (
          <div className="flex flex-col gap-4">
            <div className="bg-background rounded-md border border-border p-2 flex items-center gap-2 mb-4">
              <div className="flex gap-1.5 px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-warning/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-success/80"></div>
              </div>
              <div className="bg-muted px-3 py-1 rounded text-xs text-muted-foreground font-mono flex-1 truncate">
                {scenario.sender}
              </div>
            </div>
            <div className="bg-background border border-border rounded-lg p-6 shadow-sm mx-auto max-w-xs w-full">
              <div className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
                {scenario.content}
              </div>
            </div>
          </div>
        )}

        {scenario.type === 'ai_voice' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 animate-pulse">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Incoming Call...</div>
                <div className="text-xs text-muted-foreground">{scenario.sender}</div>
              </div>
            </div>
            <div className="border-l-2 border-primary/50 pl-4 py-1 italic text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap relative">
              <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary"></div>
              "{scenario.content.replace('[Voice Message]: ', '')}"
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
