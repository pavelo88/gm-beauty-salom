"use client"

import React, { useState, useEffect } from 'react';
import { BookOpen, Crown, Shirt, Gem, ChevronLeft, ChevronRight } from 'lucide-react';
import { AiAssistant } from '@/components/AiAssistant';
import { aiPersonalShopperSuggestions } from '@/ai/flows/ai-personal-shopper-suggestions';
import { cn } from '@/lib/utils';

export function BoutiqueSection({ dynamicData }: { dynamicData: any }) {
  const [activeCategory, setActiveCategory] = useState<'mujer' | 'hombre' | 'perfumes'>('mujer');
  const [currentPage, setCurrentPage] = useState(0);

  const catalogData: any = {
    mujer: [
      {
        title: 'Colección Gala', desc: 'Vestidos de noche y accesorios para destacar.', img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800',
        products: [
          { name: 'Vestido Seda Esmeralda', price: '$120', type: 'Prenda' },
          { name: 'Zapatos Stiletto Nude', price: '$65', type: 'Calzado' },
          { name: 'Bolso Clutch Dorado', price: '$45', type: 'Accesorio' },
          { name: 'Set Joyería Rose Gold', price: '$85', type: 'Joyería' }
        ]
      },
      {
        title: 'Urban Chic', desc: 'Outfits modernos para el día a día con estilo.', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
        products: [
          { name: 'Blusa Satén Blanca', price: '$40', type: 'Prenda' },
          { name: 'Pantalón Palazzo Negro', price: '$55', type: 'Prenda' },
          { name: 'Gafas de Sol Cat-Eye', price: '$30', type: 'Accesorio' },
          { name: 'Cinturón Cuero Fino', price: '$25', type: 'Accesorio' }
        ]
      }
    ],
    hombre: [
      {
        title: 'Sastrería Moderna', desc: 'Cortes fit, telas premium. El poder de un buen traje.', img: 'https://images.unsplash.com/photo-1594938298596-70f56fb3cecb?auto=format&fit=crop&q=80&w=800',
        products: [
          { name: 'Traje Slim Fit Navy', price: '$180', type: 'Prenda' },
          { name: 'Camisa Algodón Egipcio', price: '$45', type: 'Prenda' },
          { name: 'Corbata Seda Italiana', price: '$30', type: 'Accesorio' },
          { name: 'Zapatos Oxford Cuero', price: '$90', type: 'Calzado' }
        ]
      }
    ],
    perfumes: [
      {
        title: 'Esencias Árabes', desc: 'Fragancias exóticas, intensas y duraderas.', img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
        products: [
          { name: 'Lattafa Asad', price: '$55', type: 'Perfume' },
          { name: 'Club de Nuit Intense', price: '$65', type: 'Perfume' },
          { name: 'Yara Pink', price: '$50', type: 'Perfume' },
          { name: 'Khamrah Qahwa', price: '$70', type: 'Perfume' }
        ]
      }
    ]
  };

  const dynProducts = dynamicData.products.filter((p: any) => p.category === activeCategory);
  let currentPages = [...(catalogData[activeCategory] || [])];
  
  if (dynProducts.length > 0) {
    currentPages.push({
      title: 'Novedades', desc: 'Lo último añadido a nuestra colección exclusiva.', img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80',
      products: dynProducts.map((p: any) => ({ name: p.name, price: p.price, type: 'Nuevo' }))
    });
  }

  useEffect(() => { setCurrentPage(0); }, [activeCategory]);
  const next = () => setCurrentPage(p => (p + 1) % currentPages.length);
  const prev = () => setCurrentPage(p => (p - 1 + currentPages.length) % currentPages.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12 animate-in slide-in-from-bottom-8 duration-700">
      
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary">
             <BookOpen size={32} />
             <span className="text-xs font-black uppercase tracking-[0.3em]">Editorial Volume II</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-bold text-white">Boutique Editorial</h2>
        </div>
        
        <div className="flex bg-card p-2 rounded-full border border-border shadow-2xl">
          {[
            { id: 'mujer', icon: Crown, label: 'Mujer' },
            { id: 'hombre', icon: Shirt, label: 'Hombre' },
            { id: 'perfumes', icon: Gem, label: 'Perfumes' }
          ].map(cat => (
             <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={cn(
                  "flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 uppercase tracking-widest",
                  activeCategory === cat.id 
                    ? "bg-gold-vibrant text-black shadow-lg shadow-primary/20" 
                    : "text-zinc-500 hover:text-white"
                )}
             >
               <cat.icon size={18} />
               <span>{cat.label}</span>
             </button>
          ))}
        </div>
      </div>

      <AiAssistant 
        title="Personal Shopper AI ✨"
        placeholder={`Ej: Necesito un outfit / perfume (${activeCategory}) para una cena de negocios.`}
        onAsk={(input) => aiPersonalShopperSuggestions({ userPrompt: input, category: activeCategory })}
      />

      <div className="relative w-full h-[800px] md:h-[650px] bg-card border border-primary/20 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="flex h-full transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
          {currentPages.map((page: any, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-background">
                <div className="space-y-8">
                  <div className="inline-block px-5 py-2 bg-primary/10 border border-primary/30 text-primary text-xs font-black tracking-widest uppercase rounded-full">
                    Página {idx + 1} • {activeCategory.toUpperCase()}
                  </div>
                  <h2 className="text-5xl md:text-6xl font-headline font-bold text-white leading-none">{page.title}</h2>
                  <p className="text-zinc-400 text-xl font-light border-b border-border pb-8">{page.desc}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    {page.products.map((prod: any, pIdx: number) => (
                      <div key={pIdx} className="bg-card border border-border p-5 rounded-2xl hover:border-primary/50 transition-all group cursor-pointer">
                        <span className="text-[10px] text-primary font-black uppercase tracking-wider">{prod.type}</span>
                        <h4 className="text-white font-bold text-lg mt-1 group-hover:text-primary transition-colors">{prod.name}</h4>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-primary font-bold text-xl">{prod.price}</span>
                          <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                            <ChevronRight size={16} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
                <img src={page.img} alt={page.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background md:from-transparent to-transparent opacity-60"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-12 right-12 flex space-x-4 z-20">
          <button onClick={prev} className="p-4 bg-black/40 backdrop-blur-xl border border-primary/50 rounded-full text-primary hover:bg-gold-vibrant hover:text-black transition-all shadow-xl">
            <ChevronLeft size={28} />
          </button>
          <button onClick={next} className="p-4 bg-black/40 backdrop-blur-xl border border-primary/50 rounded-full text-primary hover:bg-gold-vibrant hover:text-black transition-all shadow-xl">
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-3 mt-8">
        {currentPages.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentPage(idx)} 
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              currentPage === idx ? "w-12 bg-primary shadow-lg shadow-primary/20" : "w-3 bg-zinc-800"
            )} 
          />
        ))}
      </div>
    </div>
  );
}
