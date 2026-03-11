"use client"

import React, { useState } from 'react';
import { Sparkles, Send, Loader2, X, ChevronRight, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AiAssistantProps {
  title: string;
  placeholder: string;
  onAsk: (input: string) => Promise<string | { recommendation: string }>;
  isLightMode?: boolean;
}

export function AiAssistant({ title, placeholder, onAsk, isLightMode = false }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await onAsk(input);
      if (typeof res === 'string') {
        setResponse(res);
      } else {
        setResponse(res.recommendation);
      }
    } catch (e) {
      setResponse("Lo sentimos, nuestro asesor AI está descansando. Intenta de nuevo.");
    }
    setLoading(false);
  };

  const accentColor = isLightMode ? "text-accent" : "text-primary";

  return (
    <Card className={cn(
      "w-full mt-6 mb-8 rounded-3xl border shadow-2xl transition-all duration-500 overflow-hidden",
      isLightMode ? "bg-white border-accent/20" : "bg-card border-primary/20"
    )}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 hover:bg-black/5 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Sparkles className={accentColor} size={24} />
          <CardTitle className={cn("text-lg", isLightMode ? "text-zinc-800" : "text-white")}>
            {title}
          </CardTitle>
        </div>
        {isOpen ? <X className="text-muted-foreground" /> : <ChevronRight className="text-muted-foreground" />}
      </button>

      {isOpen && (
        <CardContent className="px-6 pb-6 animate-in slide-in-from-top-4 duration-300">
          <div className="flex gap-2">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder={placeholder}
              className={cn(
                "flex-grow p-4 rounded-xl border focus:outline-none focus:ring-2",
                isLightMode ? "bg-zinc-50 border-zinc-200 text-zinc-800 focus:ring-accent" : "bg-black border-zinc-800 text-white focus:ring-primary"
              )}
            />
            <Button 
              onClick={handleAsk}
              disabled={loading || !input.trim()}
              className={cn(
                "px-6 h-auto py-4 rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-105",
                isLightMode ? "bg-rose-gold text-white" : "bg-gold-vibrant text-black"
              )}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </Button>
          </div>

          {response && (
            <div className={cn(
              "mt-6 p-6 rounded-2xl border animate-in fade-in duration-500",
              isLightMode ? "bg-zinc-50 border-zinc-200" : "bg-black border-zinc-800"
            )}>
              <h4 className={cn(
                "text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2",
                accentColor
              )}>
                <Wand2 size={14} /> Recomendación AI
              </h4>
              <p className={cn(
                "font-body leading-relaxed",
                isLightMode ? "text-zinc-700" : "text-zinc-300"
              )}>
                {response}
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
