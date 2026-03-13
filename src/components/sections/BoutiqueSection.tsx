
"use client"

import React, { useState } from 'react';
import { Gem, ArrowRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BoutiqueSection({ dynamicData }: { dynamicData: any }) {
  const [activeCategory, setActiveCategory] = useState<'mujer' | 'hombre' | 'perfumes'>('mujer');

  const staticCollection = {
    mujer: { title: "L'Eternelle", subtitle: "Colección Otoño/Invierno", img: "https://picsum.photos/seed/fashion-woman/1200/1500" },
    hombre: { title: "Avant-Garde", subtitle: "Minimalismo Masculino", img: "https://picsum.photos/seed/fashion-man/1200/1500" },
    perfumes: { title: "Esprit d'Or", subtitle: "Esencias de Autor", img: "https://picsum.photos/seed/perfume-gold/1200/1500" }
  };

  const dynProducts = dynamicData.products.filter((p: any) => p.category === activeCategory);

  return (
    <div className="w-full pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 space-y-16">
        
        {/* Cabezal Editorial */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-primary">Archivo de Moda • Quito Sur</span>
            <h2 className="text-EDITORIAL text-4xl md:text-7xl font-headline font-bold tracking-tighter uppercase leading-none">
              Boutique <span className="text-gold-gradient italic">Privée</span>
            </h2>
          </div>
          <div className="flex gap-8 border-b border-border/40 pb-4 overflow-x-auto no-scrollbar">
            {['mujer', 'hombre', 'perfumes'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.4em] transition-all whitespace-nowrap",
                  activeCategory === cat ? "text-primary border-b-2 border-primary" : "text-muted-foreground opacity-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Doble Página Editorial */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Impacto Visual */}
          <div className="md:col-span-7 space-y-8">
            <div className="relative group overflow-hidden rounded-[2rem] editorial-shadow aspect-[4/5] md:aspect-auto md:h-[650px]">
              <img 
                src={staticCollection[activeCategory].img} 
                alt="Editorial Visual" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-16">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-2">{staticCollection[activeCategory].subtitle}</span>
                <h3 className="text-4xl md:text-8xl font-headline italic text-white tracking-tighter leading-none">{staticCollection[activeCategory].title}</h3>
              </div>
            </div>
            
            <div className="flex gap-10 items-center border-t border-border/20 pt-8">
              <Quote className="text-primary opacity-30" size={40} />
              <p className="text-lg md:text-2xl font-headline font-light italic leading-relaxed text-muted-foreground">
                "La moda en GM Boutique es una extensión de la arquitectura del ser. Cada pieza es una declaración de intenciones en el vibrante sur de Quito."
              </p>
            </div>
          </div>

          {/* Columna Derecha: Catálogo de Archivo */}
          <div className="md:col-span-5 space-y-12">
            <div className="space-y-2">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] border-b border-border/30 pb-4">Selected Inventory</h4>
              <div className="space-y-8 pt-4">
                {dynProducts.length > 0 ? (
                  dynProducts.map((p: any, i: number) => (
                    <div key={i} className="group flex justify-between items-start gap-4 hover:translate-x-2 transition-all duration-500">
                      <div className="space-y-1">
                        <h5 className="text-xl md:text-2xl font-headline font-bold uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">{p.name}</h5>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed line-clamp-2">{p.description}</p>
                      </div>
                      <span className="text-lg font-light italic text-primary whitespace-nowrap">{p.price}</span>
                    </div>
                  ))
                ) : (
                  <div className="py-10 border-2 border-dashed border-border/10 rounded-2xl flex flex-col items-center justify-center text-center opacity-30">
                    <p className="text-[10px] uppercase font-black tracking-widest">Próximos Ingresos...</p>
                    <p className="text-[8px] uppercase tracking-widest mt-1 italic">Edición Limitada</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bloque Artístico Secundario */}
            <div className="bg-foreground text-background p-10 rounded-[2.5rem] space-y-6 relative overflow-hidden group">
              <Gem className="text-primary mb-2" size={24} />
              <div className="space-y-2">
                <h4 className="text-2xl font-headline font-bold italic tracking-tighter leading-none">Asesoría de Estilo Privada</h4>
                <p className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-60 leading-relaxed">
                  Agende una sesión exclusiva con nuestros curadores de imagen para una experiencia de moda total.
                </p>
              </div>
              <button className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] border-b border-primary/40 pb-2 hover:gap-6 transition-all">
                Reservar Experience <ArrowRight size={10} />
              </button>
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Gem size={100} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
