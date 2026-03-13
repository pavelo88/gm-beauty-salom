
"use client"

import React, { useState, useMemo } from 'react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiStylistRecommendations } from '@/ai/flows/ai-stylist-recommendations';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Star, Wine, GlassWater, Beer } from 'lucide-react';

export function BeautySection({ dynamicData }: { dynamicData: any }) {
  const [concept, setConcept] = useState<'salon' | 'barberia'>('salon');
  const [activeIdx, setActiveIdx] = useState(2); // Iniciar en el medio de una lista de 5
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

  // Salon Color: Sophisticated Rose Quartz
  const accentColor = isBarber ? "text-primary" : "text-[#d1919b]"; 
  const accentBg = isBarber ? "bg-primary" : "bg-[#d1919b]";
  const accentBorder = isBarber ? "border-primary" : "border-[#d1919b]";

  return (
    <div className="w-full pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 space-y-20">
        
        {/* HEADER: TITLES LEFT, BUTTONS RIGHT */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className={cn("text-[10px] font-black uppercase tracking-[0.6em]", accentColor)}>Edición No. 01</span>
              <span className="w-20 h-[1px] bg-border/40"></span>
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-[8rem] font-headline font-bold leading-[0.8] tracking-tighter uppercase">
              {isBarber ? 'Grooming' : 'Estética'} <br/> 
              <span className="opacity-20">Archive</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-end gap-6 mb-4">
            <div className="border border-border/30 p-1.5 flex items-center bg-card/20 backdrop-blur-md rounded-full overflow-hidden shadow-2xl">
              <button 
                onClick={() => { setConcept('salon'); setActiveIdx(2); }}
                className={cn(
                  "px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.4em] transition-all rounded-full",
                  !isBarber ? "bg-[#d1919b] text-white shadow-lg" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Le Salon
              </button>
              <button 
                onClick={() => { setConcept('barberia'); setActiveIdx(2); }}
                className={cn(
                  "px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.4em] transition-all rounded-full",
                  isBarber ? "bg-primary text-black shadow-lg" : "text-muted-foreground hover:text-primary"
                )}
              >
                Barber Shop
              </button>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 text-right">Quito Sur • MMXXIV</span>
          </div>
        </header>

        {/* CAROUSEL: TRIPLE IMAGE 3D SCENE */}
        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {services.map((svc: any, i: number) => {
              let diff = i - activeIdx;
              if (diff > 2) diff -= services.length;
              if (diff < -2) diff += services.length;

              const isCenter = diff === 0;
              const isSide = Math.abs(diff) === 1;
              const isHidden = Math.abs(diff) > 1;

              return (
                <div 
                  key={i}
                  onClick={() => !isCenter && setActiveIdx(i)}
                  className={cn(
                    "absolute transition-all duration-700 ease-out cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl",
                    isCenter ? "z-30 w-[80%] md:w-[60%] h-[90%] md:h-full opacity-100 scale-100 translate-x-0" : "",
                    diff === -1 ? "z-20 w-[60%] h-[70%] md:h-[80%] opacity-40 scale-90 -translate-x-[25%] md:-translate-x-[40%] blur-[2px]" : "",
                    diff === 1 ? "z-20 w-[60%] h-[70%] md:h-[80%] opacity-40 scale-90 translate-x-[25%] md:translate-x-[40%] blur-[2px]" : "",
                    isHidden ? "opacity-0 scale-50 z-0 pointer-events-none" : ""
                  )}
                >
                  <img src={svc.imageUrl} alt={svc.name} className="w-full h-full object-cover" />
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                      <div className="space-y-2">
                        <span className={cn("text-[9px] font-black uppercase tracking-widest", accentColor)}>{svc.price}</span>
                        <h3 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tighter uppercase">{svc.name}</h3>
                        <p className="text-white/60 text-xs md:text-sm font-light max-w-md line-clamp-1">{svc.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Nav Controls Overlay */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-40 pointer-events-none">
            <button 
              onClick={(e) => { e.stopPropagation(); rotate(-1); }}
              className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto hover:bg-white hover:text-black transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); rotate(1); }}
              className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto hover:bg-white hover:text-black transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* BOTTOM: IDENTITY + COURTESY MENU */}
        <div className="magazine-grid gap-16 items-start pt-10">
          <div className="col-span-12 lg:col-span-7 space-y-10">
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-[1px]", accentBg)}></div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">Nuestra Identidad</h4>
            </div>
            <p className="text-2xl md:text-4xl font-headline font-bold italic leading-tight text-foreground/80 border-l-2 pl-8 border-border">
              "En GM Beauty House, entendemos el cabello como una estructura de diseño. No seguimos tendencias efímeras, construimos identidades visuales que perduran. Cada técnica es aplicada con precisión molecular bajo estándares internacionales."
            </p>
            <div className="pt-4">
               <AiAssistant 
                title="Estilista Creativo IA"
                placeholder="Ej: Busco un cambio de look para una boda..."
                onAsk={(input) => aiStylistRecommendations({ userQuery: input, concept })}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="bg-card/20 border border-border/40 p-10 md:p-14 rounded-[2.5rem] editorial-shadow space-y-10">
              <div className="space-y-3">
                <h5 className={cn("text-[10px] font-black uppercase tracking-[0.5em]", accentColor)}>Carta de Cortesía</h5>
                <div className={cn("w-16 h-[1px]", accentBg)}></div>
              </div>
              <div className="space-y-8">
                {courtesyMenu.map((drink, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-default border-b border-border/10 pb-4 hover:border-primary transition-colors">
                    <div className="flex items-center gap-5">
                      <drink.icon size={18} className={cn("opacity-40 group-hover:opacity-100 transition-opacity", accentColor)} />
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{drink.name}</span>
                    </div>
                    <Star size={10} className={cn("opacity-0 group-hover:opacity-100 transition-opacity", accentColor)} />
                  </div>
                ))}
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground pt-6 text-center italic">
                * Experiencia incluida en tu servicio VIP.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
