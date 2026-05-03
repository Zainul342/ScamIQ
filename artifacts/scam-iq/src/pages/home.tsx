import { Link } from "wouter";
import { Shield, Target, Trophy, Share2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-6 z-10">
        
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary mb-6 border border-border shadow-2xl relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl"></div>
            <Shield className="w-10 h-10 text-primary relative z-10" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-heading font-black tracking-tight text-foreground mb-4">
            Scam<span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">IQ</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-medium mb-12">
            Can you spot the scam before it spots you?
          </p>

          <Link href="/game" className="w-full sm:w-auto" data-testid="link-play-now">
            <Button size="lg" className="w-full sm:w-auto text-xl h-16 px-12 rounded-full font-bold shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)] hover:shadow-[0_0_60px_-10px_rgba(56,189,248,0.7)] transition-all">
              <Play className="w-6 h-6 mr-2 fill-current" />
              Play Now
            </Button>
          </Link>
          
          <div className="mt-8 px-6 py-2 rounded-full bg-secondary/50 border border-border text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            Join 10,000+ scam spotters
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="bg-card p-6 rounded-2xl border border-card-border flex flex-col items-center text-center gap-4 hover-elevate">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-lg">Test Your Instincts</h3>
            <p className="text-sm text-muted-foreground">8 rapid-fire rounds of real-world phishing attempts.</p>
          </div>
          
          <div className="bg-card p-6 rounded-2xl border border-card-border flex flex-col items-center text-center gap-4 hover-elevate">
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-heading font-bold text-lg">Learn Red Flags</h3>
            <p className="text-sm text-muted-foreground">Instant feedback and actionable tips to stay safe online.</p>
          </div>
          
          <div className="bg-card p-6 rounded-2xl border border-card-border flex flex-col items-center text-center gap-4 hover-elevate">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Share2 className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-heading font-bold text-lg">Share Your Score</h3>
            <p className="text-sm text-muted-foreground">Prove your cybersecurity savvy to friends and coworkers.</p>
          </div>
        </div>
      </main>
      
      <footer className="w-full py-6 text-center text-muted-foreground text-sm border-t border-border z-10 bg-background/80 backdrop-blur-sm">
        Built with React • Stay Vigilant
      </footer>
    </div>
  );
}
