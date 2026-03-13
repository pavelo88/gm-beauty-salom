
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
      quote: "La sensualidad es una arquitectura del ser, una declaración de poder y elegancia."
    },
    hombre: { 
      title: "Avant-Garde", 
      subtitle: "The Modern Tailoring Experience", 
      img: "https://images.unsplash.com/photo-1594932224456-7489ff203176?auto=format&fit=crop&q=80&w=1200",
      quote: "El estilo es la respuesta a todo. Una manera de decir quién eres sin tener que hablar."
    },
    perfumes: { 
      title: "Esprit d'Or", 
      subtitle: "Elixir de Autor & Esencias", 
      img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200",
      quote: "Una fragancia es la forma más intensa de la memoria, un aura invisible de distinción."
    }
  };

  const dynProducts = dynamicData.products.filter((p: any) => p.category === activeCategory);

  return (
    <div className="w-full pt-16 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 space-y-12">
        
        {/* Cabezal de Revista de Lujo */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-border/20 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Volume No. 01</span>
              <span className="w-12 h-[1px] bg-primary/30"></span>
            </div>
            <h2 className="text-EDITORIAL text-4xl md:text-7xl font-headline font-black tracking-tighter uppercase leading-none">
              Boutique <span className="text-gold-gradient italic font-light">Privée</span>
            </h2>
          </div>
          
          <div className="flex gap-10 overflow-x-auto no-scrollbar pb-2">
            {['mujer', 'hombre', 'perfumes'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.4em] transition-all relative py-2",
                  activeCategory === cat ? "text-primary" : "text-muted-foreground opacity-40 hover:opacity-100"
                )}
              >
                {cat}
                {activeCategory === cat && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-in fade-in slide-in-from-left-2"></span>}
              </button>
            ))}
          </div>
        </header>

        {/* Spread Editorial de Moda */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Visual Dominante (Izquierda) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative group overflow-hidden rounded-[2.5rem] editorial-shadow aspect-[4/5] lg:aspect-auto lg:h-[600px]">
              <img 
                src={staticCollection[activeCategory].img} 
                alt="Editorial Visual" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-10 lg:p-16">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-3">{staticCollection[activeCategory].subtitle}</span>
                <h3 className="text-4xl lg:text-8xl font-headline italic text-white tracking-tighter leading-none">{staticCollection[activeCategory].title}</h3>
              </div>
            </div>
            
            <div className="flex gap-8 items-start pt-4">
              <Quote className="text-primary opacity-20 flex-shrink-0" size={48} />
              <p className="text-lg lg:text-3xl font-headline font-light italic leading-relaxed text-muted-foreground/80 max-w-2xl">
                "{staticCollection[activeCategory].quote}"
              </p>
            </div>
          </div>

          {/* Inventario de Archivo (Derecha) */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-border/40 pb-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">Archivo de Colección</h4>
                <span className="text-[8px] font-bold opacity-30 uppercase tracking-widest">Available Items</span>
              </div>
              
              <div className="space-y-6 pt-4 max-h-[500px] overflow-y-auto no-scrollbar pr-2">
                {dynProducts.length > 0 ? (
                  dynProducts.map((p: any, i: number) => (
                    <div key={i} className="group flex justify-between items-center gap-6 p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-700">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-20 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                          <img src={p.imageUrl || `https://picsum.photos/seed/${i+100}/200/300`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={p.name} />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-lg lg:text-xl font-headline font-bold uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">{p.name}</h5>
                          <p className="text-[9px] text-muted-foreground uppercase tracking-widest leading-relaxed line-clamp-1">{p.description}</p>
                          <span className="text-sm font-light italic text-primary">{p.price}</span>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary hover:text-white transition-all">
                        <ShoppingCart size={18} />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center space-y-4 border-2 border-dashed border-border/10 rounded-[2rem]">
                    <Gem className="mx-auto text-primary/20" size={40} />
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest">Nuevos Ingresos en Camino</p>
                      <p className="text-[8px] uppercase tracking-widest mt-1 italic text-muted-foreground">Próxima Edición MMXXIV</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA de Experiencia VIP */}
            <div className="bg-foreground text-background p-10 rounded-[3rem] space-y-8 relative overflow-hidden group shadow-2xl">
              <div className="relative z-10 space-y-4">
                <div className="w-10 h-[1px] bg-primary"></div>
                <h4 className="text-3xl font-headline font-bold italic tracking-tighter leading-none">Personal Shopper <br/> Experience</h4>
                <p className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-70 leading-relaxed max-w-xs">
                  Agende una curaduría de imagen personalizada con nuestros expertos.
                </p>
                <button className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] border-b border-primary/50 pb-2 hover:gap-8 transition-all hover:text-primary">
                  Reservar Sesión <ArrowRight size={12} />
                </button>
              </div>
              <Gem className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-all duration-1000 rotate-12" size={240} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
