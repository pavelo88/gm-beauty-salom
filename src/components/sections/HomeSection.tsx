"use client"

import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HomeSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const sections = [
    { id: 'beauty', title: 'The Beauty Archive', subtitle: 'Salon & Barber', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200' },
    { id: 'boutique', title: 'Editorial Wear', subtitle: 'Fashion & Scents', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200' },
    { id: 'alliance', title: 'Structural Art', subtitle: 'Interior Design', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200' },
  ];

  return (
    <div className="w-full bg-texture">
      {/* Hero Cover */}
      <section className="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 grayscale" 
            alt="Background" 
          />
        </div>
        
        <div className="relative z-10 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Star className="text-primary fill-primary" size={14} />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-muted-foreground">The 2024 Editorial Issue</span>
            <Star className="text-primary fill-primary" size={14} />
          </div>
          <h1 className="text-editorial-title">
            GM <br/> <span className="text-gold-gradient">HOUSE</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-lg text-muted-foreground font-light tracking-widest uppercase">
            Curating Aesthetics: Beauty, Fashion & Space
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-20 bg-primary/40"></div>
        </div>
      </section>

      {/* Magazine Spreads */}
      <section className="max-w-[1400px] mx-auto py-32 px-4 space-y-48">
        {sections.map((section, idx) => (
          <div 
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={cn(
              "flex flex-col md:flex-row items-center gap-12 cursor-pointer group",
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            )}
          >
            <div className="w-full md:w-7/12 overflow-hidden bg-muted aspect-[4/5] md:aspect-[16/10]">
              <img 
                src={section.img} 
                alt={section.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
            </div>
            <div className="w-full md:w-5/12 space-y-6">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">{section.subtitle}</span>
              <h2 className="text-5xl md:text-7xl font-headline font-bold leading-none">{section.title}</h2>
              <p className="text-muted-foreground font-light leading-relaxed max-w-sm">
                Explora nuestra visión sobre {section.subtitle.toLowerCase()}, donde el detalle y la exclusividad se encuentran en cada rincón de GM Beauty House.
              </p>
              <button className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest group-hover:gap-6 transition-all pt-4">
                Ver Colección <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Quote Section */}
      <section className="bg-foreground text-background py-40 text-center">
        <div className="max-w-4xl mx-auto px-4 italic font-headline text-3xl md:text-5xl leading-tight">
          "El lujo no es lo contrario de la pobreza, sino de la vulgaridad. En GM Beauty House, cada servicio es una obra de arte."
        </div>
      </section>
    </div>
  );
}
