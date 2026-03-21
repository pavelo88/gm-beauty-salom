
"use client"

import React, { useState } from 'react';
import { Gem, ArrowRight, Quote, ShoppingCart, Download, ExternalLink } from 'lucide-react';
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
  const catalogUrl = dynamicData.settings?.catalogUrl;

  return (
    <div className="w-full pt-20 pb-28 bg-background">
      <div className="max-w-[1600px] mx-auto px-6 space-y-16">
        
        <header className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-border/20 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-black uppercase tracking-[0.8em] text-primary">Boutique Privée</span>
              <span className="w-16 h-[1px] bg-primary/30"></span>
            </div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-headline font-black tracking-tighter uppercase leading-[0.8]">
              ARCHIVO <span className="text-primary italic font-light">DE MODA</span>
            </h2>
          </div>
          
          <div className="flex gap-8 md:gap-12 overflow-x-auto no-scrollbar pb-4 w-full md:w-auto">
            {['mujer', 'hombre', 'perfumes'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={cn(
                  "text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] transition-all relative py-3 whitespace-nowrap",
                  activeCategory === cat ? "text-primary scale-110" : "text-muted-foreground opacity-40 hover:opacity-100"
                )}
              >
                {cat}
                {activeCategory === cat && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></span>}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Hero de Categoría */}
          <div className="lg:col-span-4 space-y-8">
            <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl aspect-[3/4]">
              <img 
                src={staticCollection[activeCategory].img} 
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                alt="Editorial"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-[9px] font-black uppercase tracking-[0.6em] text-primary mb-2 block">{staticCollection[activeCategory].subtitle}</span>
                <h3 className="text-4xl font-headline italic text-white tracking-tighter leading-none">{staticCollection[activeCategory].title}</h3>
              </div>
            </div>
            
            <div className="p-8 border-l-2 border-primary/20 bg-card rounded-r-2xl space-y-4">
              <Quote className="text-primary opacity-20" size={32} />
              <p className="text-lg font-headline font-light italic leading-relaxed text-muted-foreground">
                "{staticCollection[activeCategory].quote}"
              </p>
            </div>

            <AiAssistant 
              title="Personal Shopper IA"
              placeholder={`Busco algo para ${activeCategory}...`}
              onAsk={(input) => aiPersonalShopperSuggestions({ userPrompt: input, category: activeCategory })}
              isLightMode={false}
            />
          </div>

          {/* Grilla de Catálogo */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-8 border-b border-border/10 pb-4">
              <h4 className="text-[12px] font-black uppercase tracking-[0.5em]">Colección Seleccionada</h4>
              {catalogUrl && (
                <Button asChild variant="ghost" className="h-auto p-0 hover:bg-transparent text-primary hover:text-primary/80">
                  <a href={catalogUrl} target="_blank" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                    Revista Digital <Download size={14} />
                  </a>
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {dynProducts.length > 0 ? (
                dynProducts.map((p: any, i: number) => (
                  <div key={i} className="group flex flex-col space-y-4 bg-card p-4 rounded-3xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted relative">
                      {p.imageUrl && (
                        <img 
                          src={p.imageUrl} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                          alt={p.name} 
                        />
                      )}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                          <ShoppingCart size={14} className="text-black" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 px-2">
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2">{p.name}</h5>
                        <span className="text-xs font-black text-primary">{p.price}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground line-clamp-2 font-light leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                    <Button variant="outline" className="w-full rounded-xl border-primary/20 text-[9px] font-black uppercase tracking-widest h-10 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      Detalles de la Pieza
                    </Button>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-32 text-center border-2 border-dashed border-border/20 rounded-[3rem]">
                  <Gem className="mx-auto text-primary/20 mb-4" size={48} />
                  <p className="text-[11px] uppercase font-black tracking-widest text-muted-foreground italic">Archivo en proceso de curaduría...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
