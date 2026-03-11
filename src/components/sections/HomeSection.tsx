"use client"

import React from 'react';
import { Crown, Scissors, ShoppingBag, Sofa, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HomeSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const categories = [
    { id: 'beauty', title: 'Salón & Barbería', desc: 'Cortes ejecutivos, balayage y uñas spa.', icon: Scissors, img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' },
    { id: 'boutique', title: 'Moda & Perfumes', desc: 'Ropa en tendencia y fragancias importadas.', icon: ShoppingBag, img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800' },
    { id: 'alliance', title: 'Diseño de Espacios', desc: 'Mobiliario modular por Modulares GM.', icon: Sofa, img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800' },
    { id: 'lounge', title: 'Lounge & Sabor', desc: 'Zona Gamer PS5, cafetería y deportes.', icon: Gamepad2, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24 animate-in fade-in duration-1000">
      <div className="text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center justify-center space-x-2 border border-primary/40 bg-primary/10 px-6 py-2 rounded-full mb-4">
          <Crown size={16} className="text-primary" />
          <span className="text-primary text-xs font-bold tracking-widest uppercase">El nivel que mereces</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-headline font-black text-white tracking-tight leading-[1.1]">
          Tu Estilo y tu Entorno,<br/>
          <span className="text-gold">Elevados a la Perfección.</span>
        </h2>
        <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-2xl mx-auto font-light">
          Un espacio disruptivo en el Sur de Quito donde convergen la belleza de vanguardia, moda exclusiva y diseño de interiores premium.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((card) => (
          <div 
            key={card.id} 
            onClick={() => setActiveTab(card.id)} 
            className="group relative bg-card border border-border rounded-3xl cursor-pointer overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_20px_50px_rgba(255,219,1,0.1)] flex flex-col h-[400px]"
          >
            <div className="h-1/2 overflow-hidden relative">
              <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-500"></div>
            </div>
            <div className="p-8 relative flex-grow bg-gradient-to-t from-card via-card to-transparent -mt-12 z-10 flex flex-col justify-end">
              <div className="w-14 h-14 bg-background border border-primary/30 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold-vibrant group-hover:text-black transition-all shadow-xl">
                <card.icon size={28} />
              </div>
              <h3 className="text-2xl font-headline font-bold text-white mb-2">{card.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
