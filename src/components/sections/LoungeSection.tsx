"use client"

import React from 'react';
import { Coffee, Gamepad2, Star, Tv } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiEntertainmentSommelier } from '@/ai/flows/ai-entertainment-sommelier';
import { cn } from '@/lib/utils';

export function LoungeSection({ dynamicData }: { dynamicData: any }) {
  const staticMenu = [
    { name: 'Sándwich "El Jefe" (Lomo/Queso)', price: '$5.50', category: 'Comida' },
    { name: 'Panini Caprese (Vegetariano)', price: '$4.00', category: 'Comida' },
    { name: 'Tabla de Piqueos (Para 2)', price: '$8.50', category: 'Comida' },
    { name: 'Frappé Moka Intenso', price: '$3.50', category: 'Bebidas' },
    { name: 'Limonada de Coco & Menta', price: '$2.50', category: 'Bebidas' },
    { name: 'Cerveza Artesanal Local', price: '$3.00', category: 'Bebidas' }
  ];

  const fullMenu = [...staticMenu, ...dynamicData.menuItems];
  const comidas = fullMenu.filter(m => m.category === 'Comida' || !m.category); 
  const bebidas = fullMenu.filter(m => m.category === 'Bebidas');

  const gamingOptions = ["PlayStation 5", "Xbox Series X", "EA FC 26", "Mortal Kombat 1", "Call of Duty"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16 animate-in slide-in-from-bottom-8 duration-700">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-5xl md:text-7xl font-headline font-bold text-white">Lounge & Resto</h2>
        <p className="text-xl text-zinc-400 font-light">La espera ya no es aburrida. Come, juega y relájate en nuestras zonas diseñadas para el entretenimiento de alta gama.</p>
      </div>

      <AiAssistant 
        title="Sommelier de Entretenimiento AI ✨"
        placeholder="Ej: Estoy esperando a mi novia con mis amigos y queremos relajarnos."
        onAsk={(input) => aiEntertainmentSommelier({ 
          customerPreference: input, 
          availableMenuItems: fullMenu.map(m => ({ name: m.name, price: m.price, category: m.category })),
          availableGamingOptions: gamingOptions
        })}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 bg-card p-10 md:p-14 rounded-[3rem] border border-border shadow-2xl group hover:border-primary/20 transition-all">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Coffee size={32} />
            </div>
            <h3 className="text-4xl font-headline font-bold text-white">Resto Bar</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-primary font-black uppercase tracking-widest border-b border-primary/20 pb-3 text-xs">Menu de Comida</h4>
              <div className="space-y-5">
                {comidas.map((item: any, i) => (
                  <div key={i} className="flex justify-between items-baseline group/item">
                    <span className="text-zinc-300 font-medium group-hover/item:text-white transition-colors">{item.name}</span>
                    <span className="text-primary font-bold text-sm bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-primary font-black uppercase tracking-widest border-b border-primary/20 pb-3 text-xs">Bebidas & Coctelería</h4>
              <div className="space-y-5">
                {bebidas.map((item: any, i) => (
                  <div key={i} className="flex justify-between items-baseline group/item">
                    <span className="text-zinc-300 font-medium group-hover/item:text-white transition-colors">{item.name}</span>
                    <span className="text-primary font-bold text-sm bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-10">
          <div className="bg-gradient-to-br from-card to-background p-10 md:p-12 rounded-[3rem] border border-border relative overflow-hidden flex-1 shadow-2xl">
            <div className="absolute -right-10 -top-10 opacity-5 text-primary pointer-events-none">
              <Gamepad2 size={250} />
            </div>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Gamepad2 size={24} />
              </div>
              <h3 className="text-3xl font-headline font-bold text-white">Gamer Zone VIP</h3>
            </div>
            <p className="text-zinc-400 relative z-10 mb-10 text-lg font-light leading-relaxed">
              Mobiliario exclusivo <span className="text-primary font-bold">GM Modulares</span>. Juega mientras esperas tu turno o el de tu pareja.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {gamingOptions.map((game, i) => (
                <div key={i} className="bg-background/80 backdrop-blur-md border border-border p-4 rounded-2xl flex items-center space-x-3 group hover:border-primary/50 transition-all cursor-default">
                  <Star className="text-primary group-hover:scale-110 transition-transform" size={18} />
                  <span className="text-white font-bold text-sm">{game}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-10 rounded-[2.5rem] border border-border relative flex items-center shadow-2xl hover:border-primary/30 transition-all group">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mr-8 group-hover:scale-110 transition-transform">
              <Tv size={36} />
            </div>
            <div>
              <h3 className="text-2xl font-headline font-bold text-white mb-2 uppercase tracking-widest">Eventos Deportivos</h3>
              <p className="text-zinc-400 text-sm font-light">
                Pantallas 4K en todo el local. Transmitimos Liga Pro, Champions League y peleas UFC en vivo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
