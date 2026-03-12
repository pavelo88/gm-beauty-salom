"use client"

import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HomeSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const sections = [
    { id: 'beauty', title: 'The Beauty Archive', subtitle: 'Salon & Barber', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200', text: 'Curaduría técnica en corte y color editorial.' },
    { id: 'boutique', title: 'Editorial Wear', subtitle: 'Fashion & Scents', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200', text: 'Piezas seleccionadas que trascienden temporadas.' },
    { id: 'alliance', title: 'Structural Art', subtitle: 'Interior Design', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200', text: 'Espacios modulares diseñados para el mañana.' },
  ];

  return (
    <div className="w-full">
      {/* Hero Cover */}
      <section className="relative h-screen flex flex-col justify-center items-center px-10 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-10 dark:opacity-20 grayscale scale-110" 
            alt="Editorial Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-60"></div>
        </div>
        
        <div className="relative z-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="w-10 h-[1px] bg-primary"></span>
            <span className="text-[10px] uppercase tracking-[0.6em] font-black text-primary">Volume One • Issue 01</span>
            <span className="w-10 h-[1px] bg-primary"></span>
          </div>
          <h1 className="text-editorial-title animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            GM <br/> <span className="text-gold-gradient italic">HOUSE</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[10px] md:text-sm text-foreground/60 font-medium tracking-[0.5em] uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            Defining the Aesthetic Manifesto of Modern Luxury
          </p>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
          <span className="text-[8px] uppercase tracking-widest font-bold">Scroll to Explore</span>
          <div className="w-[1px] h-16 bg-foreground animate-pulse"></div>
        </div>
      </section>

      {/* Spreads */}
      <section className="max-w-[1400px] mx-auto py-60 px-10 space-y-80">
        {sections.map((section, idx) => (
          <div 
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={cn(
              "flex flex-col md:flex-row items-center gap-20 cursor-pointer group",
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            )}
          >
            <div className="w-full md:w-7/12 overflow-hidden bg-muted aspect-[4/5] md:aspect-[16/9] editorial-shadow relative">
              <img 
                src={section.img} 
                alt={section.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700"></div>
            </div>
            <div className="w-full md:w-5/12 space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{section.subtitle}</span>
                <h2 className="text-6xl md:text-8xl font-headline font-bold leading-none tracking-tighter group-hover:translate-x-4 transition-transform duration-700">{section.title}</h2>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed text-lg max-w-sm">
                {section.text} Un espacio diseñado para la sofisticación y el detalle técnico.
              </p>
              <button className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] group-hover:gap-10 transition-all pt-10 border-t border-border w-fit">
                Explore Story <ArrowRight size={14} className="text-primary" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Manifesto */}
      <section className="bg-foreground text-background py-60 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none">
          <h2 className="text-[30rem] font-black leading-none opacity-20 transform -rotate-12">LUXE</h2>
        </div>
        <div className="max-w-5xl mx-auto px-10 relative z-10">
          <h3 className="italic font-headline text-4xl md:text-7xl leading-tight tracking-tighter mb-12">
            "El lujo no es la acumulación, es la intención. En GM House, cada servicio es un acto de diseño consciente."
          </h3>
          <span className="text-[10px] uppercase tracking-[0.6em] font-black text-primary opacity-60">Manifesto 2024</span>
        </div>
      </section>
    </div>
  );
}