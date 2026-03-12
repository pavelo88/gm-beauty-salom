"use client"

import React, { useState } from 'react';
import { BookOpen, Crown, Shirt, Gem, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiPersonalShopperSuggestions } from '@/ai/flows/ai-personal-shopper-suggestions';
import { cn } from '@/lib/utils';

export function BoutiqueSection({ dynamicData }: { dynamicData: any }) {
  const [activeCategory, setActiveCategory] = useState<'mujer' | 'hombre' | 'perfumes'>('mujer');

  const staticCollection = {
    mujer: { title: "Femme Fatal", year: "2024", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200" },
    hombre: { title: "L'Homme", year: "2024", img: "https://images.unsplash.com/photo-1594932224491-994b9caede9f?auto=format&fit=crop&q=80&w=1200" },
    perfumes: { title: "Olfactive Art", year: "2024", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200" }
  };

  const dynProducts = dynamicData.products.filter((p: any) => p.category === activeCategory);

  return (
    <div className="w-full bg-texture py-32">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Editorial Header */}
        <header className="magazine-grid mb-24 items-end">
          <div className="col-span-12 md:col-span-8">
            <span className="text-xs font-black uppercase tracking-[0.5em] text-primary mb-4 block">Editorial Feature</span>
            <h2 className="text-editorial-title">BOUTIQUE <br/> <span className="text-gold-gradient">EDITORIAL</span></h2>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <div className="flex border-b border-border py-4">
              {['mujer', 'hombre', 'perfumes'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={cn(
                    "flex-1 text-[10px] font-black uppercase tracking-widest transition-all",
                    activeCategory === cat ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest leading-relaxed italic">
              "Una selección curada de piezas que trascienden las estaciones. No es moda, es legado."
            </p>
          </div>
        </header>

        <div className="mb-20">
          <AiAssistant 
            title="AI Shopper Stylist"
            placeholder="Describe la ocasión y encontraremos tu look..."
            onAsk={(input) => aiPersonalShopperSuggestions({ userPrompt: input, category: activeCategory })}
          />
        </div>

        {/* Feature Spread */}
        <div className="magazine-grid gap-12">
          {/* Main Visual */}
          <div className="col-span-12 md:col-span-7 relative group">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img 
                src={staticCollection[activeCategory].img} 
                alt="Editorial" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
              />
            </div>
            <div className="absolute top-12 left-12 mix-blend-difference text-white">
              <span className="text-[8px] uppercase tracking-[1em] font-bold">Volume One</span>
              <h3 className="text-5xl font-headline italic">{staticCollection[activeCategory].title}</h3>
            </div>
          </div>

          {/* Product List */}
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center space-y-12">
            <div className="space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Collection Items</h4>
              <div className="w-12 h-[1px] bg-primary"></div>
            </div>

            <div className="space-y-8">
              {dynProducts.length > 0 ? (
                dynProducts.map((p: any, i: number) => (
                  <div key={i} className="group border-b border-border pb-8 flex justify-between items-end hover:border-primary transition-all cursor-pointer">
                    <div className="space-y-1">
                      <span className="text-[8px] uppercase tracking-widest text-muted-foreground">Premium Selection</span>
                      <h5 className="text-2xl font-headline font-bold group-hover:translate-x-2 transition-transform">{p.name}</h5>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-light italic text-primary">{p.price}</span>
                      <div className="mt-2 text-[8px] font-black uppercase tracking-tighter flex items-center gap-1">
                        Inquiry <Plus size={8} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 border border-dashed border-border">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Solicita el catálogo completo impreso</p>
                </div>
              )}
            </div>

            <div className="bg-foreground text-background p-12 text-center space-y-4">
              <Gem className="mx-auto text-primary" size={32} />
              <h4 className="text-xl font-headline font-bold italic">Privé Appointments</h4>
              <p className="text-[10px] uppercase tracking-widest leading-loose">
                Agenda una sesión privada con nuestros estilistas editoriales.
              </p>
              <button className="text-[10px] font-black uppercase border-b border-background pb-1 hover:text-primary hover:border-primary transition-all">
                Book Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
