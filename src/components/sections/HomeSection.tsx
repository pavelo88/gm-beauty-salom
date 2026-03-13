
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
      {/* Hero Cover - Iniciando sin espacio muerto */}
      <section className="relative h-[85vh] md:h-screen flex flex-col justify-center items-center px-10 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover img-cinematic scale-110" 
            alt="GM Beauty House Portada Editorial" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-60"></div>
        </div>
        
        <div className="relative z-10 text-center space-y-4 md:space-y-6">
          <div className="flex items-center justify-center gap-4 mb-4 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="w-6 md:w-10 h-[1px] bg-primary"></span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.6em] font-black text-primary">Volumen Uno • Quito Sur</span>
            <span className="w-6 md:w-10 h-[1px] bg-primary"></span>
          </div>
          <h1 className="text-editorial-title animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            GM <br/> <span className="text-gold-gradient italic">HOUSE</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[7px] md:text-xs text-foreground/60 font-medium tracking-[0.5em] uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 px-4">
            Definiendo el Manifiesto Estético del Lujo Moderno en Quito
          </p>
        </div>

        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[7px] uppercase tracking-widest font-bold">Explora la Revista</span>
          <div className="w-[1px] h-10 bg-foreground animate-pulse"></div>
        </div>
      </section>

      {/* Spreads - Espaciado Optimizado */}
      <section className="max-w-[1400px] mx-auto py-16 md:py-32 px-6 md:px-10 space-y-16 md:space-y-32">
        {sections.map((section, idx) => (
          <div 
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={cn(
              "flex flex-col md:flex-row items-center gap-8 md:gap-16 cursor-pointer group",
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            )}
          >
            <div className="w-full md:w-7/12 overflow-hidden bg-muted aspect-[4/5] md:aspect-[16/9] editorial-shadow relative rounded-xl md:rounded-none">
              <img 
                src={section.img} 
                alt={section.title} 
                className="w-full h-full object-cover img-cinematic group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700"></div>
            </div>
            <div className="w-full md:w-5/12 space-y-4 md:space-y-8">
              <div className="space-y-1 md:space-y-2">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">{section.subtitle}</span>
                <h2 className="text-4xl md:text-6xl font-headline font-bold leading-none tracking-tighter group-hover:translate-x-4 transition-transform duration-700">{section.title}</h2>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed text-sm md:text-base max-w-sm">
                {section.text}
              </p>
              <button className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.3em] group-hover:gap-8 transition-all pt-4 md:pt-8 border-t border-border w-fit">
                Leer Más <ArrowRight size={12} className="text-primary" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Manifiesto */}
      <section className="bg-foreground text-background py-24 md:py-40 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none">
          <h2 className="text-[15rem] md:text-[25rem] font-black leading-none opacity-20 transform -rotate-12">LUJO</h2>
        </div>
        <div className="max-w-4xl mx-auto px-10 relative z-10">
          <h3 className="italic font-headline text-2xl md:text-6xl leading-tight tracking-tighter mb-8 md:mb-12">
            "El lujo no es la acumulación, es la intención. En GM House, cada servicio es un acto de diseño consciente."
          </h3>
          <span className="text-[9px] uppercase tracking-[0.6em] font-black text-primary opacity-60">Manifiesto 2024 • Edición Quito Sur</span>
        </div>
      </section>
    </div>
  );
}
