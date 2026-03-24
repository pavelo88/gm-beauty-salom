
"use client"

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LoungeEditorProps {
  settings: any;
  setSettings: (s: any) => void;
}

export function LoungeEditor({ settings, setSettings }: LoungeEditorProps) {
  const update = (field: string, val: string) => setSettings({ ...settings, [field]: val });

  return (
    <div className="magazine-grid items-center gap-16 p-10 bg-card rounded-[3rem] border shadow-xl animate-in fade-in duration-700">
      <div className="col-span-12 lg:col-span-7 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Subtítulo Lounge</label>
              <Input 
                value={settings.homeLoungeSubtitle || ''} 
                onChange={e => update('homeLoungeSubtitle', e.target.value)}
                className="font-black uppercase tracking-[0.3em] h-10 border-none p-0 focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground">Título Lounge & Resto</label>
            <Input 
              value={settings.homeLoungeTitle || ''} 
              onChange={e => update('homeLoungeTitle', e.target.value)}
              className="text-5xl md:text-7xl font-headline font-bold leading-none tracking-tighter uppercase h-20 border-none p-0 focus-visible:ring-0"
            />
          </div>
          <div className="w-full">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground">Texto Descriptivo Lounge</label>
            <Textarea 
              value={settings.homeLoungeText || ''} 
              onChange={update('homeLoungeText', settings.homeLoungeText)} // Placeholder logic
              className="text-lg text-muted-foreground font-light leading-relaxed border-none p-0 resize-none h-32 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 space-y-4">
        <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-muted">
          <img src={settings.homeLoungeImage} className="w-full h-full object-cover" alt="Lounge Preview" />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground ml-2">Imagen de Fondo Lounge (URL)</label>
          <Input 
            value={settings.homeLoungeImage || ''} 
            onChange={e => update('homeLoungeImage', e.target.value)}
            className="rounded-xl h-12 bg-muted/30"
          />
        </div>
      </div>
    </div>
  );
}
