
"use client"

import React, { useState, useMemo } from 'react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiStylistRecommendations } from '@/ai/flows/ai-stylist-recommendations';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Star, Wine, GlassWater, Beer } from 'lucide-react';

export function BeautySection({ dynamicData }: { dynamicData: any }) {
  const [concept, setConcept] = useState<'salon' | 'barberia'>('salon');
  const [activeIdx, setActiveIdx] = useState(0);
  const isBarber = concept === 'barberia';

  const defaultServices = {
    salon: [
      { name: 'Balayage Editorial', price: 'Cotizar', description: 'Técnica de color personalizada para un brillo natural y multidimensional.', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Corte de Autor', price: '$25.00', description: 'Diseño estructural basado en la morfología de tu rostro.', imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Hidratación Molecular', price: '$45.00', description: 'Tratamiento profundo para restaurar la fibra capilar desde el núcleo.', imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200' }
    ],
    barberia: [
      { name: 'Corte Ejecutivo', price: '$20.00', description: 'Precisión milimétrica y acabado clásico para el caballero moderno.', imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Ritual de Barba', price: '$15.00', description: 'Afeitado tradicional con toallas calientes y aceites esenciales.', imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d6d4e59?auto=format&fit=crop&q=80&w=1200' },
      { name: 'Corte & Skin Fade', price: '$22.00', description: 'Degradados de alta complejidad con terminaciones en navaja.', imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200' }
    ]
  };

  const services = useMemo(() => {
    const dbServices = dynamicData.services.filter((s: any) => s.category === concept);
    return dbServices.length > 0 ? dbServices : defaultServices[concept];
  }, [concept, dynamicData.services]);

  const rotate = (dir: number) => {
    setActiveIdx((prev) => (prev + dir + services.length) % services.length);
  };

  const currentService = services[activeIdx] || services[0];

  const courtesyMenu = [
    { name: 'Gin Tonic Botánico', icon: Wine },
    { name: 'Vino Tinto Reserva', icon: Wine },
    { name: 'Cerveza Artesanal', icon: Beer },
    { name: 'Agua de Rosas Helada', icon: GlassWater }
  ];

  const accentColor = isBarber ? "text-primary" : "text-[#d4a373]"; // Rose gold tone for Salon
  const accentBg = isBarber ? "bg-primary" : "bg-[#d4a373]";

  return (
    <div className="w-full pt-32 pb-20 transition-all duration-1000">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        
        {/* TOP ROW: HERO & TOGGLE */}
        <header className="magazine-grid items-end gap-10 mb-16">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="flex items-center gap-4">
              <span className={cn("text-[10px] font-black uppercase tracking-[0.6em]", accentColor)}>Edición No. 01</span>
              <span className="w-20 h-[1px] bg-border/40"></span>
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-[9rem] font-headline font-bold leading-[0.8] tracking-tighter uppercase">
              {isBarber ? 'Grooming' : 'Estética'} <br/> 
              <span className="not-italic opacity-20">Archive</span>
            </h2>
          </div>
          
          <div className="col-span-12 lg:col-span-4 flex flex-col items-end gap-8 pb-4">
             <div className="border border-border/30 p-1 flex items-center bg-card/20 backdrop-blur-md rounded-full overflow-hidden shadow-2xl">
              <button 
                onClick={() => { setConcept('salon'); setActiveIdx(0); }}
                className={cn(
                  "px-8 py-2 text-[9px] font-black uppercase tracking-[0.4em] transition-all rounded-full",
                  !isBarber ? "bg-[#d4a373] text-white shadow-lg" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Le Salon
              </button>
              <button 
                onClick={() => { setConcept('barberia'); setActiveIdx(0); }}
                className={cn(
                  "px-8 py-2 text-[9px] font-black uppercase tracking-[0.4em] transition-all rounded-full",
                  isBarber ? "bg-primary text-black shadow-lg" : "text-muted-foreground hover:text-primary"
                )}
              >
                Barber Shop
              </button>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 text-right max-w-[200px]">
              Selecciona tu experiencia personalizada en Quito Sur.
            </p>
          </div>
        </header>

        {/* MIDDLE ROW: SINGLE IMAGE CAROUSEL */}
        <div className="relative group mb-24">
          <div className="relative aspect-[16/10] md:aspect-video overflow-hidden bg-zinc-950 editorial-shadow rounded-2xl">
            <div className="absolute inset-0">
              <img 
                key={currentService?.imageUrl}
                src={currentService?.imageUrl} 
                alt={currentService?.name}
                className="w-full h-full object-cover img-cinematic animate-in fade-in zoom-in-110 duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90"></div>
            </div>

            <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className={accentColor} size={12} fill="currentColor" />
                  <span className={cn("text-[9px] font-black uppercase tracking-[0.4em]", accentColor)}>Protocolo de Autor</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tighter uppercase leading-none">
                  {currentService?.name}
                </h3>
                <p className="text-zinc-400 text-sm font-light max-w-lg line-clamp-2">
                  {currentService?.description}
                </p>
              </div>
              <div className="text-right">
                <span className={cn("text-3xl md:text-5xl font-light italic", accentColor)}>{currentService?.price}</span>
                <div className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mt-2">Valor Sugerido</div>
              </div>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <button 
                onClick={() => rotate(-1)}
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto hover:bg-white hover:text-black transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => rotate(1)}
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto hover:bg-white hover:text-black transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: IDENTITY & COURTESY MENU */}
        <div className="magazine-grid gap-12 lg:gap-20">
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-[1px]", accentBg)}></div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground">Nuestra Identidad</h4>
            </div>
            <p className="text-2xl md:text-3xl font-headline font-bold italic leading-[1.3] text-foreground/80">
              "En GM Beauty House, entendemos el cabello como una estructura de diseño. No seguimos tendencias efímeras, construimos identidades visuales que perduran. Cada técnica es aplicada con precisión molecular bajo estándares internacionales."
            </p>
            <div className="pt-6">
               <AiAssistant 
                title="Estilista Creativo IA"
                placeholder="Ej: Busco un cambio de look para una boda..."
                onAsk={(input) => aiStylistRecommendations({ userQuery: input, concept })}
                isLightMode={false}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="bg-card/30 border border-border/40 p-10 md:p-12 rounded-3xl editorial-shadow space-y-10 h-full flex flex-col justify-center">
              <div className="space-y-2">
                <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Carta de Cortesía</h5>
                <p className="text-xs text-muted-foreground font-light italic">Complementa tu servicio con nuestra selección exclusiva.</p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {courtesyMenu.map((drink, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-default border-b border-border/20 pb-4 hover:border-primary transition-colors">
                    <div className="flex items-center gap-4">
                      <drink.icon size={16} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                      <span className="text-xs font-bold uppercase tracking-widest">{drink.name}</span>
                    </div>
                    <Star size={10} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 pt-4 text-center">
                * Servicio incluido para clientes VIP GM House.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
