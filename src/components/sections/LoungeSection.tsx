"use client"

import React from 'react';
import { Coffee, Gamepad2, Star, Tv, MoveDown } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiEntertainmentSommelier } from '@/ai/flows/ai-entertainment-sommelier';
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
    <div className="w-full pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 space-y-24">
        
        <header className="magazine-grid items-center gap-10">
          <div className="col-span-12 lg:col-span-8">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-primary mb-4 block">Leisure Dept.</span>
            <h2 className="text-editorial-title">LOUNGE <br/> <span className="text-gold-gradient italic">& RESTO</span></h2>
          </div>
          <div className="col-span-12 lg:col-span-4 text-right flex flex-col items-end">
            <p className="text-sm text-muted-foreground font-light leading-relaxed italic max-w-xs">
              "Donde la espera se convierte en deleite sensorial."
            </p>
          </div>
        </header>

        <div className="max-w-2xl">
          <AiAssistant 
            title="Sommelier IA"
            placeholder="¿Cómo te sientes hoy?..."
            onAsk={(input) => aiEntertainmentSommelier({ 
              customerPreference: input, 
              availableMenuItems: fullMenu.map(m => ({ name: m.name, price: m.price, category: m.category })),
              availableGamingOptions: gamingOptions
            })}
          />
        </div>

        <div className="magazine-grid gap-12">
          <div className="col-span-12 lg:col-span-8 bg-card border border-border p-10 md:p-16 editorial-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <div className="flex justify-between items-baseline mb-12">
              <h3 className="text-3xl font-headline font-bold italic tracking-tighter">Carte d'Hôte</h3>
              <span className="text-[8px] font-black uppercase tracking-[0.5em] opacity-30">Selection 2024</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary border-b border-primary/20 pb-2">Gastronomie</h4>
                <div className="space-y-4">
                  {comidas.map((item: any, i) => (
                    <div key={i} className="flex justify-between items-baseline group">
                      <span className="text-foreground text-sm font-medium tracking-tight group-hover:text-primary transition-colors">{item.name}</span>
                      <span className="flex-grow border-b border-dotted border-border mx-2 opacity-20"></span>
                      <span className="text-primary font-bold text-sm">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-8">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary border-b border-primary/20 pb-2">Mixologie</h4>
                <div className="space-y-4">
                  {bebidas.map((item: any, i) => (
                    <div key={i} className="flex justify-between items-baseline group">
                      <span className="text-foreground text-sm font-medium tracking-tight group-hover:text-primary transition-colors">{item.name}</span>
                      <span className="flex-grow border-b border-dotted border-border mx-2 opacity-20"></span>
                      <span className="text-primary font-bold text-sm">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-foreground text-background p-10 editorial-shadow flex-1 relative overflow-hidden group rounded-2xl">
              <h3 className="text-2xl font-headline font-bold italic tracking-tighter mb-6 border-b border-white/10 pb-4">Gamer Suite</h3>
              <div className="space-y-4">
                {gamingOptions.map((game, i) => (
                  <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                    <Star size={10} className="text-primary" />
                    {game}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border p-8 editorial-shadow flex items-center gap-6 rounded-2xl">
              <Tv size={24} className="text-primary" />
              <div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] mb-1">Live Broadcasts</h4>
                <p className="text-[10px] text-muted-foreground font-light">Liga Pro & Champions on 4K.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
