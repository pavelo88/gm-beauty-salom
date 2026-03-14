
"use client"

import React from 'react';
import { MapPin, Phone, Send, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection({ settings }: { settings: any }) {
  const whatsappNumber = settings?.whatsappNumber || "0987654321";
  const address = settings?.address || "Rosa Yeira 420 y Serapio Japeravi, Quito, Ecuador";
  const displayPhone = whatsappNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

  return (
    <div className="w-full pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 space-y-16">
        
        <header className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-primary">Información Oficial</span>
            <h2 className="text-editorial-title">
              CONTACTO <span className="text-gold-gradient italic">DIRECTO</span>
            </h2>
          </div>
          <p className="text-[10px] text-muted-foreground font-light uppercase tracking-widest italic max-w-xs border-l border-primary pl-6">
            "La exclusividad comienza con una conversación. Visítanos en el Sur de Quito para una experiencia de autor."
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Formulario Editorial */}
          <div className="bg-card border border-border p-10 md:p-12 rounded-[2.5rem] editorial-shadow space-y-8">
            <h3 className="text-3xl font-headline font-bold italic tracking-tighter">Envíanos un Mensaje</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nombre</label>
                  <Input className="bg-background border-border h-12 text-xs rounded-xl focus:ring-primary" placeholder="Tu nombre completo" />
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground ml-1">Teléfono</label>
                  <Input className="bg-background border-border h-12 text-xs rounded-xl focus:ring-primary" placeholder="098..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground ml-1">Mensaje</label>
                <Textarea className="bg-background border-border min-h-[120px] text-xs resize-none rounded-xl focus:ring-primary" placeholder="¿Cómo podemos ayudarte?" />
              </div>
              <Button className="w-full h-14 bg-foreground text-background font-black uppercase tracking-[0.4em] text-[10px] rounded-xl hover:bg-primary transition-all">
                Enviar Mensaje <Send size={14} className="ml-3" />
              </Button>
            </form>
          </div>

          {/* Datos y Mapa */}
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary">
                  <Phone size={16} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Llámanos</span>
                </div>
                <a href={`tel:${whatsappNumber}`} className="block text-2xl font-headline font-bold hover:text-primary transition-colors">{displayPhone}</a>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary">
                  <MessageCircle size={16} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Canales Digitales</span>
                </div>
                <div className="flex gap-4">
                  <a href={settings?.instagramUrl} target="_blank" className="p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all"><Instagram size={18}/></a>
                  <a href={settings?.facebookUrl} target="_blank" className="p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all"><Facebook size={18}/></a>
                  <a href={`https://wa.me/593${whatsappNumber.substring(1)}`} target="_blank" className="p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all"><MessageCircle size={18}/></a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-video bg-muted border border-border relative overflow-hidden group rounded-[2rem] editorial-shadow">
                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60 grayscale group-hover:scale-105 transition-all duration-1000" alt="Mapa" />
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/10 transition-all">
                  <div className="p-4 bg-background/80 backdrop-blur-md rounded-full shadow-2xl">
                    <MapPin className="text-primary" size={24} />
                  </div>
                </a>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <p className="text-sm font-bold tracking-tight">{address}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">Quito Sur • Sector Chillogallo • Distrito Metropolitano</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
