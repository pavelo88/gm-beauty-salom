
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
    { id: 'home', label: 'Portada', icon: Home },
    { id: 'beauty', label: 'Belleza', icon: Scissors },
    { id: 'boutique', label: 'Boutique', icon: ShoppingBag },
    { id: 'alliance', label: 'Atelier', icon: Sofa },
    { id: 'lounge', label: 'Lounge', icon: Gamepad2 },
    { id: 'tv', label: 'GM TV', icon: Tv },
  ];

  const whatsappNumber = "593987654321"; // Reemplazar con el real

  return (
    <div className="relative min-h-screen">
      {/* Masthead */}
      <nav className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-700",
        scrolled ? "bg-background/80 backdrop-blur-xl py-3 md:py-4 border-b border-border/50 shadow-sm" : "bg-transparent py-6 md:py-8"
      )}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex justify-between items-center">
          <div 
            className="flex flex-col cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <h1 className="text-xl md:text-2xl font-headline font-black tracking-tighter uppercase group-hover:text-primary transition-colors">
              GM Beauty House
            </h1>
            <span className="text-[6px] md:text-[7px] tracking-[0.6em] uppercase font-bold text-muted-foreground ml-1">Edición Sur • Quito MMXXIV</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "text-[9px] xl:text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-primary relative py-1 flex items-center gap-2",
                  activeTab === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
                {activeTab === item.id && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary animate-in fade-in slide-in-from-left-2 duration-500"></span>}
              </button>
            ))}
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-muted-foreground hover:text-primary transition-colors ml-4"
              aria-label="Alternar Tema"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-muted-foreground"
              aria-label="Alternar Tema"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="text-foreground p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Alternar Menú">
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 w-full h-screen bg-background p-10 flex flex-col justify-center items-center gap-8 md:gap-10 animate-in fade-in zoom-in-95 duration-500 z-[110]">
            <button className="absolute top-8 right-8 p-4" onClick={() => setIsMenuOpen(false)} aria-label="Cerrar Menú">
              <X size={32}/>
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                className={cn(
                  "text-4xl md:text-5xl font-headline font-bold uppercase tracking-tighter transition-all",
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

      {/* Asistente VIP - Rediseñado para no ser invasivo */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
        {isAssistantOpen && (
          <div className="bg-card border border-primary/20 p-6 rounded-2xl shadow-2xl w-64 md:w-72 mb-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-4">Atención VIP</h4>
            <div className="space-y-3">
              <button 
                onClick={() => { setActiveTab('beauty'); setIsAssistantOpen(false); }}
                className="w-full text-left p-3 rounded-xl bg-muted/30 hover:bg-primary hover:text-background transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Wand2 size={14} className="text-primary group-hover:text-background" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Asesor de Estilo AI</span>
                </div>
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100" />
              </button>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Hola,%20quisiera%20agendar%20una%20cita%20VIP%20en%20GM%20Beauty%20House.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left p-3 rounded-xl bg-foreground text-background hover:bg-primary transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Phone size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Reservar Cita</span>
                </div>
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group",
            isAssistantOpen ? "bg-primary text-background rotate-90" : "bg-foreground text-background hover:scale-110"
          )}
          aria-label="Atención VIP"
        >
          {isAssistantOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
      </div>

      <footer className="bg-foreground text-background py-12 md:py-16 border-t border-border/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-headline font-bold tracking-tighter leading-none">GM HOUSE</h2>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
              Curaduría estética de lujo en el Sur de Quito. Belleza, moda y diseño consciente.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Navegación</h4>
            <nav className="grid grid-cols-2 gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
              <button onClick={() => setActiveTab('beauty')} className="text-left hover:text-white transition-colors">Belleza</button>
              <button onClick={() => setActiveTab('boutique')} className="text-left hover:text-white transition-colors">Boutique</button>
              <button onClick={() => setActiveTab('alliance')} className="text-left hover:text-white transition-colors">Atelier</button>
              <button onClick={() => setActiveTab('lounge')} className="text-left hover:text-white transition-colors">Lounge</button>
            </nav>
          </div>
          <div className="space-y-4 md:text-right">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Contacto</h4>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              Rosa Yeira 420 y Serapio Japeravi,<br/>Quito Sur, Ecuador
            </p>
            <button onClick={() => setView('admin')} className="text-zinc-800 hover:text-zinc-500 transition-colors p-2" aria-label="Admin Access">
              <Lock size={12} />
            </button>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10 pt-6 border-t border-white/5">
          <p className="text-[7px] uppercase tracking-[0.4em] text-zinc-700 text-center">
            © MMXXIV GM HOUSE CONCEPT STORE. DISEÑADO EN EL SUR DE QUITO.
          </p>
        </div>
      </footer>
    </div>
  );
}
