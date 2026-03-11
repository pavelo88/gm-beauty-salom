"use client"

import React from 'react';
import { Sofa, ExternalLink, Sparkles } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function AllianceSection({ dynamicData }: { dynamicData: any }) {
  const staticProjects = [
    { title: 'Cocinas Modernas', description: 'Melamina de alta resistencia, mesones de granito y herrajes cierre lento.', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800' },
    { title: 'Centros de Entretenimiento', description: 'Diseños a medida para TV, consolas y luces LED integradas.', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800' },
    { title: 'Closets y Vestidores', description: 'Aprovechamiento de espacios, cajoneras amplias y acabados espejo.', img: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&q=80&w=800' }
  ];

  const allProjects = [...staticProjects, ...dynamicData.projects];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20 animate-in slide-in-from-bottom-8 duration-700">
      
      <AiAssistant 
        title="Diseñador de Interiores AI ✨"
        placeholder="Ej: Quiero remodelar mi sala pequeña para que luzca moderna y amplia."
        onAsk={async (input) => ({ recommendation: "Un diseño modular en tonos neutros con iluminación LED perimetral ampliaría visualmente el espacio." })} // Fallback for interior design
      />

      <div className="bg-card border border-primary/20 rounded-[3rem] p-12 md:p-24 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 text-primary pointer-events-none">
          <Sofa size={400} />
        </div>
        
        <div className="max-w-3xl relative z-10 space-y-10">
          <div className="inline-flex items-center space-x-3 bg-primary/10 border border-primary/30 text-primary px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest">
            <Sparkles size={18} />
            <span>Alianza Estratégica</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-headline font-bold text-white leading-[1.1]">
            Construye el hogar <br/><span className="text-gold">de tus sueños.</span>
          </h2>
          <p className="text-zinc-400 text-2xl font-light leading-relaxed">
            Nuestra alianza exclusiva con <span className="text-primary font-bold">Modulares GM</span> te permite cotizar, diseñar y visualizar la remodelación de tu casa mientras te arreglas para el fin de semana.
          </p>
          
          <div className="pt-6">
            <Button asChild className="h-auto py-5 px-10 rounded-2xl bg-gold-vibrant text-black font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/20">
              <a href="https://modularesgm.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                Explorar Catálogo GM
                <ExternalLink size={20} />
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-12">
        <h3 className="text-4xl font-headline font-bold text-white mb-4">Especialidades Modulares GM</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allProjects.map((item: any, i) => (
            <div key={i} className="bg-card rounded-[2rem] border border-border overflow-hidden group hover:border-primary/50 transition-all hover:shadow-2xl">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.img || item.imageUrl || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt={item.title} 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500"></div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-headline font-bold text-white mb-3">{item.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
