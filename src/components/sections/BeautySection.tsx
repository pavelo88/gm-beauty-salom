
"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Wine, GlassWater, Beer } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiStylistRecommendations } from '@/ai/flows/ai-stylist-recommendations';

export function BeautySection({ dynamicData }: { dynamicData: any }) {
  const [concept, setConcept] = useState<'salon' | 'barberia'>('salon');
  const [activeIdx, setActiveIdx] = useState(2);
  const isBarber = concept === 'barberia';
  const settings = dynamicData.settings;

  const defaultServices = {
    salon: [
      { name: 'Balayage Editorial', price: 'Cotizar', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Corte de Autor', price: '$25.00', imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Hidratación Molecular', price: '$45.00', imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Maquillaje Pro', price: '$50.00', imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Manicura Spa', price: '$20.00', imageUrl: 'https://images.unsplash.com/photo-1610992015732-2449b0c26296?auto=format&fit=crop&q=80&w=1200' }
    ],
    barberia: [
      { name: 'Corte Ejecutivo', price: '$20.00', imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Ritual de Barba', price: '$15.00', imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d6d4e59?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Corte & Skin Fade', price: '$22.00', imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Black Mask VIP', price: '$10.00', imageUrl: 'https://images.unsplash.com/photo-1595867366775-c40d9564a0dc?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Color Freestyle', price: '$40.00', imageUrl: 'https://images.unsplash.com/photo-1634480555299-286df8433374?auto=format&fit=crop&q=80&w=1200' }
    ]
  };

  const services = useMemo(() => {
    const dbServices = dynamicData.services.filter((s: any) => s.category === concept);
    return dbServices.length > 0 ? dbServices : defaultServices[concept];
  }, [concept, dynamicData.services]);

  const rotate = (dir: number) => {
    setActiveIdx((prev) => (prev + dir + services.length) % services.length);
  };

  useEffect(() => {
    const timer = setInterval(() => { rotate(1); }, 3500);
    return () => clearInterval(timer);
  }, [services.length]);

  const accentColor = isBarber ? "text-primary" : "text-[#d1919b]"; 

  return (
    <div className="w-full pt-20 pb-24 animate-in fade-in duration-1000">
      <div className="max-w-[1400px] mx-auto px-6 space-y-16">
        <header className="flex flex-col md:flex-row justify-between items-start gap-10 border-b border-border/20 pb-8">
          <div className="space-y-2">
            <span className={cn("text-[10px] font-black uppercase tracking-[0.6em]", accentColor)}>
              {settings?.homeBeautySubtitle || 'Edición Archive No. 01'}
            </span>
            <h2 className="text-5xl md:text-7xl font-headline font-bold leading-none tracking-tighter uppercase">
              {settings?.homeBeautyTitle || 'Grooming & Style'}
            </h2>
          </div>
          <div className="flex border border-border/30 p-1.5 bg-card/40 backdrop-blur-xl rounded-full self-end shadow-xl">
            <button onClick={() => setConcept('salon')} className={cn("px-8 py-3 text-[10px] font-black uppercase transition-all rounded-full", !isBarber ? "bg-[#d1919b] text-white shadow-lg" : "text-muted-foreground")}>Le Salon</button>
            <button onClick={() => setConcept('barberia')} className={cn("px-8 py-3 text-[10px] font-black uppercase transition-all rounded-full", isBarber ? "bg-primary text-black shadow-lg" : "text-muted-foreground")}>Barbería</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <div className="relative h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                {services.map((svc: any, i: number) => {
                  let diff = i - activeIdx;
                  if (diff > 2) diff -= services.length;
                  if (diff < -2) diff += services.length;
                  const isCenter = diff === 0;
                  return (
                    <div 
                      key={i} 
                      className={cn(
                        "absolute [transition-duration:1000ms] ease-in-out overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10", 
                        isCenter ? "z-30 w-[95%] md:w-[70%] h-full opacity-100 scale-100" : "w-[75%] h-[85%] opacity-30 scale-90 blur-[2px]", 
                        diff === -1 ? "-translate-x-[35%]" : diff === 1 ? "translate-x-[35%]" : "opacity-0"
                      )}
                    >
                      <img src={svc.imageUrl} alt={svc.name} className="w-full h-full object-cover" />
                      {isCenter && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
                          <span className={cn("text-xs font-black uppercase tracking-widest", accentColor)}>{svc.price}</span>
                          <h3 className="text-3xl md:text-6xl font-headline font-bold text-white uppercase leading-none tracking-tighter mt-2">{svc.name}</h3>
                          <p className="text-white/60 text-sm font-light mt-4 max-w-md hidden md:block">{svc.description}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-card border border-border/50 rounded-[2.5rem] shadow-xl">
              <p className="text-sm font-light leading-relaxed text-muted-foreground italic">
                {settings?.homeBeautyText || 'Curaduría técnica en corte y color editorial en el sur de Quito.'}
              </p>
            </div>
            <AiAssistant title="Estilista VIP IA" placeholder="Busco un estilo..." onAsk={(input) => aiStylistRecommendations({ userQuery: input, concept })} />
          </div>
        </div>
      </div>
    </div>
  );
}
