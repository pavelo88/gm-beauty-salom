"use client"

import React, { useState, useEffect } from 'react';
import { Tv, Play, Music, Newspaper, Sparkles, Laugh, Construction, Shirt, Volume2, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TvContent {
  id: string;
  category: 'music' | 'fashion' | 'viral' | 'construction' | 'house' | 'news';
  title: string;
  source: string;
  description: string;
}

export function TvSection({ dynamicData }: { dynamicData: any }) {
  const [currentContent, setCurrentContent] = useState<TvContent | null>(null);
  const [playlist, setPlaylist] = useState<TvContent[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Simulación de curaduría por IA cada hora
  useEffect(() => {
    const mockPlaylist: TvContent[] = [
      { id: '1', category: 'house', title: 'GM House: The Concept', source: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200', description: 'Bienvenidos a la experiencia estética definitiva.' },
      { id: '2', category: 'music', title: 'Lounge Sessions: Deep House', source: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200', description: 'Curaduría musical para un ambiente exclusivo.' },
      { id: '3', category: 'fashion', title: 'Vogue: Fall Winter 2024', source: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200', description: 'Tendencias globales directamente en GM Boutique.' },
      { id: '4', category: 'construction', title: 'Modern Cuisines by Modulares GM', source: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200', description: 'Ingeniería y diseño en cada detalle.' },
      { id: '5', category: 'viral', title: 'TikTok Trends: Barbering Tricks', source: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200', description: 'Lo más viral del mundo del grooming.' },
      { id: '6', category: 'news', title: 'Design Weekly: Quito Arq', source: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200', description: 'Noticias de arquitectura y diseño local.' }
    ];
    setPlaylist(mockPlaylist);
    setCurrentContent(mockPlaylist[0]);

    // Simulación de rotación cada hora (aquí cada 10 seg para demo)
    const interval = setInterval(() => {
      setPlaylist(prev => {
        const next = [...prev.slice(1), prev[0]];
        setCurrentContent(next[0]);
        return next;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: 'house', icon: Sparkles, label: 'House Promo' },
    { id: 'music', icon: Music, label: 'Lounge Audio' },
    { id: 'fashion', icon: Shirt, label: 'Fashion News' },
    { id: 'construction', icon: Construction, label: 'Atelier Design' },
    { id: 'viral', icon: Laugh, label: 'Viral Feed' },
    { id: 'news', icon: Newspaper, label: 'Daily Interest' },
  ];

  if (!currentContent) return null;

  return (
    <div className="w-full min-h-screen bg-black pt-40 pb-20 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-10 h-full flex flex-col gap-10">
        
        {/* Header Broadcast */}
        <div className="flex justify-between items-center border-b border-white/10 pb-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">LIVE BROADCAST</span>
            </div>
            <span className="text-zinc-600">|</span>
            <h2 className="text-2xl font-headline font-bold italic text-primary">GM TV: Entertainment Hub</h2>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sur de Quito, Ecuador</span>
            <div className="flex items-center gap-4 text-zinc-400">
              <Volume2 size={18} />
              <Maximize2 size={18} />
            </div>
          </div>
        </div>

        {/* Main Cinema View */}
        <div className="magazine-grid flex-grow gap-10">
          <div className="col-span-12 lg:col-span-9 relative group bg-zinc-900 overflow-hidden">
            {/* Main Content Area */}
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={currentContent.source} 
                className="w-full h-full object-cover transition-transform duration-[10s] scale-110 group-hover:scale-100" 
                alt={currentContent.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              
              {/* Overlay Info */}
              <div className="absolute bottom-16 left-16 right-16 space-y-6">
                <span className="bg-primary text-background px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                  {currentContent.category.toUpperCase()}
                </span>
                <h3 className="text-6xl md:text-8xl font-headline font-black text-white leading-none tracking-tighter">
                  {currentContent.title}
                </h3>
                <p className="text-zinc-400 text-xl font-light max-w-2xl">
                  {currentContent.description}
                </p>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-24 h-24 rounded-full border border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                  <Play size={40} className="text-white ml-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Playlist */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 overflow-y-auto no-scrollbar max-h-[70vh]">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">Up Next</h4>
            {playlist.slice(1).map((item) => (
              <div 
                key={item.id} 
                className="group cursor-pointer flex gap-4 p-4 border border-white/5 hover:bg-white/5 transition-all"
                onClick={() => setCurrentContent(item)}
              >
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                  <img src={item.source} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <span className="text-[8px] font-bold text-primary uppercase tracking-widest">{item.category}</span>
                  <h5 className="text-sm font-bold text-zinc-300 leading-tight group-hover:text-white">{item.title}</h5>
                  <div className="flex items-center gap-2 text-zinc-600 text-[8px] uppercase font-black">
                    <Play size={8} /> 2:45
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-10">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              className={cn(
                "p-8 border border-white/10 flex flex-col items-center gap-4 transition-all hover:border-primary group",
                currentContent.category === cat.id ? "bg-primary/10 border-primary" : "bg-zinc-900/50"
              )}
            >
              <cat.icon size={24} className={cn(
                "transition-colors",
                currentContent.category === cat.id ? "text-primary" : "text-zinc-500 group-hover:text-white"
              )} />
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest",
                currentContent.category === cat.id ? "text-primary" : "text-zinc-600 group-hover:text-zinc-300"
              )}>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Marquee Ticker */}
        <div className="w-full mt-10 bg-primary/5 border border-primary/20 p-4 overflow-hidden relative">
          <div className="flex animate-marquee whitespace-nowrap gap-20">
            {[1,2,3].map((_, idx) => (
              <p key={idx} className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">
                • MODULARES GM: DISEÑO DE INTERIORES • GM SALON: BALAYAGE PREMIUM • GM BARBER: CORTES DE AUTOR • BOUTIQUE: NUEVA COLECCIÓN FALL/WINTER 2024 • LOUNGE & RESTO: PRUEBA NUESTRO MENÚ DE AUTOR • 
              </p>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}