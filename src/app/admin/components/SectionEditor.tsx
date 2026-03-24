
"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface SectionEditorProps {
  title: string;
  prefix: string;
  description: string;
  settings: any;
  setSettings: (s: any) => void;
}

export function SectionEditor({ title, prefix, description, settings, setSettings }: SectionEditorProps) {
  return (
    <Card className="border-border rounded-3xl overflow-hidden shadow-sm bg-card mb-8">
      <CardHeader className="bg-primary/5 pb-6">
        <CardTitle className="font-headline italic text-xl">{title}</CardTitle>
        <CardDescription className="text-[9px] uppercase tracking-widest font-bold">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Título Editorial</label>
            <Input 
              value={settings[`${prefix}Title`] || ''} 
              onChange={e => setSettings({...settings, [`${prefix}Title`]: e.target.value})} 
              placeholder="Ej: GM House" 
              className="rounded-xl h-12"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subtítulo o Categoría</label>
            <Input 
              value={settings[`${prefix}Subtitle`] || ''} 
              onChange={e => setSettings({...settings, [`${prefix}Subtitle`]: e.target.value})} 
              placeholder="Ej: Definición de Estilo" 
              className="rounded-xl h-12"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Imagen URL</label>
          <Input 
            value={settings[`${prefix}Image`] || ''} 
            onChange={e => setSettings({...settings, [`${prefix}Image`]: e.target.value})} 
            className="rounded-xl h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Texto Narrativo</label>
          <Textarea 
            value={settings[`${prefix}Text`] || ''} 
            onChange={e => setSettings({...settings, [`${prefix}Text`]: e.target.value})} 
            className="rounded-xl min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
