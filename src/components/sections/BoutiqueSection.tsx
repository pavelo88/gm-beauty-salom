"use client"

import React, { useState } from 'react';
import { Gem, ArrowRight } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiPersonalShopperSuggestions } from '@/ai/flows/ai-personal-shopper-suggestions';
import { cn } from '@/lib/utils';

export function BoutiqueSection({ dynamicData }: { dynamicData: any }) {
  const [activeCategory, setActiveCategory] = useState<'mujer' | 'hombre' | 'perfumes'>('mujer');

  const staticCollection = {
    mujer: { title: "L'Eternelle", img: "https://picsum.photos/seed/fashion-woman/1200/1500" },
    hombre: { title: "Avant-Garde", img: "https://picsum.photos/seed/fashion-man/1200/1500" },
    perfumes: { title: "Esprit d'Or", img: "https://picsum.photos/seed/perfume-gold/1200/1500" }
  };

  const dynProducts = dynamicData.products.filter((p: any) => p.category === activeCategory);

  return (
    <div className="w-full pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 space-y-10">
        
        <header className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="space-y-1">
            <span className="text-[8px] font-black uppercase tracking-[0.6em] text-primary">Archivo de Moda</span>
            <h2 className="text-editorial-title">Boutique <span className="text-gold-gradient italic">Privée</span></h2>
          </div>
          <div className="flex gap-4 border-b border-border/40 pb-2 overflow-x-auto no-scrollbar">
            {['mujer', 'hombre', 'perfumes'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={cn(
                  "text-[8px] font-black uppercase tracking-[0.4em] transition-all whitespace-nowrap",
                  activeCategory === cat ? "text-primary italic" : "text-muted-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="magazine-grid gap-8 items-start">
          <div className="col-span-12 lg:col-span-7 relative group editorial-shadow rounded-2xl overflow-hidden max-h-[400px]">
            <img 
              src={staticCollection[activeCategory].img} 
              alt="Boutique Visual" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <h3 className="text-3xl md:text-5xl font-headline italic text-white tracking-tighter">{staticCollection[activeCategory].title}</h3>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="space-y-4 max-h-[250px] overflow-y-auto no-scrollbar border-l border-border/20 pl-4">
              {dynProducts.length > 0 ? (
                dynProducts.map((p: any, i: number) => (
                  <div key={i} className="group flex justify-between items-end border-b border-border/10 pb-2 hover:border-primary transition-all">
                    <h5 className="text-lg font-headline font-bold uppercase tracking-tighter">{p.name}</h5>
                    <span className="text-sm font-light italic text-primary">{p.price}</span>
                  </div>
                ))
              ) : (
                <p className="text-[8px] uppercase tracking-widest opacity-40">Próximos lanzamientos...</p>
              )}
            </div>

            <div className="pt-2">
               <AiAssistant 
                title="Personal Shopper IA"
                placeholder="Busco outfit..."
                onAsk={(input) => aiPersonalShopperSuggestions({ userPrompt: input, category: activeCategory })}
              />
            </div>

            <div className="bg-foreground text-background p-6 rounded-2xl text-center space-y-2 relative overflow-hidden group shadow-lg">
              <Gem className="mx-auto text-primary" size={20} />
              <h4 className="text-lg font-headline font-bold italic">Asesoría VIP</h4>
              <button className="flex items-center gap-2 mx-auto text-[8px] font-black uppercase tracking-[0.4em] border-b border-primary/40 pb-1">
                Cita Privada <ArrowRight size={8} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
