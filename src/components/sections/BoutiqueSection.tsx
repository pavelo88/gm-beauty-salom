"use client"

import React, { useState } from 'react';
import { Gem, Plus, ArrowRight } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiPersonalShopperSuggestions } from '@/ai/flows/ai-personal-shopper-suggestions';
import { cn } from '@/lib/utils';

export function BoutiqueSection({ dynamicData }: { dynamicData: any }) {
  const [activeCategory, setActiveCategory] = useState<'mujer' | 'hombre' | 'perfumes'>('mujer');

  const staticCollection = {
    mujer: { 
      title: "L'Eternelle", 
      year: "MMXXIV", 
      img: "https://picsum.photos/seed/fashion-woman/1200/1500",
      description: "Exploración de feminidad a través de texturas orgánicas."
    },
    hombre: { 
      title: "Avant-Garde", 
      year: "MMXXIV", 
      img: "https://picsum.photos/seed/fashion-man/1200/1500",
      description: "Sastrería de autor que desafía los códigos tradicionales."
    },
    perfumes: { 
      title: "Esprit d'Or", 
      year: "MMXXIV", 
      img: "https://picsum.photos/seed/perfume-gold/1200/1500",
      description: "Esencias que capturan la memoria del lujo."
    }
  };

  const dynProducts = dynamicData.products.filter((p: any) => p.category === activeCategory);

  return (
    <div className="w-full pt-20 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 space-y-16">
        
        <header className="magazine-grid items-end gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black uppercase tracking-[0.6em] text-primary">Archivo de Moda</span>
              <span className="w-16 h-[1px] bg-border/40"></span>
            </div>
            <h2 className="text-editorial-title">
              Boutique <br/> <span className="text-gold-gradient italic">Privée</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col items-end gap-4 pb-2">
            <div className="flex border-b border-border/40 py-2 w-full justify-end gap-6 overflow-x-auto no-scrollbar">
              {['mujer', 'hombre', 'perfumes'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={cn(
                    "text-[9px] font-black uppercase tracking-[0.4em] transition-all whitespace-nowrap",
                    activeCategory === cat ? "text-primary italic scale-105" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-right max-w-[180px] leading-relaxed italic">
              "Curaduría de piezas únicas del Sur."
            </p>
          </div>
        </header>

        <div className="magazine-grid gap-12 items-start">
          <div className="col-span-12 lg:col-span-7 relative group editorial-shadow rounded-2xl overflow-hidden max-h-[500px]">
            <div className="aspect-video bg-card h-full">
              <img 
                src={staticCollection[activeCategory].img} 
                alt="Boutique Visual" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <span className="text-[8px] uppercase tracking-[1em] font-bold text-white/60 mb-2">{staticCollection[activeCategory].year}</span>
              <h3 className="text-4xl md:text-6xl font-headline italic text-white tracking-tighter mb-4">{staticCollection[activeCategory].title}</h3>
              <p className="text-white/40 text-[10px] md:text-xs font-light max-w-sm leading-relaxed">
                {staticCollection[activeCategory].description}
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 space-y-10 py-2">
            <div className="space-y-3">
              <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Colección</h4>
              <div className="w-12 h-[1px] bg-primary"></div>
            </div>

            <div className="space-y-6">
              {dynProducts.length > 0 ? (
                dynProducts.map((p: any, i: number) => (
                  <div key={i} className="group border-b border-border/20 pb-4 flex justify-between items-end hover:border-primary transition-all duration-700 cursor-pointer">
                    <div className="space-y-1">
                      <span className="text-[8px] uppercase tracking-[0.4em] text-muted-foreground font-bold">Ref. 00{i+1}</span>
                      <h5 className="text-xl md:text-2xl font-headline font-bold uppercase tracking-tighter">{p.name}</h5>
                    </div>
                    <span className="text-lg font-light italic text-primary">{p.price}</span>
                  </div>
                ))
              ) : (
                <div className="py-12 border border-dashed border-border/40 rounded-2xl flex flex-col items-center justify-center gap-4 opacity-30">
                  <Gem size={24} />
                  <p className="text-[9px] uppercase tracking-[0.5em] font-black">Próximo Lanzamiento</p>
                </div>
              )}
            </div>

            <div className="pt-4">
               <AiAssistant 
                title="Personal Shopper IA"
                placeholder="Busco outfit para gala..."
                onAsk={(input) => aiPersonalShopperSuggestions({ userPrompt: input, category: activeCategory })}
              />
            </div>

            <div className="bg-foreground text-background p-8 rounded-2xl text-center space-y-6 relative overflow-hidden group shadow-xl">
              <Gem className="mx-auto text-primary" size={24} />
              <div className="space-y-2">
                <h4 className="text-xl font-headline font-bold italic">Asesoría VIP</h4>
                <p className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-60 px-4">
                  Experiencia de lujo con probador privado.
                </p>
              </div>
              <button className="flex items-center gap-4 mx-auto text-[9px] font-black uppercase tracking-[0.4em] border-b border-primary/40 pb-1 hover:border-primary transition-all">
                Cita Privada <ArrowRight size={10} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
