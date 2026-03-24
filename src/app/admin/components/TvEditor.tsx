
"use client"

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface TvEditorProps {
  settings: any;
  setSettings: (s: any) => void;
}

export function TvEditor({ settings, setSettings }: TvEditorProps) {
  const update = (field: string, val: string) => setSettings({ ...settings, [field]: val });

  return (
    <div className="magazine-grid items-center gap-16 p-10 bg-black text-white rounded-[3.5rem] border border-white/10 shadow-2xl animate-in fade-in duration-700">
      <div className="col-span-12 lg:col-span-5 space-y-4">
        <div className="aspect-video rounded-[2rem] overflow-hidden shadow-2xl relative bg-zinc-900">
          <img src={settings.homeTvImage} className="w-full h-full object-cover" alt="TV Preview" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            <span className="text-[8px] font-black">BROADCAST LIVE</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-500 ml-2">Imagen de Portada TV (URL)</label>
          <Input 
            value={settings.homeTvImage || ''} 
            onChange={e => update('homeTvImage', e.target.value)}
            className="rounded-xl h-12 bg-zinc-900 border-zinc-800 text-white"
          />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Subtítulo Emisión</label>
              <Input 
                value={settings.homeTvSubtitle || ''} 
                onChange={e => update('homeTvSubtitle', e.target.value)}
                className="font-black uppercase tracking-[0.3em] h-10 border-none p-0 focus-visible:ring-0 bg-transparent text-primary"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-500">Título Canal</label>
            <Input 
              value={settings.homeTvTitle || ''} 
              onChange={e => update('homeTvTitle', e.target.value)}
              className="text-5xl md:text-7xl font-headline font-bold leading-none tracking-tighter uppercase h-20 border-none p-0 focus-visible:ring-0 bg-transparent text-white"
            />
          </div>
          <div className="w-full">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-500">Texto Programación</label>
            <Textarea 
              value={settings.homeTvText || ''} 
              onChange={e => update('homeTvText', e.target.value)}
              className="text-lg text-zinc-400 font-light leading-relaxed border-none p-0 resize-none h-32 focus-visible:ring-0 bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
