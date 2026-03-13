
"use client"

import React, { useState, useMemo } from 'react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiStylistRecommendations } from '@/ai/flows/ai-stylist-recommendations';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export function BeautySection({ dynamicData }: { dynamicData: any }) {
  const [concept, setConcept] = useState<'salon' | 'barberia'>('salon');
  const [activeIdx, setActiveIdx] = useState(0);
  const isBarber = concept === 'barberia';

  const defaultServices = {
    salon: [
      { name: 'Balayage Editorial', price: 'Cotizar', description: 'Técnica de color personalizada para un brillo natural y multidimensional.', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800' },
      { name: 'Corte de Autor', price: '$25.00', description: 'Diseño estructural basado en la morfología de tu rostro.', imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800' },
      { name: 'Hidratación Molecular', price: '$45.00', description: 'Tratamiento profundo para restaurar la fibra capilar desde el núcleo.', imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800' }
    ],
    barberia: [
      { name: 'Corte Ejecutivo', price: '$20.00', description: 'Precisión milimétrica y acabado clásico para el caballero moderno.', imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800' },
      { name: 'Ritual de Barba', price: '$15.00', description: 'Afeitado tradicional con toallas calientes y aceites esenciales.', imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d6d4e59?auto=format&fit=crop&q=80&w=800' },
      { name: 'Corte & Skin Fade', price: '$22.00', description: 'Degradados de alta complejidad con terminaciones en navaja.', imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800' }
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

  return (
    <div className={cn(
      "w-full pt-32 pb-20 transition-colors duration-1000",
      isBarber ? "bg-black/20" : "bg-transparent"
    )}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        
        {/* Toggle Editorial */}
        <div className="flex justify-center mb-24">
          <div className="border border-border/30 p-1 flex items-center bg-card/20 backdrop-blur-md rounded-full overflow-hidden shadow-2xl">
            <button 
              onClick={() => { setConcept('salon'); setActiveIdx(0); }}
              className={cn(
                "px-10 py-3 text-[9px] font-black uppercase tracking-[0.4em] transition-all rounded-full",
                !isBarber ? "bg-foreground text-background shadow-lg" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Le Salon
            </button>
            <button 
              onClick={() => { setConcept('barberia'); setActiveIdx(0); }}
              className={cn(
                "px-10 py-3 text-[9px] font-black uppercase tracking-[0.4em] transition-all rounded-full",
                isBarber ? "bg-primary text-black shadow-lg" : "text-muted-foreground hover:text-primary"
              )}
            >
              Barber Shop
            </button>
          </div>
        </div>

        <div className="magazine-grid items-start gap-12 lg:gap-20 mb-32">
          {/* Header & IA Left */}
          <div className="col-span-12 lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Edición No. 01</span>
              <h2 className="text-6xl md:text-7xl lg:text-[8rem] font-headline font-bold italic leading-[0.8] tracking-tighter">
                {isBarber ? 'Grooming' : 'Estética'} <br/> 
                <span className="not-italic opacity-30">Archive</span>
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-sm italic border-l-2 border-primary pl-6 py-2">
                {isBarber 
                  ? "Cortes de autor y barbería tradicional en el corazón del Sur de Quito." 
                  : "Curaduría técnica en color editorial y cuidado capilar avanzado."}
              </p>
            </div>

            <AiAssistant 
              title="Estilista Creativo IA"
              placeholder="Ej: Busco un cambio de look para una boda..."
              onAsk={(input) => aiStylistRecommendations({ userQuery: input, concept })}
              isLightMode={false}
            />

            {/* Narrative Identity */}
            <div className="hidden lg:block space-y-8 pt-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-border"></div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">Nuestra Identidad</h4>
              </div>
              <p className="text-sm font-light text-muted-foreground leading-loose">
                En GM Beauty House, entendemos el cabello como una estructura de diseño. No seguimos tendencias efímeras, construimos identidades visuales que perduran. Cada técnica es aplicada con precisión molecular bajo estándares internacionales.
              </p>
            </div>
          </div>

          {/* 3D Showcase Right */}
          <div className="col-span-12 lg:col-span-7 relative group">
            <div className="relative aspect-[4/5] md:aspect-video lg:aspect-[16/10] overflow-hidden bg-zinc-950 editorial-shadow rounded-2xl group">
              {/* Main Service Image */}
              <div className="absolute inset-0">
                <img 
                  key={currentService?.imageUrl}
                  src={currentService?.imageUrl} 
                  alt={currentService?.name}
                  className="w-full h-full object-cover img-cinematic animate-in fade-in zoom-in-110 duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
              </div>

              {/* Service Info Overlay */}
              <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Star className="text-primary" size={12} fill="currentColor" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Servicio Seleccionado</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tighter uppercase leading-none">
                    {currentService?.name}
                  </h3>
                  <p className="text-zinc-400 text-sm font-light max-w-md line-clamp-2">
                    {currentService?.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl md:text-5xl font-light italic text-primary">{currentService?.price}</span>
                  <div className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mt-2">Valor Editorial</div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                <button 
                  onClick={(e) => { e.stopPropagation(); rotate(-1); }}
                  className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto hover:bg-primary hover:text-black transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); rotate(1); }}
                  className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto hover:bg-primary hover:text-black transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Carousel Thumbnails / Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {services.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    "h-1 transition-all duration-500",
                    activeIdx === i ? "w-12 bg-primary" : "w-4 bg-border/40 hover:bg-border"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="pt-20 border-t border-border/30">
          <div className="flex flex-col items-center gap-10">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground">Marcas en Excelencia</span>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
              <span className="text-xs md:text-lg font-black tracking-tighter uppercase">L'Oréal Professionnel</span>
              <span className="text-xs md:text-lg font-black tracking-tighter uppercase">Kérastase</span>
              <span className="text-xs md:text-lg font-black tracking-tighter uppercase">Dyson Pro</span>
              <span className="text-xs md:text-lg font-black tracking-tighter uppercase">Wahl Elite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
