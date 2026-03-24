
"use client"

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BoutiqueEditorProps {
  settings: any;
  setSettings: (s: any) => void;
}

export function BoutiqueEditor({ settings, setSettings }: BoutiqueEditorProps) {
  const update = (field: string, val: string) => setSettings({ ...settings, [field]: val });

  return (
    <div className="magazine-grid items-center gap-16 p-10 bg-background rounded-[3rem] border border-primary/10 shadow-xl animate-in fade-in duration-700">
      <div className="col-span-12 lg:col-span-5 space-y-4">
        <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-muted">
          <img src={settings.homeBoutiqueImage} className="w-full h-full object-cover" alt="Boutique Preview" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Vista Previa Editorial</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground ml-2">Imagen Editorial (URL)</label>
          <Input 
            value={settings.homeBoutiqueImage || ''} 
            onChange={e => update('homeBoutiqueImage', e.target.value)}
            className="rounded-xl h-12 bg-card"
          />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Subtítulo Boutique</label>
              <Input 
                value={settings.homeBoutiqueSubtitle || ''} 
                onChange={e => update('homeBoutiqueSubtitle', e.target.value)}
                className="font-black uppercase tracking-[0.3em] h-10 border-none p-0 focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground">Título Boutique</label>
            <Input 
              value={settings.homeBoutiqueTitle || ''} 
              onChange={e => update('homeBoutiqueTitle', e.target.value)}
              className="text-6xl md:text-8xl font-headline font-black leading-none tracking-tighter uppercase h-24 border-none p-0 focus-visible:ring-0"
            />
          </div>
          <div className="w-full">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground">Texto de Colección</label>
            <Textarea 
              value={settings.homeBoutiqueText || ''} 
              onChange={e => update('homeBoutiqueText', e.target.value)}
              className="text-xl text-muted-foreground font-light leading-relaxed border-none p-0 resize-none h-40 focus-visible:ring-0"
            />
          </div>
          <div className="pt-6 border-t border-border/10">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary block mb-2">URL Catálogo Digital (PDF)</label>
            <Input 
              value={settings.catalogUrl || ''} 
              onChange={e => update('catalogUrl', e.target.value)}
              placeholder="https://.../catalogo.pdf"
              className="rounded-xl h-12 bg-card border-primary/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
