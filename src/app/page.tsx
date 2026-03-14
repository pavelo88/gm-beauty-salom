
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { collection, doc } from 'firebase/firestore';
import { useAuth, useFirestore, useUser, useCollection, useDoc } from '@/firebase';
import { Loader2 } from 'lucide-react';

import ClientUI from '@/components/ClientUI';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to Light Mode as requested
  const auth = useAuth();
  const db = useFirestore();
  const { user, loading: authLoading } = useUser(auth);

  useEffect(() => {
    if (!authLoading && !user && auth) {
      signInAnonymously(auth).catch((e) => {
        console.error("Auth failed:", e);
      });
    }
  }, [user, authLoading, auth]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const appId = 'gm-beauty-house-v1';

  // Dynamic Content Queries
  const servicesQuery = useMemo(() => collection(db, 'data', appId, 'services'), [db]);
  const productsQuery = useMemo(() => collection(db, 'data', appId, 'products'), [db]);
  const projectsQuery = useMemo(() => collection(db, 'data', appId, 'projects'), [db]);
  const menuQuery = useMemo(() => collection(db, 'data', appId, 'menu'), [db]);
  const settingsRef = useMemo(() => doc(db, 'data', appId, 'settings', 'global'), [db]);

  const { data: services } = useCollection(servicesQuery);
  const { data: products } = useCollection(productsQuery);
  const { data: projects } = useCollection(projectsQuery);
  const { data: menuItems } = useCollection(menuQuery);
  const { data: globalSettings } = useDoc(settingsRef);

  const dynamicData = {
    services: services || [],
    products: products || [],
    projects: projects || [],
    menuItems: menuItems || [],
    settings: globalSettings || {
      heroTitle: 'GM HOUSE',
      heroSubtitle: 'Definiendo el Manifiesto Estético del Lujo Moderno en Quito',
      heroImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000',
      homeBeautyTitle: 'Archivo de Belleza',
      homeBeautySubtitle: 'Salón & Barbería',
      homeBeautyText: 'Curaduría técnica en corte y color editorial en el sur de Quito.',
      homeBeautyImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200',
      manifestoTitle: 'El lujo no es la acumulación, es la intención.',
      manifestoText: 'En GM Beauty House, cada servicio es un acto de diseño consciente.',
      whatsappNumber: '0987654321',
      instagramUrl: 'https://instagram.com/gmbeautyhouse',
      facebookUrl: 'https://facebook.com/gmbeautyhouse',
      address: 'Rosa Yeira 420 y Serapio Japeravi, Quito, Ecuador',
      catalogUrl: ''
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">Loading Edition</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-primary/20">
      <ClientUI 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setView={() => {}} 
        dynamicData={dynamicData}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </div>
  );
}
