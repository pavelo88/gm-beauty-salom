"use client"

import React from 'react';
import { MapPin, Phone, Send, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
  const whatsappNumber = "0987654321";
  const address = "Rosa Yeira 420 y Serapio Japeravi, Quito, Ecuador";
  const displayPhone = "098 765 4321";

  return (
    <div className="w-full pt-16 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 space-y-12">
        
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-primary">Información Oficial</span>
            <h2 className="text-editorial-title">
              CONTACTO <span className="text-gold-gradient italic">DIRECTO</span>
            </h2>
          </div>
          <p className="text-[10px] text-muted-foreground font-light uppercase tracking-widest italic max-w-xs border-l border-primary pl-4">
            "La exclusividad comienza con una conversación. Visítanos en el Sur de Quito."
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-card border border-border p-8 rounded-2xl editorial-shadow space-y-6">
            <h3 className="text-2xl font-headline font-bold italic">Envíanos un Mensaje</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Nombre</label>
                  <Input className="bg-background border-border h-10 text-xs" placeholder="Tu nombre" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Teléfono</label>
                  <Input className="bg-background border-border h-10 text-xs" placeholder="098..." />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Mensaje</label>
                <Textarea className="bg-background border-border min-h-[80px] text-xs resize-none" placeholder="¿En qué podemos ayudarte?" />
              </div>
              <Button className="w-full h-12 bg-foreground text-background font-black uppercase tracking-[0.4em] text-[9px]">
                Enviar <Send size={12} className="ml-2" />
              </Button>
            </form>
          </div>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Phone size={14} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Llámanos</span>
                </div>
                <a href={`tel:${whatsappNumber}`} className="block text-xl font-headline font-bold">{displayPhone}</a>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <MessageCircle size={14} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Redes</span>
                </div>
                <div className="flex gap-3">
                  <a href="https://instagram.com/gmbeautyhouse" target="_blank" className="p-2 border border-border hover:border-primary transition-all"><Instagram size={14}/></a>
                  <a href="https://facebook.com/gmbeautyhouse" target="_blank" className="p-2 border border-border hover:border-primary transition-all"><Facebook size={14}/></a>
                  <a href={`https://wa.me/593${whatsappNumber.substring(1)}`} target="_blank" className="p-2 border border-border hover:border-primary transition-all"><MessageCircle size={14}/></a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-video bg-muted border border-border relative overflow-hidden group rounded-xl max-h-[250px]">
                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-50 grayscale" alt="Mapa" />
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all">
                  <MapPin className="text-primary" size={24} />
                </a>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <p className="text-xs font-medium">{address}</p>
                <p className="text-[8px] text-muted-foreground uppercase font-bold">Quito Sur • Sector Chillogallo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
