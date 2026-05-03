import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Trophy, Sparkles } from 'lucide-react';

interface ShareCardProps {
  score: number;
  badge: string;
}

export const ShareCard = React.forwardRef<HTMLDivElement, ShareCardProps>(({ score, badge }, ref) => {
  return (
    <div className="fixed top-[-9999px] left-[-9999px]">
      <div 
        ref={ref} 
        className="w-[400px] h-[500px] bg-background text-foreground flex flex-col justify-between p-8 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #0B1020 0%, #121A2E 100%)',
          border: '1px solid rgba(148,163,184,0.18)'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="z-10 flex items-center justify-center gap-2 mb-6">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-heading font-black tracking-tight">ScamIQ</h1>
        </div>

        <div className="z-10 flex flex-col items-center justify-center flex-1 text-center">
          <div className="text-muted-foreground uppercase tracking-widest text-sm font-bold mb-2">My Score</div>
          <div className="text-8xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent mb-4">
            {score}
          </div>
          
          <div className="flex items-center gap-2 bg-secondary/80 border border-secondary-foreground/10 px-4 py-2 rounded-full mb-6">
            <Trophy className="w-5 h-5 text-warning" />
            <span className="font-heading font-bold text-lg">{badge}</span>
          </div>

          <h2 className="text-2xl font-heading font-bold text-foreground max-w-[80%] mx-auto leading-tight">
            Can you spot the scam before it spots you?
          </h2>
        </div>

        <div className="z-10 flex items-center justify-between mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Play now</span>
          </div>
          <div className="text-muted-foreground font-mono text-sm">
            scamiq.app
          </div>
        </div>
      </div>
    </div>
  );
});

ShareCard.displayName = 'ShareCard';
