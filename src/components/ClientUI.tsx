
"use client"

import React, { useState, useEffect } from 'react';
import { Home, Sofa, Scissors, ShoppingBag, Gamepad2, X, Menu as MenuIcon, Lock, Moon, Sun, Tv, MessageCircle, Phone, Instagram, Facebook, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HomeSection } from './sections/HomeSection';
import { BeautySection } from './sections/BeautySection';
import { BoutiqueSection } from './sections/BoutiqueSection';
import { AllianceSection } from './sections/AllianceSection';
import { LoungeSection } from './sections/LoungeSection';
import { TvSection } from './sections/TvSection';
import { ContactSection } from './sections/ContactSection';

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
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'beauty', label: 'Belleza', icon: Scissors },
    { id: 'boutique', label: 'Boutique', icon: ShoppingBag },
    { id: 'alliance', label: 'Diseño & Modulares', icon: Sofa },
    { id: 'lounge', label: 'Lounge', icon: Gamepad2 },
    { id: 'tv', label: 'GM TV', icon: Tv },
    { id: 'contact', label: 'Contacto', icon: MapPin },
  ];

  const whatsappNumber = "593987654321";
  const socialLinks = {
    instagram: "https://instagram.com/gmbeautyhouse",
    facebook: "https://facebook.com/gmbeautyhouse"
  };

  return (
    <div className="relative min-h-screen">
      <nav className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-700",
        scrolled ? "bg-background/90 backdrop-blur-xl py-3 border-b border-border/50 shadow-sm" : "bg-transparent py-6"
      )}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex justify-between items-center">
          <div 
            className="flex flex-col cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <h1 className="text-xl md:text-2xl font-headline font-bold tracking-tighter uppercase group-hover:text-primary transition-colors">
              GM Beauty House
            </h1>
            <span className="text-[6px] md:text-[7px] tracking-[0.6em] uppercase font-bold text-muted-foreground ml-1">Quito Sur • MMXXIV</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "text-[9px] font-black uppercase tracking-[0.3em] transition-all hover:text-primary relative py-1",
                  activeTab === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
                {activeTab === item.id && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary animate-in fade-in slide-in-from-left-2 duration-500"></span>}
              </button>
            ))}
            
            <div className="flex items-center gap-4 ml-4 border-l border-border/30 pl-8">
              <a href={socialLinks.instagram} target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={14} /></a>
              <a href={socialLinks.facebook} target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={14} /></a>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <button className="text-foreground p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 w-full h-screen bg-background p-10 flex flex-col justify-center items-center gap-8 animate-in fade-in zoom-in-95 duration-500 z-[110]">
            <button className="absolute top-8 right-8 p-4" onClick={() => setIsMenuOpen(false)}>
              <X size={32}/>
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                className={cn(
                  "text-3xl font-headline font-bold uppercase tracking-tighter",
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
          {activeTab === 'contact' && <ContactSection />}
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-[90]">
        {isAssistantOpen && (
          <div className="bg-card border border-primary/20 p-5 rounded-2xl shadow-2xl w-64 mb-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-3">VIP Concierge</h4>
            <div className="space-y-2">
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                className="w-full text-left p-3 rounded-xl bg-foreground text-background hover:bg-primary transition-all flex items-center gap-3"
              >
                <Phone size={12} />
                <span className="text-[10px] font-bold uppercase">WhatsApp Citas</span>
              </a>
              <button 
                onClick={() => { setActiveTab('contact'); setIsAssistantOpen(false); }}
                className="w-full text-left p-3 rounded-xl bg-muted/30 hover:bg-primary hover:text-background transition-all flex items-center gap-3"
              >
                <MapPin size={12} />
                <span className="text-[10px] font-bold uppercase">Cómo Llegar</span>
              </button>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500",
            isAssistantOpen ? "bg-primary text-background" : "bg-foreground text-background"
          )}
        >
          {isAssistantOpen ? <X size={18} /> : <MessageCircle size={18} />}
        </button>
      </div>

      <footer className="bg-background py-6 border-t border-border/30">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[7px] uppercase tracking-[0.4em] text-muted-foreground">
            © MMXXIV GM HOUSE • QUITO SUR • ECUADOR
          </p>
          <div className="flex items-center gap-6">
             <a href={socialLinks.instagram} target="_blank" className="text-muted-foreground hover:text-primary transition-colors text-[9px] font-bold uppercase tracking-widest">Instagram</a>
             <a href={socialLinks.facebook} target="_blank" className="text-muted-foreground hover:text-primary transition-colors text-[9px] font-bold uppercase tracking-widest">Facebook</a>
             <button onClick={() => setView('admin')} className="text-muted-foreground/10 hover:text-primary transition-colors"><Lock size={10} /></button>
          </div>
        </div>
      </footer>
    </div>
  );
}
