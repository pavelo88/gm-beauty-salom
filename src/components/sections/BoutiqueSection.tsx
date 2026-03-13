
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
      description: "Una exploración de la feminidad a través de texturas orgánicas y cortes arquitectónicos."
    },
    hombre: { 
      title: "Avant-Garde", 
      year: "MMXXIV", 
      img: "https://picsum.photos/seed/fashion-man/1200/1500",
      description: "Sastrería de autor que desafía los códigos tradicionales del Sur de Quito."
    },
    perfumes: { 
      title: "Esprit d'Or", 
      year: "MMXXIV", 
      img: "https://picsum.photos/seed/perfume-gold/1200/1500",
      description: "Esencias que capturan la memoria del lujo en frascos de cristal artesanal."
    }
  };

  const dynProducts = dynamicData.products.filter((p: any) => p.category === activeCategory);

  return (
    <div className="w-full pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 space-y-24">
        
        {/* Cabezal Editorial */}
        <header className="magazine-grid items-end gap-10">
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Archivo de Moda</span>
              <span className="w-20 h-[1px] bg-border/40"></span>
            </div>
            <h2 className="text-[12vw] lg:text-[10rem] font-headline font-bold leading-[0.75] tracking-tighter uppercase">
              Boutique <br/> <span className="text-gold-gradient italic">Privée</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col items-end gap-8 pb-4">
            <div className="flex border-b border-border/40 py-4 w-full justify-end gap-8 overflow-x-auto no-scrollbar">
              {['mujer', 'hombre', 'perfumes'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.4em] transition-all whitespace-nowrap",
                    activeCategory === cat ? "text-primary italic scale-110" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest text-right max-w-[200px] leading-loose italic">
              "Curaduría de piezas únicas que trascienden las tendencias del Sur."
            </p>
          </div>
        </header>

        {/* Spread Principal: Visual Izquierda, Lista Derecha */}
        <div className="magazine-grid gap-16 md:gap-24 items-start">
          
          {/* Visual Spread */}
          <div className="col-span-12 lg:col-span-7 relative group editorial-shadow rounded-2xl md:rounded-[3rem] overflow-hidden">
            <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-card">
              <img 
                src={staticCollection[activeCategory].img} 
                data-ai-hint="luxury fashion"
                alt="Boutique Visual" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 md:p-20">
              <span className="text-[9px] uppercase tracking-[1em] font-bold text-white/60 mb-4">{staticCollection[activeCategory].year}</span>
              <h3 className="text-5xl md:text-8xl font-headline italic text-white tracking-tighter mb-6">{staticCollection[activeCategory].title}</h3>
              <p className="text-white/40 text-sm md:text-base font-light max-w-sm leading-relaxed">
                {staticCollection[activeCategory].description}
              </p>
            </div>
          </div>

          {/* Catálogo de Archivo */}
          <div className="col-span-12 lg:col-span-5 space-y-16 py-10">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Lista de Colección</h4>
              <div className="w-16 h-[1px] bg-primary"></div>
            </div>

            <div className="space-y-12">
              {dynProducts.length > 0 ? (
                dynProducts.map((p: any, i: number) => (
                  <div key={i} className="group border-b border-border/20 pb-10 flex justify-between items-end hover:border-primary transition-all duration-700 cursor-pointer">
                    <div className="space-y-3">
                      <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground font-bold">Ref. 00{i+1}</span>
                      <h5 className="text-3xl font-headline font-bold group-hover:translate-x-6 transition-transform duration-700 uppercase tracking-tighter">{p.name}</h5>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className="text-2xl font-light italic text-primary">{p.price}</span>
                      <Plus size={12} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-24 border border-dashed border-border/40 rounded-3xl flex flex-col items-center justify-center gap-6 opacity-30">
                  <Gem size={32} />
                  <p className="text-[10px] uppercase tracking-[0.5em] font-black">Próximo Lanzamiento</p>
                </div>
              )}
            </div>

            {/* Bloque Shopper Stylist */}
            <div className="pt-10">
               <AiAssistant 
                title="Personal Shopper IA"
                placeholder="Busco un outfit para una gala en Quito..."
                onAsk={(input) => aiPersonalShopperSuggestions({ userPrompt: input, category: activeCategory })}
              />
            </div>

            {/* Bannner VIP Cita */}
            <div className="bg-foreground text-background p-12 md:p-16 rounded-[2rem] text-center space-y-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <Gem className="mx-auto text-primary" size={40} />
              <div className="space-y-3">
                <h4 className="text-2xl font-headline font-bold italic">Atención Personalizada</h4>
                <p className="text-[9px] uppercase tracking-[0.4em] font-bold leading-loose opacity-60 px-4">
                  Vive la experiencia de lujo en nuestro probador VIP con asesoría privada.
                </p>
              </div>
              <button className="flex items-center gap-4 mx-auto text-[10px] font-black uppercase tracking-[0.4em] border-b border-primary/40 pb-2 hover:border-primary hover:text-primary transition-all group-hover:gap-6">
                Solicitar Cita <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

