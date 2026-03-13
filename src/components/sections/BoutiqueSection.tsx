
"use client"

import React, { useState } from 'react';
import { Gem, ArrowRight, Quote, ShoppingCart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AiAssistant } from '@/components/AiAssistant';
import { aiPersonalShopperSuggestions } from '@/ai/flows/ai-personal-shopper-suggestions';

export function BoutiqueSection({ dynamicData }: { dynamicData: any }) {
  const [activeCategory, setActiveCategory] = useState<'mujer' | 'hombre' | 'perfumes'>('mujer');

  const staticCollection = {
    mujer: { 
      title: "L'Eternelle", 
      subtitle: "Editorial Victoria Style", 
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
      quote: "La sensualidad es una declaración de poder y elegancia atemporal."
    },
    hombre: { 
      title: "Avant-Garde", 
      subtitle: "Hugo Boss Experience", 
      img: "https://images.unsplash.com/photo-1594932224456-7489ff203176?auto=format&fit=crop&q=80&w=1200",
      quote: "El estilo es la respuesta a todo. Tu firma sin decir una palabra."
    },
    perfumes: { 
      title: "Esprit d'Or", 
      subtitle: "Elixir de Autor & Esencias", 
      img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200",
      quote: "Una fragancia es la forma más intensa de la memoria."
    }
  };

  const dynProducts = dynamicData.products.filter((p: any) => p.category === activeCategory);

  return (
    <div className="w-full pt-20 pb-28">
      <div className="max-w-[1400px] mx-auto px-6 space-y-12">
        
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
                {activeCategory === cat && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></span>}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-12">
            <div className="relative group overflow-hidden rounded-[3rem] editorial-shadow aspect-[4/5] lg:h-[600px]">
              <img 
                src={staticCollection[activeCategory].img} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s] scale-110 group-hover:scale-100"
                alt="Editorial"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-12">
                <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary mb-2 block">{staticCollection[activeCategory].subtitle}</span>
                <h3 className="text-5xl lg:text-8xl font-headline italic text-white tracking-tighter leading-none">{staticCollection[activeCategory].title}</h3>
              </div>
            </div>
            <div className="flex gap-8 items-start pt-6 border-l-2 border-primary/20 pl-8">
              <Quote className="text-primary opacity-20 flex-shrink-0" size={40} />
              <p className="text-xl lg:text-3xl font-headline font-light italic leading-relaxed text-muted-foreground">
                "{staticCollection[activeCategory].quote}"
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <AiAssistant 
              title="Personal Shopper IA"
              placeholder="Ej: Busco un perfume para una cena de gala..."
              onAsk={(input) => aiPersonalShopperSuggestions({ userPrompt: input, category: activeCategory })}
            />

            <div className="space-y-6">
              <h4 className="text-[12px] font-black uppercase tracking-[0.5em] border-b border-border/40 pb-4">Archivo de Colección</h4>
              <div className="space-y-6 max-h-[450px] overflow-y-auto no-scrollbar pr-4">
                {dynProducts.length > 0 ? (
                  dynProducts.map((p: any, i: number) => (
                    <div key={i} className="group flex justify-between items-center gap-6 p-4 rounded-[1.5rem] border border-transparent hover:bg-primary/5 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-20 overflow-hidden rounded-lg shadow-lg">
                          <img src={p.imageUrl || `https://picsum.photos/seed/${i}/200/300`} className="w-full h-full object-cover grayscale group-hover:grayscale-0" alt={p.name} />
                        </div>
                        <div>
                          <h5 className="text-lg font-headline font-bold uppercase tracking-tighter group-hover:text-primary">{p.name}</h5>
                          <span className="text-sm font-light italic text-primary">{p.price}</span>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary hover:text-white">
                        <ShoppingCart size={18} />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center border-2 border-dashed border-border/20 rounded-[2rem]">
                    <Gem className="mx-auto text-primary/20 mb-4" size={32} />
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground italic">Próximo Lanzamiento Archivo MMXXIV</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
