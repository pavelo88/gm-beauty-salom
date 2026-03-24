
"use client"

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HomeSection({ setActiveTab, settings }: { setActiveTab: (tab: string) => void, settings: any }) {
  const sections = [
    { 
      id: 'beauty', 
      title: settings?.homeBeautyTitle || 'Archivo de Belleza', 
      subtitle: settings?.homeBeautySubtitle || 'Salón & Barbería', 
      img: settings?.homeBeautyImage || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200', 
      text: settings?.homeBeautyText || 'Curaduría técnica en corte y color editorial en el sur de Quito.' 
    },
    { 
      id: 'boutique', 
      title: settings?.homeBoutiqueTitle || 'Moda Editorial', 
      subtitle: settings?.homeBoutiqueSubtitle || 'Boutique & Esencias', 
      img: settings?.homeBoutiqueImage || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200', 
      text: settings?.homeBoutiqueText || 'Piezas seleccionadas que trascienden temporadas. Moda y perfumería de autor.' 
    },
    { 
      id: 'alliance', 
      title: settings?.homeAllianceTitle || 'Arte Estructural', 
      subtitle: settings?.homeAllianceSubtitle || 'Interiorismo', 
      img: settings?.homeAllianceImage || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200', 
      text: settings?.homeAllianceText || 'Espacios modulares diseñados para el mañana en alianza con Modulares GM.' 
    },
    { 
      id: 'tv', 
      title: settings?.homeTvTitle || 'GM TV Emisión', 
      subtitle: settings?.homeTvSubtitle || 'Centro de Entretenimiento', 
      img: settings?.homeTvImage || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200', 
      text: settings?.homeTvText || 'Contenido exclusivo proyectado en nuestra casa. El pulso de la cultura visual.' 
    },
  ];

  const heroBg = settings?.heroImage || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000';

  return (
    <div className="w-full">
      <section className="relative h-[85vh] flex flex-col justify-center items-center px-6 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            className="w-full h-full object-cover img-cinematic scale-105" 
            alt="GM Beauty House Portada Editorial" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background/95"></div>
        </div>
        
        <div className="relative z-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-6 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="w-12 h-[1px] bg-primary"></span>
            <span className="text-[10px] uppercase tracking-[0.8em] font-black text-primary drop-shadow-lg">Volumen Uno • Quito Sur</span>
            <span className="w-12 h-[1px] bg-primary"></span>
          </div>
          <h1 className="text-editorial-title text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {settings?.heroTitle || 'GM HOUSE'}
          </h1>
          <p className="max-w-2xl mx-auto text-[10px] md:text-[12px] text-white/90 font-medium tracking-[0.4em] uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 px-4 drop-shadow-2xl">
            {settings?.heroSubtitle || 'Definiendo el Manifiesto Estético del Lujo Moderno'}
          </p>
        </div>
      </section>

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
                className="w-full h-full object-cover img-cinematic group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>
            <div className="w-full md:w-5/12 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">{section.subtitle}</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-[0.9] tracking-tighter group-hover:text-primary transition-all duration-700">{section.title}</h2>
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

      <section className="bg-foreground text-background py-32 md:py-48 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-10 relative z-10 space-y-12">
          <h3 className="italic font-headline text-2xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
            "{settings?.manifestoTitle || 'El lujo es una intención'}"
          </h3>
          <p className="text-xs md:text-sm opacity-60 uppercase tracking-widest font-light max-w-xl mx-auto">
            {settings?.manifestoText || 'En GM Beauty House, cada servicio es un acto de diseño consciente.'}
          </p>
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
