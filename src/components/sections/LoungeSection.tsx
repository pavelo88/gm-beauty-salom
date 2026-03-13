"use client"

import React from 'react';
import { Coffee, Gamepad2, Star, Tv } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const gamingOptions = ["PS5 Pro", "Xbox X", "EA FC Elite", "GT Racing"];

  return (
    <div className="w-full pt-20 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 space-y-12">
        
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border/30 pb-8">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-primary">Leisure & Gastronomie</span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter uppercase leading-none">
              Lounge <span className="text-gold-gradient italic">& Resto</span>
            </h2>
          </div>
          <p className="text-[11px] text-muted-foreground font-light uppercase tracking-widest italic max-w-xs text-right leading-relaxed">
            "Donde la espera se convierte en deleite sensorial. Una pausa necesaria en el corazón del sur."
          </p>
        </header>

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Menu Card - Estilo Negroni */}
          <div className="col-span-12 lg:col-span-8 bg-card border border-border/40 p-10 md:p-16 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <span className="text-8xl font-headline font-black italic">GM</span>
            </div>
            
            <div className="text-center mb-16 space-y-2">
              <h3 className="text-3xl font-headline font-bold italic tracking-tight">Carte d'Hôte</h3>
              <div className="flex justify-center items-center gap-4">
                <span className="h-[1px] w-8 bg-primary/30"></span>
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-primary">Selection MMXXIV</span>
                <span className="h-[1px] w-8 bg-primary/30"></span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
              {/* Comida Section */}
              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 border-b border-border/20 pb-3">Gastronomie</h4>
                <div className="space-y-6">
                  {comidas.map((item: any, i) => (
                    <div key={i} className="flex justify-between items-baseline group cursor-default">
                      <span className="text-foreground text-sm font-medium tracking-tight group-hover:text-primary transition-colors duration-500">{item.name}</span>
                      <span className="flex-grow border-b border-dotted border-border/40 mx-3 mb-1"></span>
                      <span className="text-primary font-bold text-sm tracking-tighter">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bebidas Section */}
              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 border-b border-border/20 pb-3">Mixologie</h4>
                <div className="space-y-6">
                  {bebidas.map((item: any, i) => (
                    <div key={i} className="flex justify-between items-baseline group cursor-default">
                      <span className="text-foreground text-sm font-medium tracking-tight group-hover:text-primary transition-colors duration-500">{item.name}</span>
                      <span className="flex-grow border-b border-dotted border-border/40 mx-3 mb-1"></span>
                      <span className="text-primary font-bold text-sm tracking-tighter">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-border/20 text-center">
              <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em]">Experiencia exclusiva GM Beauty House • Quito Sur</p>
            </div>
          </div>

          {/* Sidebar - Entretenimiento Compacto */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-foreground text-background p-10 rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Gamepad2 size={20} className="text-primary" />
                  <h3 className="text-xl font-headline font-bold italic tracking-tighter">Gamer Suite</h3>
                </div>
                <div className="space-y-4">
                  {gamingOptions.map((game, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest border-b border-background/10 pb-2 group cursor-default">
                      <span className="opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all">{game}</span>
                      <Star size={8} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
                <Gamepad2 size={120} />
              </div>
            </div>

            <div className="bg-card border border-border/40 p-8 rounded-[2rem] flex items-center gap-6 shadow-lg group hover:border-primary/30 transition-all duration-700">
              <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors">
                <Tv size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Broadcast Hub</h4>
                <p className="text-[10px] text-muted-foreground font-light leading-relaxed">
                  Disfruta de la Liga Pro & Champions en señal 4K. El pulso del deporte con elegancia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
