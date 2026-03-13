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
      {/* HERO con legibilidad mejorada */}
      <section className="relative h-[85vh] flex flex-col justify-center items-center px-6 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover img-cinematic scale-105" 
            alt="GM Beauty House Portada Editorial" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background/90"></div>
        </div>
        
        <div className="relative z-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-6 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="w-12 h-[1px] bg-primary"></span>
            <span className="text-[10px] uppercase tracking-[0.8em] font-black text-primary drop-shadow-lg">Volumen Uno • Quito Sur</span>
            <span className="w-12 h-[1px] bg-primary"></span>
          </div>
          <h1 className="text-editorial-title text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            GM <br/> <span className="text-gold-gradient italic font-light">HOUSE</span>
          </h1>
          <p className="max-w-xl mx-auto text-[9px] md:text-[11px] text-white/80 font-medium tracking-[0.5em] uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 px-4 drop-shadow-md">
            Definiendo el Manifiesto Estético del Lujo Moderno en Quito
          </p>
        </div>
      </section>

      {/* Secciones con espaciado ergonómico */}
      <section className="max-w-[1400px] mx-auto py-24 md:py-32 px-6 space-y-32 md:space-y-48">
        {sections.map((section, idx) => (
          <div 
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={cn(
              "flex flex-col md:flex-row items-center gap-12 md:gap-24 cursor-pointer group",
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            )}
          >
            <div className="w-full md:w-7/12 overflow-hidden bg-muted aspect-video md:aspect-[16/10] editorial-shadow relative rounded-2xl">
              <img 
                src={section.img} 
                alt={section.title} 
                className="w-full h-full object-cover img-cinematic group-hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>
            <div className="w-full md:w-5/12 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">{section.subtitle}</span>
                <h2 className="text-4xl md:text-6xl font-headline font-bold leading-[0.9] tracking-tighter group-hover:text-primary transition-all duration-700">{section.title}</h2>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed text-sm md:text-base max-w-sm">
                {section.text}
              </p>
              <button className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] group-hover:gap-8 transition-all pt-6 border-t border-border w-fit">
                Explorar <ArrowRight size={14} className="text-primary" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Manifiesto Final */}
      <section className="bg-foreground text-background py-32 md:py-48 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-10 relative z-10 space-y-12">
          <h3 className="italic font-headline text-2xl md:text-5xl leading-tight tracking-tighter">
            "El lujo no es la acumulación, es la intención. En GM Beauty House, cada servicio es un acto de diseño consciente."
          </h3>
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.8em] font-black text-primary opacity-80">Manifiesto MMXXIV</span>
            <span className="w-20 h-[1px] bg-primary/40"></span>
            <span className="text-[8px] uppercase tracking-[0.5em] font-medium opacity-40">Quito Sur • Distrito Metropolitano</span>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black opacity-[0.02] pointer-events-none italic">GM</div>
      </section>
    </div>
  );
}