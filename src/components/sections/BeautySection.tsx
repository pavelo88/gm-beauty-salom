"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Wine, GlassWater, Beer } from 'lucide-react';

export function BeautySection({ dynamicData }: { dynamicData: any }) {
  const [concept, setConcept] = useState<'salon' | 'barberia'>('salon');
  const [activeIdx, setActiveIdx] = useState(2);
  const isBarber = concept === 'barberia';

  const defaultServices = {
    salon: [
      { name: 'Balayage Editorial', price: 'Cotizar', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Corte de Autor', price: '$25.00', imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Hidratación Molecular', price: '$45.00', imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Maquillaje Pro', price: '$50.00', imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Manicura Spa', price: '$20.00', imageUrl: 'https://images.unsplash.com/photo-1610992015732-2449b0c26296?auto=format&fit=crop&q=80&w=1200' }
    ],
    barberia: [
      { name: 'Corte Ejecutivo', price: '$20.00', imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Ritual de Barba', price: '$15.00', imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d6d4e59?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Corte & Skin Fade', price: '$22.00', imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Black Mask VIP', price: '$10.00', imageUrl: 'https://images.unsplash.com/photo-1595867366775-c40d9564a0dc?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Color Freestyle', price: '$40.00', imageUrl: 'https://images.unsplash.com/photo-1634480555299-286df8433374?auto=format&fit=crop&q=80&w=1200' }
    ]
  };

  const services = useMemo(() => {
    const dbServices = dynamicData.services.filter((s: any) => s.category === concept);
    return dbServices.length >= 5 ? dbServices : defaultServices[concept];
  }, [concept, dynamicData.services]);

  const rotate = (dir: number) => {
    setActiveIdx((prev) => (prev + dir + services.length) % services.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      rotate(1);
    }, 2500);
    return () => clearInterval(timer);
  }, [services.length]);

  const courtesyMenu = [
    { name: 'Gin Tonic Botánico', icon: Wine },
    { name: 'Vino Tinto Reserva', icon: Wine },
    { name: 'Cerveza d\'Artisan', icon: Beer },
    { name: 'Agua de Rosas Helada', icon: GlassWater }
  ];

  const accentColor = isBarber ? "text-primary" : "text-[#d1919b]"; 

  return (
    <div className="w-full pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 space-y-16">
        
        {/* Cabezal Dinámico de Revista */}
        <header className="flex flex-col md:flex-row justify-between items-start gap-10 border-b border-border/20 pb-8">
          <div className="space-y-2">
            <span className={cn("text-[10px] font-black uppercase tracking-[0.6em]", accentColor)}>Edición Archive No. 01</span>
            <h2 className="text-5xl md:text-7xl font-headline font-bold leading-none tracking-tighter uppercase">
              Grooming <span className="opacity-20 italic font-light">& Style</span>
            </h2>
          </div>
          
          <div className="flex border border-border/30 p-1.5 bg-card/40 backdrop-blur-xl rounded-full self-end shadow-xl">
            <button 
              onClick={() => { setConcept('salon'); setActiveIdx(2); }}
              className={cn(
                "px-8 py-3 text-[10px] font-black uppercase tracking-[0.4em] transition-all rounded-full",
                !isBarber ? "bg-[#d1919b] text-white shadow-lg" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Le Salon
            </button>
            <button 
              onClick={() => { setConcept('barberia'); setActiveIdx(2); }}
              className={cn(
                "px-8 py-3 text-[10px] font-black uppercase tracking-[0.4em] transition-all rounded-full",
                isBarber ? "bg-primary text-black shadow-lg" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Barbería
            </button>
          </div>
        </header>

        {/* Galería 3D con Profundidad */}
        <div className="relative h-[300px] md:h-[450px] flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {services.map((svc: any, i: number) => {
              let diff = i - activeIdx;
              if (diff > 2) diff -= services.length;
              if (diff < -2) diff += services.length;

              const isCenter = diff === 0;

              return (
                <div 
                  key={i}
                  className={cn(
                    "absolute transition-all duration-1000 ease-in-out overflow-hidden rounded-[2rem] shadow-2xl border border-white/10",
                    isCenter ? "z-30 w-[90%] md:w-[50%] h-full opacity-100 scale-100" : "",
                    diff === -1 ? "z-20 w-[70%] h-[85%] opacity-30 scale-90 -translate-x-[30%] blur-[2px]" : "",
                    diff === 1 ? "z-20 w-[70%] h-[85%] opacity-30 scale-90 translate-x-[30%] blur-[2px]" : "",
                    Math.abs(diff) > 1 ? "opacity-0 z-0" : ""
                  )}
                >
                  <img src={svc.imageUrl} alt={svc.name} className="w-full h-full object-cover" />
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                      <div className="space-y-1">
                        <span className={cn("text-[10px] font-black uppercase tracking-widest", accentColor)}>{svc.price}</span>
                        <h3 className="text-2xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase leading-none">{svc.name}</h3>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-40 pointer-events-none">
            <button onClick={() => rotate(-1)} className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl text-white pointer-events-auto hover:bg-primary transition-all flex items-center justify-center shadow-2xl group">
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={() => rotate(1)} className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl text-white pointer-events-auto hover:bg-primary transition-all flex items-center justify-center shadow-2xl group">
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bloque de Identidad y Mixología - Más Espaciado */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start pt-12">
          <div className="md:col-span-7 space-y-8">
             <div className="flex items-center gap-4">
               <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-muted-foreground whitespace-nowrap">Nuestra Identidad</h4>
               <span className="w-full h-[1px] bg-border/20"></span>
             </div>
            <p className="text-2xl md:text-4xl font-headline font-bold italic leading-[1.1] text-foreground border-l-8 pl-10 border-primary/20">
              "En GM Beauty House, entendemos el cabello como una estructura de diseño. No seguimos tendencias efímeras, construimos identidades visuales que perduran bajo estándares internacionales."
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 p-10 md:p-12 rounded-[2.5rem] space-y-8 shadow-2xl">
              <div className="text-center space-y-2">
                <h5 className={cn("text-[10px] font-black uppercase tracking-[0.6em]", accentColor)}>Mixología de Cortesía</h5>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest opacity-60">Exclusive VIP Selection</p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {courtesyMenu.map((drink, i) => (
                  <div key={i} className="flex items-center justify-between group border-b border-border/10 pb-4 hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-6">
                      <drink.icon size={16} className={cn("opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all", accentColor)} />
                      <span className="text-[11px] font-bold uppercase tracking-[0.3em]">{drink.name}</span>
                    </div>
                    <span className="text-[8px] text-primary font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Gratis</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}