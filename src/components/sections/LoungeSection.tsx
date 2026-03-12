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
    { name: 'Piqueos del Huerto (Select)', price: '$9.00', category: 'Comida' },
    { name: 'Frappé Gold Noir', price: '$4.00', category: 'Bebidas' },
    { name: 'Limonada Botanique', price: '$3.00', category: 'Bebidas' },
    { name: 'Cerveza d\'Artisan', price: '$4.50', category: 'Bebidas' }
  ];

  const fullMenu = [...staticMenu, ...dynamicData.menuItems];
  const comidas = fullMenu.filter(m => m.category === 'Comida' || !m.category); 
  const bebidas = fullMenu.filter(m => m.category === 'Bebidas');

  const gamingOptions = ["PlayStation 5 Pro", "Xbox Series X", "EA FC Elite", "GT Racing Suite"];

  return (
    <div className="w-full pt-40 pb-20">
      <div className="max-w-[1600px] mx-auto px-10 space-y-40">
        
        <header className="magazine-grid items-center gap-16">
          <div className="col-span-12 lg:col-span-8">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-8 block">Leisure Department</span>
            <h2 className="text-editorial-title leading-[0.75]">LOUNGE <br/> <span className="text-gold-gradient italic">& RESTO</span></h2>
          </div>
          <div className="col-span-12 lg:col-span-4 text-right flex flex-col items-end">
            <p className="text-lg text-muted-foreground font-light leading-relaxed italic max-w-xs mb-10">
              "Donde la espera se convierte en una experiencia de deleite sensorial y entretenimiento digital."
            </p>
            <MoveDown className="animate-bounce opacity-20" size={40} />
          </div>
        </header>

        <div className="mb-20">
          <AiAssistant 
            title="Entertainment Sommelier AI"
            placeholder="¿Cómo te sientes hoy? Te sugeriremos el combo ideal..."
            onAsk={(input) => aiEntertainmentSommelier({ 
              customerPreference: input, 
              availableMenuItems: fullMenu.map(m => ({ name: m.name, price: m.price, category: m.category })),
              availableGamingOptions: gamingOptions
            })}
            isLightMode={true}
          />
        </div>

        <div className="magazine-grid gap-20">
          {/* Menu Card */}
          <div className="col-span-12 lg:col-span-8 bg-card border border-border p-16 md:p-24 editorial-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <div className="flex justify-between items-baseline mb-20">
              <h3 className="text-5xl font-headline font-bold italic tracking-tighter">Carte d'Hôte</h3>
              <span className="text-[8px] font-black uppercase tracking-[0.5em] opacity-30">Selection MMXXIV</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-12">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b border-primary/20 pb-4">Gastronomie</h4>
                <div className="space-y-8">
                  {comidas.map((item: any, i) => (
                    <div key={i} className="flex justify-between items-baseline group">
                      <span className="text-foreground text-lg font-medium tracking-tight group-hover:text-primary transition-colors">{item.name}</span>
                      <span className="w-10 h-[1px] bg-border mx-4 opacity-30"></span>
                      <span className="text-primary font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-12">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b border-primary/20 pb-4">Mixologie & Café</h4>
                <div className="space-y-8">
                  {bebidas.map((item: any, i) => (
                    <div key={i} className="flex justify-between items-baseline group">
                      <span className="text-foreground text-lg font-medium tracking-tight group-hover:text-primary transition-colors">{item.name}</span>
                      <span className="w-10 h-[1px] bg-border mx-4 opacity-30"></span>
                      <span className="text-primary font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gamer/Social Space */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-10">
            <div className="bg-foreground text-background p-16 editorial-shadow flex-1 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Gamepad2 size={300} />
              </div>
              <h3 className="text-4xl font-headline font-bold italic tracking-tighter mb-10 border-b border-white/10 pb-6">Gamer Suite</h3>
              <div className="space-y-6">
                {gamingOptions.map((game, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                    <Star size={14} className="text-primary" />
                    {game}
                  </div>
                ))}
              </div>
              <div className="mt-20 pt-10 border-t border-white/10">
                <p className="text-[9px] uppercase tracking-[0.3em] font-medium leading-relaxed opacity-40">
                  Powered by High-End Modulares GM Structures.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border p-12 editorial-shadow flex items-center gap-10 hover:border-primary transition-all duration-500">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                <Tv size={28} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Live Broadcasts</h4>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">Liga Pro & European Champions on 4K Cinema Displays.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}