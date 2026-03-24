
"use client"

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Instagram, Facebook, Mail } from 'lucide-react';

interface ContactEditorProps {
  settings: any;
  setSettings: (s: any) => void;
}

export function ContactEditor({ settings, setSettings }: ContactEditorProps) {
  const update = (field: string, val: string) => setSettings({ ...settings, [field]: val });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 bg-card rounded-[3rem] border shadow-xl animate-in fade-in duration-700">
      <div className="space-y-10">
        <h3 className="text-3xl font-headline font-bold italic border-b pb-4">Canales Oficiales</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-2">
              <Phone size={14} /> WhatsApp Business
            </label>
            <Input 
              value={settings.whatsappNumber || ''} 
              onChange={e => update('whatsappNumber', e.target.value)}
              placeholder="0987654321"
              className="h-12 rounded-xl bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-2">
              <Mail size={14} /> Email Corporativo
            </label>
            <Input 
              value={settings.email || ''} 
              onChange={e => update('email', e.target.value)}
              placeholder="contacto@gmbeautyhouse.com"
              className="h-12 rounded-xl bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-2">
              <Instagram size={14} /> Instagram URL
            </label>
            <Input 
              value={settings.instagramUrl || ''} 
              onChange={e => update('instagramUrl', e.target.value)}
              className="h-12 rounded-xl bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-2">
              <Facebook size={14} /> Facebook URL
            </label>
            <Input 
              value={settings.facebookUrl || ''} 
              onChange={e => update('facebookUrl', e.target.value)}
              className="h-12 rounded-xl bg-muted/30"
            />
          </div>
        </div>
      </div>
      <div className="space-y-10">
        <h3 className="text-3xl font-headline font-bold italic border-b pb-4">Ubicación Física</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-2">
              <MapPin size={14} /> Dirección Completa
            </label>
            <Textarea 
              value={settings.address || ''} 
              onChange={e => update('address', e.target.value)}
              className="min-h-[120px] rounded-2xl bg-muted/30 resize-none p-4"
            />
          </div>
          <div className="aspect-video rounded-3xl overflow-hidden bg-muted border border-dashed border-primary/20 flex flex-col items-center justify-center text-center p-8">
            <MapPin size={32} className="text-primary/20 mb-4" />
            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">La dirección se sincroniza con el botón de Google Maps en el sitio público.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
