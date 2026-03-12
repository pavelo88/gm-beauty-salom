"use client"

import React, { useState, useEffect } from 'react';
import { Home, Sofa, Scissors, ShoppingBag, Gamepad2, MapPin, X, Menu as MenuIcon, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HomeSection } from './sections/HomeSection';
import { BeautySection } from './sections/BeautySection';
import { BoutiqueSection } from './sections/BoutiqueSection';
import { AllianceSection } from './sections/AllianceSection';
import { LoungeSection } from './sections/LoungeSection';

interface ClientUIProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setView: (view: 'client' | 'admin') => void;
  dynamicData: any;
}

export default function ClientUI({ activeTab, setActiveTab, setView, dynamicData }: ClientUIProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Cover', icon: Home },
    { id: 'beauty', label: 'Archive', icon: Scissors },
    { id: 'boutique', label: 'Boutique', icon: ShoppingBag },
    { id: 'alliance', label: 'Atelier', icon: Sofa },
    { id: 'lounge', label: 'Lounge', icon: Gamepad2 },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Masthead */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled ? "bg-background/95 backdrop-blur-md border-b py-4" : "bg-transparent py-8"
      )}>
        <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex flex-col cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <h1 className="text-xl md:text-2xl font-headline font-black tracking-tighter uppercase group-hover:text-primary transition-colors">
              GM Beauty House
            </h1>
            <span className="text-[8px] tracking-[0.4em] uppercase font-bold text-muted-foreground">Volume I • Edition 2024</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary relative py-1",
                  activeTab === item.id ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-b p-8 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                className={cn(
                  "text-2xl font-headline font-bold uppercase tracking-tighter transition-all",
                  activeTab === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-0">
        <div className="animate-in fade-in duration-1000">
          {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} />}
          {activeTab === 'beauty' && <BeautySection dynamicData={dynamicData} />}
          {activeTab === 'boutique' && <BoutiqueSection dynamicData={dynamicData} />}
          {activeTab === 'alliance' && <AllianceSection dynamicData={dynamicData} />}
          {activeTab === 'lounge' && <LoungeSection dynamicData={dynamicData} />}
        </div>
      </main>

      <footer className="bg-foreground text-background pt-32 pb-12 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6 space-y-6">
            <h2 className="text-6xl font-headline font-bold tracking-tighter">GM <br/> HOUSE</h2>
            <p className="text-zinc-400 font-light max-w-sm">
              La máxima expresión de estética y estilo en el Sur de Quito. Un ecosistema diseñado para quienes no aceptan menos que la perfección.
            </p>
          </div>
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Location</h4>
            <p className="text-zinc-400 text-sm">Rosa Yeira 420 y Serapio Japeravi,<br/>Quito, Ecuador</p>
          </div>
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Contact</h4>
            <p className="text-zinc-400 text-sm">info@gmbeautyhouse.com<br/>+593 999 999 999</p>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-600">&copy; 2024 GM HOUSE CONCEPT STORE. ALL RIGHTS RESERVED.</p>
          <button onClick={() => setView('admin')} className="text-zinc-800 hover:text-white transition-colors">
            <Lock size={12} />
          </button>
        </div>
      </footer>
    </div>
  );
}
