"use client"

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HomeSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const sections = [
    { id: 'beauty', title: 'Archivo de Belleza', subtitle: 'Salón & Barbería', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200', text: 'Curaduría técnica en corte y color editorial en el sur de Quito.' },
    { id: 'boutique', title: 'Moda Editorial', subtitle: 'Boutique & Esencias', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200', text: 'Piezas seleccionadas que trascienden temporadas. Moda y perfumería de autor.' },
    { id: 'alliance', title: 'Arte Estructural', subtitle: 'Interiorismo', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200', text: 'Espacios modulares diseñados para el mañana en alianza con Modulares GM.' },
    { id: 'tv', title: 'GM TV Emisión', subtitle: 'Centro de Entretenimiento', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200', text: 'Contenido exclusivo proyectado en nuestra casa. El pulso de la cultura visual.' },
  ];

  return (
    <div className="w-full">
      <section className="relative h-[70vh] flex flex-col justify-center items-center px-6 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover img-cinematic scale-105" 
            alt="GM Beauty House Portada Editorial" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80"></div>
        </div>
        
        <div className="relative z-10 text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="text-[9px] uppercase tracking-[0.6em] font-black text-primary">Volumen Uno • Quito Sur</span>
            <span className="w-8 h-[1px] bg-primary"></span>
          </div>
          <h1 className="text-editorial-title animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            GM <br/> <span className="text-gold-gradient italic">HOUSE</span>
          </h1>
          <p className="max-w-xl mx-auto text-[8px] md:text-[10px] text-foreground/60 font-medium tracking-[0.4em] uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 px-4">
            Definiendo el Manifiesto Estético del Lujo Moderno en Quito
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-16 md:py-24 px-6 space-y-20 md:space-y-32">
        {sections.map((section, idx) => (
          <div 
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={cn(
              "flex flex-col md:flex-row items-center gap-8 md:gap-16 cursor-pointer group",
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            )}
          >
            <div className="w-full md:w-6/12 overflow-hidden bg-muted aspect-video md:aspect-[16/9] editorial-shadow relative rounded-xl">
              <img 
                src={section.img} 
                alt={section.title} 
                className="w-full h-full object-cover img-cinematic group-hover:scale-105"
              />
            </div>
            <div className="w-full md:w-6/12 space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">{section.subtitle}</span>
                <h2 className="text-3xl md:text-5xl font-headline font-bold leading-none tracking-tighter group-hover:translate-x-2 transition-transform duration-700">{section.title}</h2>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed text-xs md:text-sm max-w-sm">
                {section.text}
              </p>
              <button className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] group-hover:gap-6 transition-all pt-4 border-t border-border w-fit">
                Leer Más <ArrowRight size={10} className="text-primary" />
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-foreground text-background py-20 md:py-32 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-10 relative z-10">
          <h3 className="italic font-headline text-xl md:text-4xl leading-tight tracking-tighter mb-6 md:mb-8">
            "El lujo no es la acumulación, es la intención. En GM House, cada servicio es un acto de diseño consciente."
          </h3>
          <span className="text-[9px] uppercase tracking-[0.6em] font-black text-primary opacity-60">Manifiesto 2024 • Edición Quito Sur</span>
        </div>
      </section>
    </div>
  );
}
