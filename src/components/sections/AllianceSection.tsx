"use client"

import React from 'react';
import { Sofa, ExternalLink, Sparkles, MoveRight } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function AllianceSection({ dynamicData }: { dynamicData: any }) {
  const staticProjects = [
    { title: 'Cuisines Modernes', description: 'Minimalismo funcional con acabados en negro mate y piedra natural.', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800' },
    { title: 'Espace Divertissement', description: 'Sistemas integrados de audio y video con diseño estructural oculto.', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800' },
    { title: 'Atelier de Mode', description: 'Vestidores con iluminación museística para colecciones privadas.', img: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&q=80&w=800' }
  ];

  const allProjects = [...staticProjects, ...dynamicData.projects];

  return (
    <div className="w-full pt-40 pb-20">
      <div className="max-w-[1600px] mx-auto px-10 space-y-40">
        
        <header className="magazine-grid items-center gap-16">
          <div className="col-span-12 lg:col-span-7 space-y-12">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Atelier Collaboration</span>
              <span className="w-20 h-[1px] bg-border"></span>
            </div>
            <h2 className="text-7xl md:text-[9rem] font-headline font-bold leading-[0.8] tracking-tighter">
              ESPACES <br/><span className="text-gold-gradient italic">MODERNES</span>
            </h2>
            <p className="text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Nuestra alianza exclusiva con <span className="text-foreground font-bold italic tracking-tighter">Modulares GM</span> redefine la estructura de tu hogar. Diseño modular que respira estética contemporánea.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 pt-10">
            <AiAssistant 
              title="Interior Design AI"
              placeholder="Ej: Necesito optimizar mi estudio con un estilo minimalista..."
              onAsk={async (input) => ({ recommendation: "Recomendamos una estructura modular en acabados mate con iluminación lineal empotrada para enfatizar la verticalidad del espacio." })}
              isLightMode={true}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-card border border-border p-16 md:p-24 overflow-hidden relative editorial-shadow group">
            <div className="absolute -right-20 -bottom-20 opacity-[0.03] text-foreground pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Sofa size={500} />
            </div>
            <div className="relative z-10 space-y-12">
              <h3 className="text-5xl font-headline font-bold tracking-tighter leading-tight">Diseño que <br/> <span className="italic opacity-40">habla de ti.</span></h3>
              <p className="text-muted-foreground text-lg font-light leading-relaxed">
                Cada módulo es una pieza de arte funcional. Cotiza y visualiza tu proyecto mientras disfrutas de nuestra curaduría estética.
              </p>
              <div className="pt-10">
                <Button asChild className="h-auto py-6 px-12 rounded-none bg-foreground text-background font-black uppercase tracking-[0.4em] hover:bg-primary transition-all text-[10px]">
                  <a href="https://modularesgm.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                    Visit the Atelier
                    <MoveRight size={16} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-auto overflow-hidden editorial-shadow">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s] scale-105"
              alt="Interior Showcase"
            />
          </div>
        </div>
        
        <div className="space-y-20">
          <div className="flex justify-between items-end border-b border-border pb-10">
            <h3 className="text-4xl font-headline font-bold italic">Latest Prototypes</h3>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Series MMXXIV</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {allProjects.map((item: any, i) => (
              <div key={i} className="group space-y-8">
                <div className="aspect-[4/5] overflow-hidden editorial-shadow bg-muted">
                  <img 
                    src={item.img || item.imageUrl || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                    alt={item.title} 
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-headline font-bold tracking-tighter group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}