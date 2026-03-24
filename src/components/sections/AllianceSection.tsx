"use client"

import React from 'react';
import { Sofa, MoveRight } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { Button } from '@/components/ui/button';

export function AllianceSection({ dynamicData }: { dynamicData: any }) {
  const storeUrl = "https://www.modularesgm.com/store";
  
  const staticProjects = [
    { title: 'Cocinas Modernas', description: 'Minimalismo funcional con acabados en negro mate.', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800' },
    { title: 'Entretenimiento', description: 'Sistemas integrados de audio y video.', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800' },
    { title: 'Vestidores Lujo', description: 'Iluminación museística para colecciones.', img: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&q=80&w=800' }
  ];

  const allProjects = [...staticProjects, ...dynamicData.projects];

  return (
    <div className="w-full pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 space-y-24">
        
        <header className="magazine-grid items-center gap-10">
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-black uppercase tracking-[0.6em] text-primary">Diseño de Interiores</span>
              <span className="w-16 h-[1px] bg-border"></span>
            </div>
            <h2 className="text-editorial-title">
              ESPACIOS <br/><span className="text-gold-gradient italic">MODERNOS</span>
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl">
              Alianza exclusiva con <span className="text-foreground font-bold italic tracking-tighter">Modulares GM</span> en el Sur de Quito.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 max-w-md">
            <AiAssistant 
              title="Asesor de Interiores IA"
              placeholder="Ej: Optimizar mi sala..."
              onAsk={async (input) => ({ recommendation: "Para el Sur de Quito recomendamos estructuras modulares en acabados mate con iluminación lineal empotrada." })}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border p-10 md:p-16 overflow-hidden relative editorial-shadow rounded-2xl">
            <div className="relative z-10 space-y-8">
              <h3 className="text-3xl font-headline font-bold tracking-tighter leading-tight">Diseño <br/> <span className="italic opacity-40">funcional.</span></h3>
              <p className="text-muted-foreground text-base font-light leading-relaxed max-w-sm">
                Cada módulo es una pieza de arte. Cotiza tu proyecto en GM House.
              </p>
              <div className="pt-4">
                <Button asChild className="h-auto py-4 px-8 rounded-xl bg-foreground text-background font-black uppercase tracking-[0.3em] hover:bg-primary transition-all text-[9px]">
                  <a href={storeUrl} target="_blank" className="flex items-center gap-4">
                    Ver Proyectos en Tienda
                    <MoveRight size={14} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <a href={storeUrl} target="_blank" className="relative aspect-video md:aspect-auto overflow-hidden editorial-shadow rounded-2xl max-h-[400px] block group">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all [transition-duration:2000ms]"
              alt="Mobiliario GM"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white border border-white/40 px-6 py-2 backdrop-blur-sm">Ir a la Tienda</span>
            </div>
          </a>
        </div>
        
        <div className="space-y-12">
          <div className="flex justify-between items-end border-b border-border pb-6">
            <h3 className="text-2xl font-headline font-bold italic">Portafolio</h3>
            <span className="text-[8px] font-black uppercase tracking-widest opacity-30">Quito MMXXIV</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allProjects.map((item: any, i) => (
              <a key={i} href={storeUrl} target="_blank" className="group space-y-4 block">
                <div className="aspect-square overflow-hidden editorial-shadow bg-muted rounded-xl relative">
                  <img 
                    src={item.img || item.imageUrl} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                    alt={item.title} 
                  />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur p-2 rounded-full shadow-lg">
                      <MoveRight size={16} className="text-black" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-headline font-bold tracking-tighter uppercase group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-muted-foreground text-xs font-light line-clamp-2">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}