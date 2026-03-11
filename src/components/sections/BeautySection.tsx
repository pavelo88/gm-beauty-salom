"use client"

import React, { useState } from 'react';
import { Scissors, Sparkles } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiStylistRecommendations } from '@/ai/flows/ai-stylist-recommendations';
import { cn } from '@/lib/utils';

export function BeautySection({ dynamicData }: { dynamicData: any }) {
  const [concept, setConcept] = useState<'salon' | 'barberia'>('salon');
  const isBarber = concept === 'barberia';

  const baseBarberServices = [
    { name: 'Corte Ejecutivo & Fade', price: '$15', description: 'Incluye lavado y peinado.' },
    { name: 'Barba Spa & Toalla', price: '$10', description: 'Perfilado, vapor y aceites.' },
    { name: 'Pigmentación HD', price: '$12', description: 'Cejas y barba definidas.' },
    { name: 'Limpieza Facial Express', price: '$18', description: 'Mascarilla negra y exfoliación.' },
  ];
  const baseSalonServices = [
    { name: 'Balayage / Baby Lights', price: 'Desde $60', description: 'Incluye matizante y peinado.' },
    { name: 'Keratina Orgánica', price: 'Desde $45', description: 'Alisado espejo sin formol.' },
    { name: 'Uñas Acrílicas / Gel', price: '$25', description: 'Diseño a mano alzada.' },
    { name: 'Manicura Spa', price: '$15', description: 'Exfoliación e hidratación.' },
  ];

  const currentDynamic = dynamicData.services.filter((s: any) => s.category === concept);
  const displayServices = [...(isBarber ? baseBarberServices : baseSalonServices), ...currentDynamic];

  return (
    <div className={cn(
      "transition-all duration-1000 w-full min-h-screen py-20 px-4 sm:px-6 lg:px-8",
      isBarber ? "bg-background" : "bg-white"
    )}>
      <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700">
        
        <div className="flex justify-center">
          <div className={cn(
            "p-1.5 flex rounded-full border backdrop-blur-sm transition-all shadow-xl",
            isBarber ? "bg-black/50 border-primary/30" : "bg-white border-accent/30"
          )}>
            <button 
              onClick={() => setConcept('salon')}
              className={cn(
                "px-10 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-500",
                !isBarber ? "bg-rose-gold text-white shadow-lg" : "text-zinc-500 hover:text-zinc-800"
              )}
            >
              Salón de Belleza
            </button>
            <button 
              onClick={() => setConcept('barberia')}
              className={cn(
                "px-10 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-500",
                isBarber ? "bg-gold-vibrant text-black shadow-lg shadow-primary/20" : "text-zinc-500 hover:text-accent"
              )}
            >
              Barbería VIP
            </button>
          </div>
        </div>

        <AiAssistant 
          title="Estilista Virtual AI ✨"
          placeholder="Ej: Tengo una graduación en la mañana, ¿qué estilo me recomiendas?"
          onAsk={(input) => aiStylistRecommendations({ userQuery: input, concept })}
          isLightMode={!isBarber}
        />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className={cn(
            "text-5xl md:text-7xl font-headline font-bold transition-all duration-500",
            isBarber ? "text-white" : "text-zinc-900"
          )}>
            {isBarber ? 'Grooming & Poder' : 'Estilo & Elegancia'}
          </h2>
          <p className={cn(
            "text-xl font-light transition-all duration-500",
            isBarber ? "text-zinc-400" : "text-zinc-600"
          )}>
            {isBarber 
              ? 'Ambiente diseñado para el caballero moderno. Fades impecables y cuidado de barba.' 
              : 'Un santuario de belleza inspirado en tendencias globales. Expertos en colorimetría y uñas spa.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className={cn(
            "lg:col-span-5 h-[600px] rounded-[2.5rem] border overflow-hidden relative group transition-all duration-500",
            isBarber ? "border-zinc-800 shadow-2xl" : "border-accent/10 shadow-xl"
          )}>
             <img 
               src={isBarber 
                 ? "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800" 
                 : "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800"} 
               alt="Concept" 
               className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
             />
             <div className={cn(
               "absolute inset-0 bg-gradient-to-t to-transparent opacity-80",
               isBarber ? "from-black" : "from-white"
             )}></div>
             <div className="absolute bottom-12 left-12 right-12">
                <h3 className={cn(
                  "text-4xl font-headline font-bold",
                  isBarber ? "text-white" : "text-zinc-900"
                )}>
                  {isBarber ? 'Cortes Premium' : 'Color & Cuidado'}
                </h3>
                <div className={cn(
                  "h-1.5 w-20 mt-4 rounded-full",
                  isBarber ? "bg-gold-vibrant" : "bg-rose-gold"
                )}></div>
             </div>
          </div>

          <div className={cn(
            "lg:col-span-7 p-10 md:p-14 rounded-[2.5rem] border transition-all duration-1000",
            isBarber ? "bg-card border-zinc-800 shadow-2xl" : "bg-white border-accent/20 shadow-xl"
          )}>
            <h3 className={cn(
              "text-3xl font-headline font-bold mb-10 uppercase tracking-widest",
              isBarber ? "text-primary" : "text-accent"
            )}>Menú de Servicios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {displayServices.map((s: any, i) => (
                <div key={i} className={cn(
                  "border-b pb-6 transition-all group hover:translate-x-1",
                  isBarber ? "border-zinc-800" : "border-zinc-100"
                )}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className={cn("text-lg font-bold", isBarber ? "text-white" : "text-zinc-800")}>{s.name}</h4>
                    <span className={cn("font-bold text-lg", isBarber ? "text-primary" : "text-accent")}>{s.price}</span>
                  </div>
                  <p className={cn("text-sm leading-relaxed", isBarber ? "text-zinc-400" : "text-zinc-500")}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
