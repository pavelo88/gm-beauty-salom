
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { collection } from 'firebase/firestore';
import { useAuth, useFirestore, useUser, useCollection } from '@/firebase';
import { Loader2 } from 'lucide-react';

import ClientUI from '@/components/ClientUI';
import AdminUI from '@/components/AdminUI';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [view, setView] = useState<'client' | 'admin'>('client');
  const auth = useAuth();
  const db = useFirestore();
  const { user, loading: authLoading } = useUser(auth);

  useEffect(() => {
    if (!user && !authLoading) {
      signInAnonymously(auth).catch((e) => {
        console.error("Auth initialization failed", e);
      });
    }
  }, [user, authLoading, auth]);

  const appId = 'gm-beauty-house-v1';

  const servicesQuery = useMemo(() => collection(db, 'data', appId, 'services'), [db]);
  const productsQuery = useMemo(() => collection(db, 'data', appId, 'products'), [db]);
  const projectsQuery = useMemo(() => collection(db, 'data', appId, 'projects'), [db]);
  const menuQuery = useMemo(() => collection(db, 'data', appId, 'menu'), [db]);

  const { data: services } = useCollection(servicesQuery);
  const { data: products } = useCollection(productsQuery);
  const { data: projects } = useCollection(projectsQuery);
  const { data: menuItems } = useCollection(menuQuery);

  const dynamicData = {
    services: services || [],
    products: products || [],
    projects: projects || [],
    menuItems: menuItems || []
  };

  if (authLoading) {
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
