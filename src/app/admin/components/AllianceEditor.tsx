
"use client"

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface AllianceEditorProps {
  settings: any;
  setSettings: (s: any) => void;
}

export function AllianceEditor({ settings, setSettings }: AllianceEditorProps) {
  const update = (field: string, val: string) => setSettings({ ...settings, [field]: val });

  return (
    <div className="magazine-grid items-center gap-16 p-10 bg-card rounded-[3rem] border shadow-xl animate-in fade-in duration-700">
      <div className="col-span-12 lg:col-span-7 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Subtítulo Modulares</label>
              <Input 
                value={settings.homeAllianceSubtitle || ''} 
                onChange={e => update('homeAllianceSubtitle', e.target.value)}
                className="font-black uppercase tracking-[0.3em] h-10 border-none p-0 focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground">Título Interiorismo</label>
            <Input 
              value={settings.homeAllianceTitle || ''} 
              onChange={e => update('homeAllianceTitle', e.target.value)}
              className="text-5xl md:text-7xl font-headline font-bold leading-none tracking-tighter uppercase h-20 border-none p-0 focus-visible:ring-0"
            />
          </div>
          <div className="w-full">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground">Texto Descriptivo</label>
            <Textarea 
              value={settings.homeAllianceText || ''} 
              onChange={e => update('homeAllianceText', e.target.value)}
              className="text-lg text-muted-foreground font-light leading-relaxed border-none p-0 resize-none h-32 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 space-y-4">
        <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-muted">
          <img src={settings.homeAllianceImage} className="w-full h-full object-cover grayscale" alt="Alliance Preview" />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground ml-2">Imagen de Proyecto (URL)</label>
          <Input 
            value={settings.homeAllianceImage || ''} 
            onChange={e => update('homeAllianceImage', e.target.value)}
            className="rounded-xl h-12 bg-muted/30"
          />
        </div>
      </div>
    </div>
  );
}
