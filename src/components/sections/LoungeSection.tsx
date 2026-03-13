"use client"

import React from 'react';
import { Gamepad2, Tv, Star, GlassWater } from 'lucide-react';

export function LoungeSection({ dynamicData }: { dynamicData: any }) {
  const staticMenu = [
    { name: 'Sándwich "Le Chef"', price: '$6.00', category: 'Comida' },
    { name: 'Panini Caprese de Autor', price: '$4.50', category: 'Comida' },
    { name: 'Frappé Gold Noir', price: '$4.00', category: 'Bebidas' },
    { name: 'Limonada Botanique', price: '$3.00', category: 'Bebidas' }
  ];

  const fullMenu = [...staticMenu, ...dynamicData.menuItems];
  const comidas = fullMenu.filter(m => m.category === 'Comida' || !m.category); 
  const bebidas = fullMenu.filter(m => m.category === 'Bebidas');

  const gamingOptions = ["PS5 Pro", "Xbox Series X", "EA FC Elite", "Gran Turismo Racing"];

  return (
    <div className="w-full pt-24 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 space-y-24">
        
        {/* Cabezal de Revista Gastronómica */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-border/20 pb-12">
          <div className="space-y-3">
            <span className="text-[11px] font-black uppercase tracking-[0.8em] text-primary">Leisure & Gastronomie</span>
            <h2 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter uppercase leading-[0.8]">
              Lounge <span className="text-gold-gradient italic font-light">& Resto</span>
            </h2>
          </div>
          <p className="text-[12px] text-muted-foreground font-light uppercase tracking-[0.5em] italic max-w-sm text-right leading-relaxed opacity-70">
            "Donde la espera se convierte en un deleite sensorial. Una pausa necesaria en el corazón del sur de Quito."
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-start">
          
          {/* Menu Card Estilo Negroni (Impecable) */}
          <div className="md:col-span-8 bg-card/60 backdrop-blur-2xl border border-border/50 p-12 md:p-24 rounded-[4rem] editorial-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
              <span className="text-[18rem] font-headline font-black italic">GM</span>
            </div>
            
            <div className="text-center mb-24 space-y-4">
              <h3 className="text-4xl font-headline font-bold italic tracking-tight">Carte d'Hôte</h3>
              <div className="flex justify-center items-center gap-6 opacity-40">
                <span className="h-[1px] w-16 bg-primary"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">SÉLECTION MMXXIV</span>
                <span className="h-[1px] w-16 bg-primary"></span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-20">
              {/* Comida */}
              <div className="space-y-12">
                <div className="flex items-center gap-4 mb-6">
                   <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-primary">Gastronomie</h4>
                   <span className="w-full h-[1px] bg-border/20"></span>
                </div>
                <div className="space-y-10">
                  {comidas.map((item: any, i) => (
                    <div key={i} className="flex justify-between items-baseline group cursor-default">
                      <div className="flex flex-col">
                        <span className="text-foreground text-base font-bold tracking-tight group-hover:text-primary transition-colors duration-500 uppercase">{item.name}</span>
                        <span className="text-[8px] text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-60 transition-all">Gourmet Selection</span>
                      </div>
                      <span className="flex-grow border-b border-dotted border-border/40 mx-6 mb-1.5"></span>
                      <span className="text-primary font-bold text-base tracking-tighter">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bebidas */}
              <div className="space-y-12">
                <div className="flex items-center gap-4 mb-6">
                   <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-primary">Mixologie</h4>
                   <span className="w-full h-[1px] bg-border/20"></span>
                </div>
                <div className="space-y-10">
                  {bebidas.map((item: any, i) => (
                    <div key={i} className="flex justify-between items-baseline group cursor-default">
                      <div className="flex flex-col">
                        <span className="text-foreground text-base font-bold tracking-tight group-hover:text-primary transition-colors duration-500 uppercase">{item.name}</span>
                        <span className="text-[8px] text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-60 transition-all">House Specialty</span>
                      </div>
                      <span className="flex-grow border-b border-dotted border-border/40 mx-6 mb-1.5"></span>
                      <span className="text-primary font-bold text-base tracking-tighter">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-28 pt-12 border-t border-border/10 text-center">
              <p className="text-[11px] text-muted-foreground uppercase tracking-[0.6em] font-medium">Experiencia Exclusiva • GM Beauty House • Quito Sur</p>
            </div>
          </div>

          {/* Sidebar de Entretenimiento */}
          <div className="md:col-span-4 space-y-12">
            <div className="bg-foreground text-background p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-12">
                  <div className="p-4 bg-primary/20 rounded-2xl">
                    <Gamepad2 size={32} className="text-primary" />
                  </div>
                  <h3 className="text-3xl font-headline font-bold italic tracking-tighter">Gamer Suite</h3>
                </div>
                <div className="space-y-8">
                  {gamingOptions.map((game, i) => (
                    <div key={i} className="flex items-center justify-between text-[12px] font-bold uppercase tracking-[0.4em] border-b border-background/10 pb-4 group cursor-default">
                      <span className="opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all duration-500">{game}</span>
                      <Star size={12} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-12 -right-12 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none rotate-12">
                <Gamepad2 size={240} />
              </div>
            </div>

            <div className="bg-card/40 backdrop-blur-xl border border-border/50 p-12 rounded-[3.5rem] flex items-center gap-10 shadow-2xl group hover:border-primary/40 transition-all duration-700">
              <div className="p-6 bg-primary/10 rounded-3xl group-hover:scale-110 transition-transform duration-700">
                <Tv size={36} className="text-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="text-[12px] font-black uppercase tracking-[0.4em] mb-1">Broadcast Hub</h4>
                <p className="text-[11px] text-muted-foreground font-light leading-relaxed uppercase tracking-widest opacity-80">
                  LIGA PRO & CHAMPIONS EN SEÑAL 4K. EL PULSO DEL DEPORTE.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}