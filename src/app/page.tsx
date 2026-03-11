"use client"

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

import ClientUI from '@/components/ClientUI';
import AdminUI from '@/components/AdminUI';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [view, setView] = useState<'client' | 'admin'>('client');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [dynamicData, setDynamicData] = useState({ 
    services: [], 
    products: [], 
    projects: [], 
    menuItems: [] 
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (e) {
        console.error("Auth initialization failed", e);
      }
    };
    initAuth();
    const unsubAuth = onAuthStateChanged(auth, (u) => { 
      setUser(u); 
      setLoading(false); 
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    // We use a general app ID or path. In a real app we'd scope this.
    const appId = 'gm-beauty-house-v1';
    
    const unsubServices = onSnapshot(collection(db, 'data', appId, 'services'), (s) => 
      setDynamicData(prev => ({...prev, services: s.docs.map(d => ({id:d.id, ...d.data()})) as any}));
    const unsubProducts = onSnapshot(collection(db, 'data', appId, 'products'), (s) => 
      setDynamicData(prev => ({...prev, products: s.docs.map(d => ({id:d.id, ...d.data()})) as any}));
    const unsubProjects = onSnapshot(collection(db, 'data', appId, 'projects'), (s) => 
      setDynamicData(prev => ({...prev, projects: s.docs.map(d => ({id:d.id, ...d.data()})) as any}));
    const unsubMenu = onSnapshot(collection(db, 'data', appId, 'menu'), (s) => 
      setDynamicData(prev => ({...prev, menuItems: s.docs.map(d => ({id:d.id, ...d.data()})) as any}));

    return () => { 
      unsubServices(); 
      unsubProducts(); 
      unsubProjects(); 
      unsubMenu(); 
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-primary font-bold uppercase tracking-widest text-sm">GM Beauty House</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-body flex flex-col transition-all duration-1000 ${
      view === 'client' && activeTab === 'beauty' ? 'bg-[#faf9f7] text-zinc-900 selection:bg-accent/30' 
      : 'bg-background text-foreground selection:bg-primary/30'
    }`}>
      {view === 'client' ? (
        <ClientUI 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setView={setView} 
          dynamicData={dynamicData} 
        />
      ) : (
        <AdminUI 
          setView={setView} 
          dynamicData={dynamicData} 
        />
      )}
    </div>
  );
}
