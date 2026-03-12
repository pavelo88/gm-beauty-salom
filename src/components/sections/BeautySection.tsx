"use client"

import React, { useState } from 'react';
import { Scissors, Sparkles, Wand2 } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiStylistRecommendations } from '@/ai/flows/ai-stylist-recommendations';
import { cn } from '@/lib/utils';

export function BeautySection({ dynamicData }: { dynamicData: any }) {
  const [concept, setConcept] = useState<'salon' | 'barberia'>('salon');
  const isBarber = concept === 'barberia';

  const services = dynamicData.services.filter((s: any) => s.category === concept);

  return (
    <div className={cn(
      "w-full transition-colors duration-1000 bg-texture",
      isBarber ? "bg-black text-white" : "bg-white text-black"
    )}>
      <div className="max-w-[1600px] mx-auto px-6 py-32">
        
        {/* Toggle Masthead */}
        <div className="flex justify-center mb-32">
          <div className="border border-border p-1 flex items-center">
            <button 
              onClick={() => setConcept('salon')}
              className={cn(
                "px-12 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                !isBarber ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Le Salon
            </button>
            <button 
              onClick={() => setConcept('barberia')}
              className={cn(
                "px-12 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                isBarber ? "bg-primary text-black" : "text-muted-foreground hover:text-primary"
              )}
            >
              The Barber Shop
            </button>
          </div>
        </div>

        <div className="magazine-grid items-start gap-12">
          {/* Content Left */}
          <div className="col-span-12 md:col-span-5 space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-[0.5em] text-primary">Department {isBarber ? '02' : '01'}</span>
              <h2 className="text-7xl md:text-9xl font-headline font-bold italic leading-none">
                {isBarber ? 'Grooming' : 'Couture'} <br/> 
                <span className="not-italic opacity-40">Artistry</span>
              </h2>
            </div>

            <div className="pt-8">
              <AiAssistant 
                title="AI Creative Stylist"
                placeholder="Describe tu visión o evento..."
                onAsk={(input) => aiStylistRecommendations({ userQuery: input, concept })}
                isLightMode={!isBarber}
              />
            </div>

            <div className="p-12 border border-border relative overflow-hidden group">
              <img 
                src={isBarber 
                  ? "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800"
                  : "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800"} 
                alt="Portrait"
                className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12 text-center">
                <h4 className="text-xl font-headline font-bold italic">"Crafting Identity"</h4>
              </div>
            </div>
          </div>

          {/* Menu Right */}
          <div className="col-span-12 md:col-span-7 bg-muted/30 p-12 md:p-24 space-y-16">
            <div className="flex justify-between items-end border-b border-border pb-8">
              <h3 className="text-4xl font-headline font-bold italic">Services Menu</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Volume I</span>
            </div>

            <div className="space-y-12">
              {services.length > 0 ? (
                services.map((s: any, i: number) => (
                  <div key={i} className="group grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-border/50 pb-8 hover:translate-x-2 transition-all cursor-default">
                    <div className="md:col-span-3 space-y-2">
                      <h4 className="text-2xl font-headline font-bold uppercase">{s.name}</h4>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed max-w-md">{s.description}</p>
                    </div>
                    <div className="text-right flex flex-col justify-center">
                      <span className="text-2xl font-light text-primary">{s.price}</span>
                      <span className="text-[8px] uppercase tracking-tighter opacity-40">Est. Time 45m</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-24 italic text-muted-foreground">
                  Catálogo de servicios personalizado en recepción.
                </div>
              )}
            </div>

            <div className="pt-12 text-center">
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-muted-foreground mb-8">Exclusive Products Used</p>
              <div className="flex justify-center gap-12 opacity-40 grayscale filter">
                {/* Brand Logos Placeholder */}
                <span className="text-xs font-black tracking-tighter">L'OREAL</span>
                <span className="text-xs font-black tracking-tighter">KERASTASE</span>
                <span className="text-xs font-black tracking-tighter">DYSON</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
