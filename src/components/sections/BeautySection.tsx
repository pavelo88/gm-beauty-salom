"use client"

import React, { useState, useMemo } from 'react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiStylistRecommendations } from '@/ai/flows/ai-stylist-recommendations';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Star, Wine, GlassWater, Beer } from 'lucide-react';

export function BeautySection({ dynamicData }: { dynamicData: any }) {
  const [concept, setConcept] = useState<'salon' | 'barberia'>('salon');
  const [activeIdx, setActiveIdx] = useState(2);
  const isBarber = concept === 'barberia';

  const defaultServices = {
    salon: [
      { name: 'Balayage Editorial', price: 'Cotizar', description: 'Técnica de color personalizada para un brillo natural.', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Corte de Autor', price: '$25.00', description: 'Diseño estructural basado en la morfología de tu rostro.', imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Hidratación Molecular', price: '$45.00', description: 'Tratamiento profundo para restaurar la fibra capilar.', imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Maquillaje Pro', price: '$50.00', description: 'Look editorial para eventos y galas.', imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Manicura Spa', price: '$20.00', description: 'Cuidado integral de uñas con productos premium.', imageUrl: 'https://images.unsplash.com/photo-1610992015732-2449b0c26296?auto=format&fit=crop&q=80&w=1200' }
    ],
    barberia: [
      { name: 'Corte Ejecutivo', price: '$20.00', description: 'Precisión milimétrica y acabado clásico.', imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Ritual de Barba', price: '$15.00', description: 'Afeitado tradicional con toallas calientes.', imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d6d4e59?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Corte & Skin Fade', price: '$22.00', description: 'Degradados de alta complejidad.', imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Black Mask VIP', price: '$10.00', description: 'Limpieza profunda de impurezas.', imageUrl: 'https://images.unsplash.com/photo-1595867366775-c40d9564a0dc?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Color Freestyle', price: '$40.00', description: 'Coloración creativa y diseños modernos.', imageUrl: 'https://images.unsplash.com/photo-1634480555299-286df8433374?auto=format&fit=crop&q=80&w=1200' }
    ]
  };

  const services = useMemo(() => {
    const dbServices = dynamicData.services.filter((s: any) => s.category === concept);
    return dbServices.length >= 5 ? dbServices : defaultServices[concept];
  }, [concept, dynamicData.services]);

  const rotate = (dir: number) => {
    setActiveIdx((prev) => (prev + dir + services.length) % services.length);
  };

  const courtesyMenu = [
    { name: 'Gin Tonic Botánico', icon: Wine },
    { name: 'Vino Tinto Reserva', icon: Wine },
    { name: 'Cerveza d\'Artisan', icon: Beer },
    { name: 'Agua de Rosas Helada', icon: GlassWater }
  ];

  const accentColor = isBarber ? "text-primary" : "text-[#d1919b]"; 
  const accentBg = isBarber ? "bg-primary" : "bg-[#d1919b]";

  return (
    <div className="w-full pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 space-y-8">
        
        <header className="flex justify-between items-center">
          <div className="space-y-1">
            <span className={cn("text-[8px] font-black uppercase tracking-[0.5em]", accentColor)}>Edición No. 01</span>
            <h2 className="text-3xl md:text-4xl font-headline font-bold leading-none tracking-tighter uppercase">
              {isBarber ? 'Grooming' : 'Estética'} <span className="opacity-20 italic">Archive</span>
            </h2>
          </div>
          
          <div className="flex border border-border/30 p-1 bg-card/20 backdrop-blur-md rounded-full">
            <button 
              onClick={() => { setConcept('salon'); setActiveIdx(2); }}
              className={cn(
                "px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.3em] transition-all rounded-full",
                !isBarber ? "bg-[#d1919b] text-white shadow-lg" : "text-muted-foreground"
              )}
            >
              Le Salon
            </button>
            <button 
              onClick={() => { setConcept('barberia'); setActiveIdx(2); }}
              className={cn(
                "px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.3em] transition-all rounded-full",
                isBarber ? "bg-primary text-black shadow-lg" : "text-muted-foreground"
              )}
            >
              Barber Shop
            </button>
          </div>
        </header>

        <div className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {services.map((svc: any, i: number) => {
              let diff = i - activeIdx;
              if (diff > 2) diff -= services.length;
              if (diff < -2) diff += services.length;

              const isCenter = diff === 0;
              const isSide = Math.abs(diff) === 1;

              return (
                <div 
                  key={i}
                  className={cn(
                    "absolute transition-all duration-700 ease-out overflow-hidden rounded-xl shadow-lg",
                    isCenter ? "z-30 w-[80%] md:w-[45%] h-full opacity-100 scale-100" : "",
                    diff === -1 ? "z-20 w-[55%] h-[80%] opacity-30 scale-90 -translate-x-[30%] blur-[1px]" : "",
                    diff === 1 ? "z-20 w-[55%] h-[80%] opacity-30 scale-90 translate-x-[30%] blur-[1px]" : "",
                    Math.abs(diff) > 1 ? "opacity-0 z-0" : ""
                  )}
                >
                  <img src={svc.imageUrl} alt={svc.name} className="w-full h-full object-cover" />
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                      <span className={cn("text-[8px] font-black uppercase tracking-widest", accentColor)}>{svc.price}</span>
                      <h3 className="text-xl md:text-2xl font-headline font-bold text-white tracking-tighter uppercase">{svc.name}</h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between z-40 pointer-events-none">
            <button onClick={() => rotate(-1)} className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white pointer-events-auto hover:bg-white hover:text-black transition-all flex items-center justify-center">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => rotate(1)} className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white pointer-events-auto hover:bg-white hover:text-black transition-all flex items-center justify-center">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="magazine-grid gap-6 items-start">
          <div className="col-span-12 lg:col-span-7 space-y-4">
            <p className="text-lg md:text-xl font-headline font-bold italic leading-tight text-foreground/80 border-l-2 pl-4 border-border">
              "En GM Beauty House, construimos identidades visuales que perduran bajo estándares internacionales."
            </p>
            <div className="max-w-md">
               <AiAssistant 
                title="Estilista IA"
                placeholder="Busco un cambio..."
                onAsk={(input) => aiStylistRecommendations({ userQuery: input, concept })}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="bg-card/20 border border-border/40 p-6 rounded-2xl space-y-4">
              <h5 className={cn("text-[8px] font-black uppercase tracking-[0.5em]", accentColor)}>Carta de Cortesía</h5>
              <div className="grid grid-cols-2 gap-3">
                {courtesyMenu.map((drink, i) => (
                  <div key={i} className="flex items-center gap-2 group border-b border-border/10 pb-2">
                    <drink.icon size={12} className={cn("opacity-40 group-hover:opacity-100", accentColor)} />
                    <span className="text-[8px] font-bold uppercase tracking-[0.1em]">{drink.name}</span>
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
