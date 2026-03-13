
"use client"

import React, { useState, useEffect } from 'react';
import { Play, Music, Newspaper, Sparkles, Laugh, Construction, Shirt, Volume2, Maximize2, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

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
  const [progress, setProgress] = useState(0);
  const [duration] = useState(10000); // 10 seconds per "video" simulation

  useEffect(() => {
    const mockPlaylist: TvContent[] = [
      { id: '1', category: 'house', title: 'GM Beauty House: The Concept', source: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200', description: 'Bienvenidos a la experiencia estética definitiva.' },
      { id: '2', category: 'music', title: 'Lounge Sessions: Deep House', source: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200', description: 'Curaduría musical para un ambiente exclusivo.' },
      { id: '3', category: 'fashion', title: 'Vogue: Fall Winter 2024', source: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200', description: 'Tendencias globales directamente en GM Boutique.' },
      { id: '4', category: 'construction', title: 'Modern Cuisines by Modulares GM', source: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200', description: 'Ingeniería y diseño en cada detalle.' },
      { id: '5', category: 'viral', title: 'TikTok Trends: Barbering Tricks', source: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200', description: 'Lo más viral del mundo del grooming.' },
      { id: '6', category: 'news', title: 'Design Weekly: Quito Arq', source: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200', description: 'Noticias de arquitectura y diseño local.' }
    ];
    setPlaylist(mockPlaylist);
    setCurrentContent(mockPlaylist[0]);
  }, []);

  useEffect(() => {
    if (!isPlaying || !playlist.length) return;

    const intervalTime = 100;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setPlaylist((currentPlaylist) => {
            const nextPlaylist = [...currentPlaylist.slice(1), currentPlaylist[0]];
            setCurrentContent(nextPlaylist[0]);
            return nextPlaylist;
          });
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, playlist, duration]);

  const categories = [
    { id: 'house', icon: Sparkles, label: 'House Promo' },
    { id: 'music', icon: Music, label: 'Lounge Audio' },
    { id: 'fashion', icon: Shirt, label: 'Fashion News' },
    { id: 'construction', icon: Construction, label: 'Atelier Design' },
    { id: 'viral', icon: Laugh, label: 'Viral Feed' },
    { id: 'news', icon: Newspaper, label: 'Daily Interest' },
  ];

  const handleManualChange = (item: TvContent) => {
    setCurrentContent(item);
    setProgress(0);
    const index = playlist.findIndex(p => p.id === item.id);
    if (index !== -1) {
      const newPlaylist = [...playlist.slice(index), ...playlist.slice(0, index)];
      setPlaylist(newPlaylist);
    }
  };

  if (!currentContent) return null;

  return (
    <div className="w-full min-h-screen bg-black pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden relative z-10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 h-full flex flex-col gap-6 md:gap-10">
        
        {/* Header Broadcast */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 md:pb-10 gap-4">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 md:w-3 h-2 md:h-3 bg-red-600 rounded-full animate-pulse"></span>
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white">LIVE BROADCAST</span>
            </div>
            <span className="text-zinc-600 hidden md:inline">|</span>
            <h2 className="text-xl md:text-2xl font-headline font-bold italic text-primary">GM TV: Entertainment Hub</h2>
          </div>
          <div className="flex items-center justify-between w-full md:w-auto md:gap-8">
            <span className="text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sur de Quito, Ecuador</span>
            <div className="flex items-center gap-4 text-zinc-400">
              <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <Volume2 size={18} className="hidden md:block" />
              <Maximize2 size={18} className="hidden md:block" />
            </div>
          </div>
        </div>

        {/* Main Cinema View */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 lg:col-span-9 relative group bg-zinc-950 overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/5 shadow-2xl">
            <div className="aspect-video relative overflow-hidden">
              <img 
                key={currentContent.id}
                src={currentContent.source} 
                className="w-full h-full object-cover transition-transform duration-[10000ms] scale-110 group-hover:scale-100 animate-in fade-in zoom-in-105 duration-1000" 
                alt={currentContent.title}
              />
              <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
              
              {/* Overlay Info */}
              <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 space-y-4 md:space-y-6">
                <div className="flex items-center gap-4">
                  <span className="bg-primary text-background px-3 md:px-4 py-1 text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-sm">
                    {currentContent.category.toUpperCase()}
                  </span>
                  <div className="flex-grow max-w-[100px] md:max-w-xs">
                    <Progress value={progress} className="h-[2px] bg-white/10" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-6xl lg:text-8xl font-headline font-black text-white leading-none tracking-tighter">
                  {currentContent.title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-xl font-light max-w-2xl line-clamp-2 md:line-clamp-none">
                  {currentContent.description}
                </p>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-sm hover:scale-110 transition-transform"
                >
                  {isPlaying ? <Pause size={32} className="text-white md:size-10" /> : <Play size={32} className="text-white ml-1 md:size-10" />}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Playlist - Horizontal on Mobile, Vertical on Desktop */}
          <div className="col-span-12 lg:col-span-3 flex flex-row lg:flex-col gap-4 md:gap-6 overflow-x-auto lg:overflow-y-auto no-scrollbar pb-4 lg:pb-0 lg:max-h-[70vh]">
            <h4 className="hidden lg:block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">Up Next</h4>
            {playlist.slice(1).map((item) => (
              <div 
                key={item.id} 
                className="group cursor-pointer flex flex-col sm:flex-row gap-3 md:gap-4 p-3 md:p-4 border border-white/5 hover:bg-white/5 transition-all rounded-xl md:rounded-2xl min-w-[200px] sm:min-w-0"
                onClick={() => handleManualChange(item)}
              >
                <div className="w-full sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg md:rounded-xl">
                  <img src={item.source} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={item.title} />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <span className="text-[8px] font-bold text-primary uppercase tracking-widest">{item.category}</span>
                  <h5 className="text-xs md:text-sm font-bold text-zinc-300 leading-tight group-hover:text-white transition-colors line-clamp-2">{item.title}</h5>
                  <div className="flex items-center gap-2 text-zinc-600 text-[8px] uppercase font-black">
                    <Play size={8} /> 2:45
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Bar - Horizontal Scroll on Mobile */}
        <div className="flex md:grid md:grid-cols-6 gap-4 md:gap-6 mt-4 md:mt-10 overflow-x-auto no-scrollbar pb-4 md:pb-0">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => {
                const item = playlist.find(p => p.category === cat.id);
                if (item) handleManualChange(item);
              }}
              className={cn(
                "p-6 md:p-8 border border-white/10 flex flex-col items-center gap-3 md:gap-4 transition-all hover:border-primary group rounded-xl md:rounded-2xl min-w-[120px] md:min-w-0",
                currentContent.category === cat.id ? "bg-primary/10 border-primary" : "bg-zinc-900/50"
              )}
            >
              <cat.icon size={20} className={cn(
                "transition-colors md:size-6",
                currentContent.category === cat.id ? "text-primary" : "text-zinc-500 group-hover:text-white"
              )} />
              <span className={cn(
                "text-[8px] md:text-[9px] font-black uppercase tracking-widest text-center",
                currentContent.category === cat.id ? "text-primary" : "text-zinc-600 group-hover:text-zinc-300"
              )}>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Marquee Ticker */}
        <div className="w-full mt-6 md:mt-10 bg-primary/5 border border-primary/20 p-3 md:p-4 overflow-hidden relative rounded-full">
          <div className="flex animate-marquee whitespace-nowrap gap-10 md:gap-20">
            {[1,2,3].map((_, idx) => (
              <p key={idx} className="text-[8px] md:text-[10px] font-bold text-primary uppercase tracking-[0.4em]">
                • MODULARES GM: DISEÑO DE INTERIORES • GM SALON: BALAYAGE PREMIUM • GM BARBER: CORTES DE AUTOR • BOUTIQUE: NUEVA COLECCIÓN FALL/WINTER 2024 • LOUNGE & RESTO: PRUEBA NUESTRO MENÚ DE AUTOR • LIVE FROM QUITO • 
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
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
