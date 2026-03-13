"use client"

import React, { useState } from 'react';
import { Gem, ArrowRight, Quote, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function BoutiqueSection({ dynamicData }: { dynamicData: any }) {
  const [activeCategory, setActiveCategory] = useState<'mujer' | 'hombre' | 'perfumes'>('mujer');

  const staticCollection = {
    mujer: { 
      title: "L'Eternelle", 
      subtitle: "Editorial de Lencería & Alta Costura", 
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
      quote: "La sensualidad es una arquitectura del ser, una declaración de poder y elegancia atemporal."
    },
    hombre: { 
      title: "Avant-Garde", 
      subtitle: "The Modern Tailoring Experience", 
      img: "https://images.unsplash.com/photo-1594932224456-7489ff203176?auto=format&fit=crop&q=80&w=1200",
      quote: "El estilo es la respuesta a todo. Una manera de decir quién eres sin tener que hablar una palabra."
    },
    perfumes: { 
      title: "Esprit d'Or", 
      subtitle: "Elixir de Autor & Esencias", 
      img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200",
      quote: "Una fragancia es la forma más intensa de la memoria, un aura invisible de distinción absoluta."
    }
  };

  const dynProducts = dynamicData.products.filter((p: any) => p.category === activeCategory);

  return (
    <div className="w-full pt-20 pb-28">
      <div className="max-w-[1400px] mx-auto px-6 space-y-20">
        
        {/* Cabezal de Revista de Lujo */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-border/20 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-black uppercase tracking-[0.8em] text-primary">Volume No. 01</span>
              <span className="w-16 h-[1px] bg-primary/30"></span>
            </div>
            <h2 className="text-4xl md:text-8xl font-headline font-black tracking-tighter uppercase leading-[0.8]">
              Boutique <span className="text-gold-gradient italic font-light">Privée</span>
            </h2>
          </div>
          
          <div className="flex gap-12 overflow-x-auto no-scrollbar pb-4">
            {['mujer', 'hombre', 'perfumes'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={cn(
                  "text-[11px] font-black uppercase tracking-[0.5em] transition-all relative py-3",
                  activeCategory === cat ? "text-primary scale-110" : "text-muted-foreground opacity-40 hover:opacity-100"
                )}
              >
                {cat}
                {activeCategory === cat && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-in fade-in slide-in-from-left-2"></span>}
              </button>
            ))}
          </div>
        </header>

        {/* Spread Editorial de Moda */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Visual Dominante (Izquierda) */}
          <div className="lg:col-span-7 space-y-12">
            <div className="relative group overflow-hidden rounded-[3rem] editorial-shadow aspect-[4/5] lg:aspect-auto lg:h-[650px]">
              <img 
                src={staticCollection[activeCategory].img} 
                alt="Editorial Visual" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent flex flex-col justify-end p-12 lg:p-20">
                <div className="animate-float">
                  <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary mb-4 block">{staticCollection[activeCategory].subtitle}</span>
                  <h3 className="text-5xl lg:text-9xl font-headline italic text-white tracking-tighter leading-none">{staticCollection[activeCategory].title}</h3>
                </div>
              </div>
            </div>
            
            <div className="flex gap-10 items-start pt-6 border-l-2 border-primary/20 pl-10">
              <Quote className="text-primary opacity-20 flex-shrink-0" size={56} />
              <p className="text-xl lg:text-4xl font-headline font-light italic leading-relaxed text-muted-foreground/90 max-w-2xl">
                "{staticCollection[activeCategory].quote}"
              </p>
            </div>
          </div>

          {/* Inventario de Archivo (Derecha) */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-border/40 pb-6">
                <h4 className="text-[12px] font-black uppercase tracking-[0.5em]">Archivo de Colección</h4>
                <span className="text-[9px] font-bold opacity-30 uppercase tracking-[0.4em]">Available Pieces</span>
              </div>
              
              <div className="space-y-8 pt-6 max-h-[600px] overflow-y-auto no-scrollbar pr-4">
                {dynProducts.length > 0 ? (
                  dynProducts.map((p: any, i: number) => (
                    <div key={i} className="group flex justify-between items-center gap-8 p-6 rounded-[2rem] border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-700 shadow-sm">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-24 overflow-hidden rounded-xl bg-muted flex-shrink-0 shadow-lg">
                          <img src={p.imageUrl || `https://picsum.photos/seed/${i+100}/200/300`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={p.name} />
                        </div>
                        <div className="space-y-2">
                          <h5 className="text-xl lg:text-2xl font-headline font-bold uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">{p.name}</h5>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] leading-relaxed line-clamp-1 opacity-60">{p.description}</p>
                          <div className="flex items-center gap-4 pt-1">
                            <span className="text-lg font-light italic text-primary">{p.price}</span>
                            <span className="w-8 h-[1px] bg-primary/20"></span>
                          </div>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="rounded-full h-12 w-12 hover:bg-primary hover:text-white transition-all shadow-md">
                        <ShoppingCart size={20} />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="py-24 text-center space-y-6 border-2 border-dashed border-border/20 rounded-[3rem] bg-muted/5">
                    <Gem className="mx-auto text-primary/20 animate-pulse" size={48} />
                    <div className="space-y-1">
                      <p className="text-[12px] uppercase font-black tracking-[0.4em]">Próximo Lanzamiento</p>
                      <p className="text-[10px] uppercase tracking-[0.3em] italic text-muted-foreground">Colección Fall/Winter MMXXIV</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA de Experiencia VIP */}
            <div className="bg-foreground text-background p-12 rounded-[4rem] space-y-10 relative overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-[2px] bg-primary"></div>
                <h4 className="text-4xl font-headline font-bold italic tracking-tighter leading-none">Personal Shopper <br/> Experience</h4>
                <p className="text-[11px] uppercase tracking-[0.4em] font-medium opacity-70 leading-relaxed max-w-xs">
                  Agende una curaduría de imagen personalizada con nuestros expertos de moda.
                </p>
                <button className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] border-b border-primary/50 pb-3 hover:gap-10 transition-all hover:text-primary">
                  RESERVAR SESIÓN <ArrowRight size={14} />
                </button>
              </div>
              <Gem className="absolute -bottom-16 -right-16 opacity-5 group-hover:opacity-15 transition-all duration-[2s] rotate-[25deg] group-hover:rotate-0" size={300} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}