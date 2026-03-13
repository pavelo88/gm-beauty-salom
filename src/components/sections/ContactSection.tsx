
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
    <div className="w-full pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 space-y-24">
        
        <header className="magazine-grid items-end gap-10">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Información Oficial</span>
              <span className="w-20 h-[1px] bg-border"></span>
            </div>
            <h2 className="text-6xl md:text-[8rem] font-headline font-bold leading-[0.8] tracking-tighter uppercase">
              CONTACTO <br/><span className="text-gold-gradient italic">DIRECTO</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed border-l-2 border-primary pl-6 uppercase tracking-widest italic">
              "La exclusividad comienza con una conversación. Visítanos en el corazón del Sur de Quito."
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Formulario Editorial */}
          <div className="bg-card border border-border p-10 md:p-16 rounded-2xl editorial-shadow space-y-10">
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-bold italic">Envíanos un Mensaje</h3>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Consultas Generales • Alianzas • Reservas Especiales</p>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Nombre</label>
                  <Input className="bg-background border-border rounded-none h-12 focus:ring-primary" placeholder="Tu nombre completo" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Teléfono</label>
                  <Input className="bg-background border-border rounded-none h-12 focus:ring-primary" placeholder="Ej: 0987654321" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Mensaje</label>
                <Textarea className="bg-background border-border rounded-none min-h-[150px] focus:ring-primary resize-none" placeholder="¿En qué podemos ayudarte hoy?" />
              </div>
              <Button className="w-full h-auto py-5 rounded-none bg-foreground text-background font-black uppercase tracking-[0.4em] hover:bg-primary transition-all text-[10px]">
                Enviar Mensaje <Send size={14} className="ml-3" />
              </Button>
            </form>
          </div>

          {/* Datos y Mapa */}
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Phone size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Citas & Consultas</span>
                </div>
                <div className="space-y-2">
                  <a href={`tel:${whatsappNumber}`} className="block text-3xl font-headline font-bold hover:text-primary transition-colors">{displayPhone}</a>
                  <a href={`https://wa.me/593${whatsappNumber.substring(1)}`} target="_blank" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-primary/10 p-3 w-fit hover:bg-primary/20 transition-all">
                    <MessageCircle size={14} className="text-primary" /> Chat de WhatsApp
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Instagram size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Síguenos</span>
                </div>
                <div className="flex gap-4">
                  <a href="https://instagram.com/gmbeautyhouse" target="_blank" className="p-3 bg-card border border-border hover:border-primary transition-all"><Instagram size={16}/></a>
                  <a href="https://facebook.com/gmbeautyhouse" target="_blank" className="p-3 bg-card border border-border hover:border-primary transition-all"><Facebook size={16}/></a>
                </div>
              </div>
            </div>

            {/* Mapa Placeholder con Estética Editorial */}
            <div className="space-y-6">
              <div className="flex-grow aspect-video bg-muted border border-border relative overflow-hidden group editorial-shadow grayscale hover:grayscale-0 transition-all duration-1000 rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                  alt="Ubicación GM House"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/90 backdrop-blur-md p-6 border border-primary/20 text-center space-y-2 max-w-xs">
                    <MapPin className="mx-auto text-primary" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">Ver en Google Maps</p>
                  </div>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} 
                  target="_blank" 
                  className="absolute inset-0 z-20"
                  aria-label="Abrir mapa"
                />
              </div>
              
              <div className="space-y-2 border-l-2 border-primary pl-6">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin size={16} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Dirección</span>
                </div>
                <p className="text-sm font-medium leading-relaxed">{address}</p>
                <p className="text-[9px] text-muted-foreground uppercase font-bold">Quito Sur • Sector Chillogallo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
