
"use client"

import React from 'react';
import { Gamepad2, Tv, Star } from 'lucide-react';

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
    <div className="w-full pt-20 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 space-y-16">
        
        <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-border/20 pb-10">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-primary">Leisure & Gastronomie</span>
            <h2 className="text-4xl md:text-7xl font-headline font-bold tracking-tighter uppercase leading-none">
              Lounge <span className="text-gold-gradient italic">& Resto</span>
            </h2>
          </div>
          <p className="text-[11px] text-muted-foreground font-light uppercase tracking-widest italic max-w-sm text-right leading-relaxed">
            "Donde la espera se convierte en deleite sensorial. Una pausa necesaria en el corazón del sur de Quito."
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Menu Card Estilo Negroni */}
          <div className="md:col-span-8 bg-card/20 backdrop-blur-md border border-border/40 p-10 md:p-20 rounded-[3rem] editorial-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <span className="text-[12rem] font-headline font-black italic">GM</span>
            </div>
            
            <div className="text-center mb-16 space-y-2">
              <h3 className="text-3xl font-headline font-bold italic tracking-tight">Carte d'Hôte</h3>
              <div className="flex justify-center items-center gap-4 opacity-50">
                <span className="h-[1px] w-12 bg-primary"></span>
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Selection MMXXIV</span>
                <span className="h-[1px] w-12 bg-primary"></span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
              {/* Comida */}
              <div className="space-y-10">
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary border-b border-border/20 pb-4">Gastronomie</h4>
                <div className="space-y-8">
                  {comidas.map((item: any, i) => (
                    <div key={i} className="flex justify-between items-baseline group cursor-default">
                      <span className="text-foreground text-sm font-semibold tracking-tight group-hover:text-primary transition-colors duration-500">{item.name}</span>
                      <span className="flex-grow border-b border-dotted border-border/40 mx-4 mb-1"></span>
                      <span className="text-primary font-bold text-sm tracking-tighter">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bebidas */}
              <div className="space-y-10">
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary border-b border-border/20 pb-4">Mixologie</h4>
                <div className="space-y-8">
                  {bebidas.map((item: any, i) => (
                    <div key={i} className="flex justify-between items-baseline group cursor-default">
                      <span className="text-foreground text-sm font-semibold tracking-tight group-hover:text-primary transition-colors duration-500">{item.name}</span>
                      <span className="flex-grow border-b border-dotted border-border/40 mx-4 mb-1"></span>
                      <span className="text-primary font-bold text-sm tracking-tighter">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-20 pt-10 border-t border-border/10 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.5em]">Experiencia exclusiva GM Beauty House • MMXXIV</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-8">
            <div className="bg-foreground text-background p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <Gamepad2 size={24} className="text-primary" />
                  <h3 className="text-2xl font-headline font-bold italic tracking-tighter">Gamer Suite</h3>
                </div>
                <div className="space-y-6">
                  {gamingOptions.map((game, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.3em] border-b border-background/10 pb-3 group cursor-default">
                      <span className="opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all">{game}</span>
                      <Star size={10} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <Gamepad2 size={160} />
              </div>
            </div>

            <div className="bg-card/30 border border-border/40 p-10 rounded-[2.5rem] flex items-center gap-8 shadow-lg group hover:border-primary/40 transition-all duration-700">
              <div className="p-5 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                <Tv size={28} className="text-primary" />
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-2">Broadcast Hub</h4>
                <p className="text-[10px] text-muted-foreground font-light leading-relaxed uppercase tracking-widest">
                  Liga Pro & Champions en señal 4K. El pulso del deporte.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
