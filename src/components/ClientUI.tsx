"use client"

import React, { useState, useEffect } from 'react';
import { Home, Sofa, Scissors, ShoppingBag, Gamepad2, X, Menu as MenuIcon, Lock, Moon, Sun, Tv, MessageCircle, ChevronRight, Wand2, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HomeSection } from './sections/HomeSection';
import { BeautySection } from './sections/BeautySection';
import { BoutiqueSection } from './sections/BoutiqueSection';
import { AllianceSection } from './sections/AllianceSection';
import { LoungeSection } from './sections/LoungeSection';
import { TvSection } from './sections/TvSection';
import { Button } from '@/components/ui/button';

interface ClientUIProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setView: (view: 'client' | 'admin') => void;
  dynamicData: any;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function ClientUI({ activeTab, setActiveTab, setView, dynamicData, isDarkMode, setIsDarkMode }: ClientUIProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Cover', icon: Home },
    { id: 'beauty', label: 'Artistry', icon: Scissors },
    { id: 'boutique', label: 'Boutique', icon: ShoppingBag },
    { id: 'alliance', label: 'Atelier', icon: Sofa },
    { id: 'lounge', label: 'Lounge', icon: Gamepad2 },
    { id: 'tv', label: 'GM TV', icon: Tv },
  ];

  const whatsappNumber = "+593987654321"; // Reemplazar con el real

  return (
    <div className="relative min-h-screen bg-texture">
      {/* Masthead */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-700",
        scrolled ? "bg-background/80 backdrop-blur-xl py-4 border-b border-border/50" : "bg-transparent py-10"
      )}>
        <div className="max-w-[1600px] mx-auto px-10 flex justify-between items-center">
          <div 
            className="flex flex-col cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <h1 className="text-2xl md:text-3xl font-headline font-black tracking-tighter uppercase group-hover:text-primary transition-colors">
              GM Beauty House
            </h1>
            <span className="text-[7px] tracking-[0.6em] uppercase font-bold text-muted-foreground ml-1">Archive Edition • MMXXIV</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-primary relative py-1 flex items-center gap-2",
                  activeTab === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
                {activeTab === item.id && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary animate-in fade-in slide-in-from-left-2 duration-500"></span>}
              </button>
            ))}
            
            {/* Theme Toggle in Nav */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-background p-10 flex flex-col justify-center items-center gap-10 animate-in fade-in duration-500 z-[60]">
            <button className="absolute top-10 right-10" onClick={() => setIsMenuOpen(false)}><X size={32}/></button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                className={cn(
                  "text-5xl font-headline font-bold uppercase tracking-tighter transition-all",
                  activeTab === item.id ? "text-primary italic" : "text-foreground opacity-40"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main>
        <div className="animate-in fade-in duration-1000">
          {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} />}
          {activeTab === 'beauty' && <BeautySection dynamicData={dynamicData} />}
          {activeTab === 'boutique' && <BoutiqueSection dynamicData={dynamicData} />}
          {activeTab === 'alliance' && <AllianceSection dynamicData={dynamicData} />}
          {activeTab === 'lounge' && <LoungeSection dynamicData={dynamicData} />}
          {activeTab === 'tv' && <TvSection dynamicData={dynamicData} />}
        </div>
      </main>

      {/* VIP Assistant Floating Button */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-4">
        {isAssistantOpen && (
          <div className="bg-card border border-primary/20 p-8 rounded-[2rem] shadow-2xl w-80 mb-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Concierge VIP</h4>
            <div className="space-y-4">
              <button 
                onClick={() => { setActiveTab('beauty'); setIsAssistantOpen(false); }}
                className="w-full text-left p-4 rounded-2xl bg-muted/50 hover:bg-primary hover:text-background transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Wand2 size={16} />
                  <span className="text-xs font-bold">Consultar Asesor AI</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
              </button>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Hola,%20quisiera%20agendar%20una%20cita%20VIP%20en%20GM%20Beauty%20House.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left p-4 rounded-2xl bg-foreground text-background hover:bg-primary transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Phone size={16} />
                  <span className="text-xs font-bold">Agendar por WhatsApp</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group",
            isAssistantOpen ? "bg-primary text-background rotate-90" : "bg-foreground text-background hover:scale-110"
          )}
        >
          {isAssistantOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      <footer className="bg-foreground text-background pt-40 pb-20 border-t border-border/10 mt-20">
        <div className="max-w-[1400px] mx-auto px-10 grid grid-cols-1 md:grid-cols-12 gap-20">
          <div className="md:col-span-7 space-y-10">
            <h2 className="text-8xl font-headline font-bold tracking-tighter leading-none">GM <br/> HOUSE</h2>
            <div className="max-w-md">
              <p className="text-zinc-500 font-light text-lg leading-relaxed">
                Una curaduría de experiencias estéticas donde el diseño, la moda y la belleza convergen en un solo manifiesto editorial.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Department</h4>
              <nav className="flex flex-col gap-3 text-zinc-500 text-sm font-medium">
                <button onClick={() => setActiveTab('beauty')} className="text-left hover:text-white transition-colors">Salon & Barber</button>
                <button onClick={() => setActiveTab('boutique')} className="text-left hover:text-white transition-colors">Boutique & Perfume</button>
                <button onClick={() => setActiveTab('alliance')} className="text-left hover:text-white transition-colors">Interior Atelier</button>
                <button onClick={() => setActiveTab('lounge')} className="text-left hover:text-white transition-colors">Gamer Lounge</button>
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Location</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">Rosa Yeira 420 y Serapio Japeravi,<br/>Sur de Quito, Ecuador</p>
              <div className="pt-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">Enquiries</h4>
                <p className="text-zinc-500 text-sm">concierge@gmbeautyhouse.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-10 mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-700">© MMXXIV GM HOUSE CONCEPT STORE. BEYOND VULGARITY.</p>
          <div className="flex items-center gap-8">
            <button onClick={() => setView('admin')} className="text-zinc-800 hover:text-zinc-500 transition-colors">
              <Lock size={12} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}