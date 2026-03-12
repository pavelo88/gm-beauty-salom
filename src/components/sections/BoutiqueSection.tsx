"use client"

import React, { useState } from 'react';
import { BookOpen, Crown, Shirt, Gem, Plus } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiPersonalShopperSuggestions } from '@/ai/flows/ai-personal-shopper-suggestions';
import { cn } from '@/lib/utils';

export function BoutiqueSection({ dynamicData }: { dynamicData: any }) {
  const [activeCategory, setActiveCategory] = useState<'mujer' | 'hombre' | 'perfumes'>('mujer');

  const staticCollection = {
    mujer: { title: "L'Eternelle", year: "MMXXIV", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200" },
    hombre: { title: "Avant-Garde", year: "MMXXIV", img: "https://images.unsplash.com/photo-1594932224491-994b9caede9f?auto=format&fit=crop&q=80&w=1200" },
    perfumes: { title: "Esprit d'Or", year: "MMXXIV", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200" }
  };

  const dynProducts = dynamicData.products.filter((p: any) => p.category === activeCategory);

  return (
    <div className="w-full pt-40 pb-20">
      <div className="max-w-[1600px] mx-auto px-10">
        
        {/* Editorial Header */}
        <header className="magazine-grid mb-40 items-end gap-10">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Special Feature</span>
              <span className="w-20 h-[1px] bg-border"></span>
            </div>
            <h2 className="text-editorial-title leading-[0.75]">BOUTIQUE <br/> <span className="text-gold-gradient italic">PRIVÉE</span></h2>
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-10">
            <div className="flex border-b border-border py-6 overflow-x-auto no-scrollbar">
              {['mujer', 'hombre', 'perfumes'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={cn(
                    "flex-1 text-[10px] font-black uppercase tracking-[0.4em] transition-all px-4 whitespace-nowrap",
                    activeCategory === cat ? "text-primary italic" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-light uppercase tracking-widest leading-relaxed italic border-l-2 border-primary pl-6">
              "Seleccionamos piezas que no siguen tendencias, sino que crean legados visuales."
            </p>
          </div>
        </header>

        <div className="mb-32">
          <AiAssistant 
            title="AI Shopper Stylist"
            placeholder="Describe la ocasión y encontraremos tu look..."
            onAsk={(input) => aiPersonalShopperSuggestions({ userPrompt: input, category: activeCategory })}
            isLightMode={true}
          />
        </div>

        {/* Feature Spread */}
        <div className="magazine-grid gap-20">
          {/* Main Visual */}
          <div className="col-span-12 lg:col-span-7 relative group editorial-shadow">
            <div className="aspect-[4/5] overflow-hidden bg-card">
              <img 
                src={staticCollection[activeCategory].img} 
                alt="Editorial Visual" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]"
              />
            </div>
            <div className="absolute top-16 left-16 mix-blend-difference text-white">
              <span className="text-[8px] uppercase tracking-[1em] font-bold opacity-60">{staticCollection[activeCategory].year}</span>
              <h3 className="text-6xl font-headline italic tracking-tighter mt-2">{staticCollection[activeCategory].title}</h3>
            </div>
          </div>

          {/* Product List */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center space-y-16">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Curated Collection</h4>
              <div className="w-16 h-[1px] bg-primary"></div>
            </div>

            <div className="space-y-10">
              {dynProducts.length > 0 ? (
                dynProducts.map((p: any, i: number) => (
                  <div key={i} className="group border-b border-border pb-10 flex justify-between items-end hover:border-primary transition-all duration-500 cursor-pointer">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-medium">Archive {activeCategory}</span>
                      <h5 className="text-3xl font-headline font-bold group-hover:translate-x-4 transition-transform duration-700">{p.name}</h5>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-light italic text-primary">{p.price}</span>
                      <div className="mt-4 text-[9px] font-black uppercase tracking-tighter flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        Details <Plus size={10} className="text-primary" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-32 border border-dashed border-border opacity-50">
                  <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Catalogue Privé coming soon</p>
                </div>
              )}
            </div>

            <div className="bg-foreground text-background p-16 text-center space-y-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <Gem className="mx-auto text-primary" size={40} />
              <div className="space-y-2">
                <h4 className="text-2xl font-headline font-bold italic">Privé Appointments</h4>
                <p className="text-[10px] uppercase tracking-[0.4em] font-medium leading-loose opacity-60">
                  Experience personalized luxury in our VIP fitting room.
                </p>
              </div>
              <button className="text-[10px] font-black uppercase tracking-[0.4em] border-b border-primary pb-2 hover:text-primary transition-all">
                Request Invitation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}