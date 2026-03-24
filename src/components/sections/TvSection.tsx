
"use client"

import React, { useState, useEffect } from 'react';
import { Play, Music, Newspaper, Sparkles, Laugh, Construction, Shirt, Volume2, Maximize2, Pause } from 'lucide-react';
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
  const duration = 10000; 

  useEffect(() => {
    const mockPlaylist: TvContent[] = [
      { id: '1', category: 'house', title: 'GM Beauty House: The Concept', source: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200', description: 'Bienvenidos a la experiencia estética definitiva.' },
      { id: '2', category: 'music', title: 'Lounge Sessions: Deep House', source: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200', description: 'Curaduría musical para un ambiente exclusivo.' },
      { id: '3', category: 'fashion', title: 'Vogue: Fall Winter 2024', source: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200', description: 'Tendencias globales directamente en GM Boutique.' },
      { id: '4', category: 'construction', title: 'Modern Cuisines by Modulares GM', source: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200', description: 'Ingeniería y diseño en cada detalle.' },
      { id: '5', category: 'viral', title: 'TikTok Trends: Barbering Tricks', source: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200', description: 'Lo más viral del mundo del grooming.' },
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
          setPlaylist((cur) => {
            const next = [...cur.slice(1), cur[0]];
            setCurrentContent(next[0]);
            return next;
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

  if (!currentContent) return null;

  return (
    <div className="w-full min-h-screen bg-black pt-24 pb-12 overflow-hidden relative z-10">
      <div className="max-w-[1800px] mx-auto px-6 h-full flex flex-col gap-10">
        <header className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-10">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span><span className="text-[10px] font-black uppercase text-white">LIVE</span></span>
            <h2 className="text-2xl font-headline font-bold italic text-primary">GM TV Broadcast</h2>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <Pause size={18} /> : <Play size={18} />}</button>
            <Volume2 size={18} /><Maximize2 size={18} />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-9 relative group bg-zinc-950 overflow-hidden rounded-[2rem] border border-white/5">
            <div className="aspect-video relative overflow-hidden">
              <img key={currentContent.id} src={currentContent.source} className="w-full h-full object-cover [transition-duration:10s] group-hover:scale-100 scale-110" alt={currentContent.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-12 left-12 right-12 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="bg-primary text-background px-4 py-1 text-[10px] font-black uppercase rounded-sm">{currentContent.category}</span>
                  <Progress value={progress} className="h-[2px] bg-white/10 w-48" />
                </div>
                <h3 className="text-4xl md:text-8xl font-headline font-black text-white leading-none tracking-tighter">{currentContent.title}</h3>
                <p className="text-zinc-400 text-xl font-light max-w-2xl">{currentContent.description}</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase text-zinc-500">Up Next</h4>
            {playlist.slice(1, 4).map((item) => (
              <div key={item.id} className="group cursor-pointer flex gap-4 p-4 border border-white/5 hover:bg-white/5 transition-all rounded-2xl">
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl"><img src={item.source} className="w-full h-full object-cover grayscale group-hover:grayscale-0" alt={item.title} /></div>
                <div className="flex flex-col justify-between py-1">
                  <span className="text-[8px] font-bold text-primary uppercase">{item.category}</span>
                  <h5 className="text-sm font-bold text-zinc-300 leading-tight group-hover:text-white line-clamp-2">{item.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <button key={cat.id} className={cn("p-8 border border-white/10 flex flex-col items-center gap-4 transition-all rounded-2xl", currentContent.category === cat.id ? "bg-primary/10 border-primary" : "bg-zinc-900/50")}>
              <cat.icon size={24} className={currentContent.category === cat.id ? "text-primary" : "text-zinc-500"} />
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
