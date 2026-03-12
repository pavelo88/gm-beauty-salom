"use client"

import React, { useState } from 'react';
import { Scissors, Star, Wand2 } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiStylistRecommendations } from '@/ai/flows/ai-stylist-recommendations';
import { cn } from '@/lib/utils';

export function BeautySection({ dynamicData }: { dynamicData: any }) {
  const [concept, setConcept] = useState<'salon' | 'barberia'>('salon');
  const isBarber = concept === 'barberia';

  const services = dynamicData.services.filter((s: any) => s.category === concept);

  return (
    <div className="w-full pt-40 pb-20">
      <div className="max-w-[1600px] mx-auto px-10">
        
        {/* Toggle Masthead */}
        <div className="flex justify-center mb-40">
          <div className="border border-border p-1 flex items-center bg-card/50 backdrop-blur-sm">
            <button 
              onClick={() => setConcept('salon')}
              className={cn(
                "px-16 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all",
                !isBarber ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Le Salon
            </button>
            <button 
              onClick={() => setConcept('barberia')}
              className={cn(
                "px-16 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all",
                isBarber ? "bg-primary text-background dark:text-foreground" : "text-muted-foreground hover:text-primary"
              )}
            >
              Barber Shop
            </button>
          </div>
        </div>

        <div className="magazine-grid items-start gap-20">
          {/* Content Left */}
          <div className="col-span-12 lg:col-span-5 space-y-20">
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Department {isBarber ? '02' : '01'}</span>
              <h2 className="text-7xl md:text-[8rem] font-headline font-bold italic leading-[0.85] tracking-tighter">
                {isBarber ? 'Grooming' : 'Couture'} <br/> 
                <span className="not-italic opacity-30">Archive</span>
              </h2>
            </div>

            <div className="pt-10">
              <AiAssistant 
                title="AI Creative Stylist"
                placeholder="Describe tu visión o evento..."
                onAsk={(input) => aiStylistRecommendations({ userQuery: input, concept })}
                isLightMode={false} // Use dark mode aesthetic for AI assistant
              />
            </div>

            <div className="p-2 border border-border editorial-shadow bg-card relative overflow-hidden group">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={isBarber 
                    ? "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800"
                    : "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800"} 
                  alt="Portrait Archive"
                  className="w-full h-full object-cover img-cinematic"
                />
              </div>
              <div className="absolute bottom-8 left-8 right-8 text-center bg-background/80 backdrop-blur-md p-6 border border-border">
                <h4 className="text-lg font-headline font-bold italic">"Visual Identity Manifested"</h4>
              </div>
            </div>
          </div>

          {/* Menu Right */}
          <div className="col-span-12 lg:col-span-7 bg-card/40 backdrop-blur-sm p-10 md:p-24 space-y-24 border border-border/50">
            <div className="flex justify-between items-end border-b border-border pb-10">
              <div className="space-y-2">
                <h3 className="text-5xl font-headline font-bold italic">Menu Privé</h3>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Fall/Winter Edition</p>
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.5em] opacity-30">Page 42</span>
            </div>

            <div className="space-y-16">
              {services.length > 0 ? (
                services.map((s: any, i: number) => (
                  <div key={i} className="group grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-border/30 pb-12 hover:translate-x-4 transition-all duration-500 cursor-default">
                    <div className="md:col-span-3 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-primary opacity-40">0{i+1}</span>
                        <h4 className="text-3xl font-headline font-bold uppercase tracking-tighter">{s.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-lg">{s.description}</p>
                    </div>
                    <div className="text-right flex flex-col justify-end">
                      <span className="text-3xl font-light italic text-primary">{s.price}</span>
                      <span className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-30 mt-2">Premium Service</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-40 italic text-muted-foreground border border-dashed border-border">
                  Consulte nuestra selección exclusiva en recepción.
                </div>
              )}
            </div>

            <div className="pt-20 border-t border-border">
              <div className="flex flex-col items-center gap-10">
                <p className="text-[10px] uppercase tracking-[0.6em] font-black text-muted-foreground">Partners in Excellence</p>
                <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                  <span className="text-sm font-black tracking-tighter">L'ORÉAL PROFESSIONNEL</span>
                  <span className="text-sm font-black tracking-tighter">KÉRASTASE</span>
                  <span className="text-sm font-black tracking-tighter">DYSON PRO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}