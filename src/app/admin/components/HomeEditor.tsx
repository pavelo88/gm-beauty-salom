
"use client"

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface HomeEditorProps {
  settings: any;
  setSettings: (s: any) => void;
}

export function HomeEditor({ settings, setSettings }: HomeEditorProps) {
  const update = (field: string, val: string) => setSettings({ ...settings, [field]: val });

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Hero Mirror */}
      <Card className="relative h-[60vh] flex flex-col justify-center items-center overflow-hidden border-none rounded-[3rem] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img src={settings.heroImage} className="w-full h-full object-cover opacity-40" alt="Hero Preview" />
        </div>
        <div className="relative z-10 text-center space-y-6 w-full max-w-2xl px-6">
          <div className="space-y-2">
            <label className="text-[8px] font-black uppercase tracking-[0.5em] text-primary">Imagen de Portada (URL)</label>
            <Input 
              value={settings.heroImage || ''} 
              onChange={e => update('heroImage', e.target.value)}
              className="bg-background/50 border-primary/20 text-center h-10 rounded-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[8px] font-black uppercase tracking-[0.5em] text-white">Título Monumental</label>
            <Input 
              value={settings.heroTitle || ''} 
              onChange={e => update('heroTitle', e.target.value)}
              className="text-4xl md:text-6xl font-headline font-black uppercase bg-transparent border-none text-center h-20 text-white focus-visible:ring-0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[8px] font-black uppercase tracking-[0.5em] text-white/60">Subtítulo de Portada</label>
            <Textarea 
              value={settings.heroSubtitle || ''} 
              onChange={e => update('heroSubtitle', e.target.value)}
              className="text-center bg-transparent border-none text-white/80 font-medium tracking-widest uppercase resize-none h-20 focus-visible:ring-0"
            />
          </div>
        </div>
      </Card>

      {/* Manifesto Mirror */}
      <div className="bg-foreground text-background py-20 px-10 rounded-[3rem] text-center space-y-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <label className="text-[8px] font-black uppercase tracking-[0.5em] text-primary">Título del Manifiesto</label>
            <Textarea 
              value={settings.manifestoTitle || ''} 
              onChange={e => update('manifestoTitle', e.target.value)}
              className="text-2xl md:text-4xl font-headline italic bg-transparent border-none text-center resize-none h-32 text-background focus-visible:ring-0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[8px] font-black uppercase tracking-[0.5em] text-background/40">Texto del Manifiesto</label>
            <Textarea 
              value={settings.manifestoText || ''} 
              onChange={e => update('manifestoText', e.target.value)}
              className="text-xs uppercase tracking-widest font-light bg-transparent border-none text-center resize-none h-24 text-background/60 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
