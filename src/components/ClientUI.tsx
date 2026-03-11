"use client"

import React, { useState } from 'react';
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
  const isLightMode = activeTab === 'beauty';

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'beauty', label: 'Salón & Barbería', icon: Scissors },
    { id: 'boutique', label: 'Boutique Editorial', icon: ShoppingBag },
    { id: 'alliance', label: 'Modulares GM', icon: Sofa },
    { id: 'lounge', label: 'Lounge & Resto', icon: Gamepad2 },
  ];

  return (
    <>
      <nav className={cn(
        "sticky top-0 z-50 backdrop-blur-md border-b shadow-lg transition-colors duration-1000",
        isLightMode ? "bg-white/90 border-accent/20" : "bg-background/90 border-primary/20"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex flex-col justify-center cursor-pointer" onClick={() => setActiveTab('home')}>
              <h1 className={cn(
                "text-2xl md:text-3xl font-headline font-bold tracking-tight",
                isLightMode ? "text-rose" : "text-gold"
              )}>
                GM BEAUTY HOUSE
              </h1>
              <span className={cn(
                "text-[0.65rem] tracking-[0.2em] uppercase font-bold",
                isLightMode ? "text-accent" : "text-primary/80"
              )}>Belleza • Moda • Muebles</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "px-4 py-2 rounded-md flex items-center space-x-2 text-sm font-bold transition-all duration-300",
                    activeTab === item.id 
                      ? (isLightMode ? "bg-rose-gold text-white shadow-md" : "bg-gold-vibrant text-black shadow-lg shadow-primary/20")
                      : (isLightMode ? "text-zinc-600 hover:text-accent" : "text-zinc-400 hover:text-primary hover:bg-white/5")
                  )}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <button className={cn("md:hidden p-2", isLightMode ? "text-accent" : "text-primary")} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={cn(
            "md:hidden border-t p-4 flex flex-col gap-2 animate-in slide-in-from-top-4 duration-300",
            isLightMode ? "bg-white border-zinc-200" : "bg-background border-zinc-900"
          )}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                className={cn(
                  "flex items-center space-x-4 p-4 rounded-lg text-sm font-bold transition-all",
                  activeTab === item.id 
                    ? (isLightMode ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary") 
                    : (isLightMode ? "text-zinc-600" : "text-zinc-400")
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow w-full">
        {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} />}
        {activeTab === 'beauty' && <BeautySection dynamicData={dynamicData} />}
        {activeTab === 'boutique' && <BoutiqueSection dynamicData={dynamicData} />}
        {activeTab === 'alliance' && <AllianceSection dynamicData={dynamicData} />}
        {activeTab === 'lounge' && <LoungeSection dynamicData={dynamicData} />}
      </main>

      <footer className={cn(
        "border-t py-16 transition-colors duration-1000",
        isLightMode ? "bg-zinc-50 border-accent/10" : "bg-black border-primary/10"
      )}>
        <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
          <h2 className={cn(
            "text-4xl font-headline font-bold",
            isLightMode ? "text-rose" : "text-gold"
          )}>
            GM BEAUTY HOUSE
          </h2>
          <div className={cn(
            "flex items-center justify-center space-x-3",
            isLightMode ? "text-zinc-600" : "text-zinc-400"
          )}>
            <MapPin size={20} className={isLightMode ? "text-accent" : "text-primary"} />
            <p className="text-xl font-medium">Rosa Yeira 420 y Serapio Japeravi, Sur de Quito</p>
          </div>
          <div className={cn(
            "flex justify-center flex-wrap gap-4 text-sm tracking-[0.3em] uppercase font-bold",
            isLightMode ? "text-zinc-400" : "text-zinc-500"
          )}>
            <span>Barbería</span> • <span>Uñas</span> • <span>Moda</span> • <span>Muebles</span>
          </div>
          <div className="flex justify-center pt-8">
            <button 
              onClick={() => setView('admin')} 
              className={cn(
                "p-3 rounded-full transition-all hover:scale-110",
                isLightMode ? "bg-zinc-200 text-zinc-400 hover:text-accent" : "bg-zinc-900 text-zinc-800 hover:text-primary"
              )}
            >
              <Lock size={18} />
            </button>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-30">&copy; {new Date().getFullYear()} GM Beauty House Concept Store</p>
        </div>
      </footer>
    </>
  );
}
