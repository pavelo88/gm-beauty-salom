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
  // Initialize in DARK MODE as requested
  const [isDarkMode, setIsDarkMode] = useState(true);
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

  // Sync Dark Mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const appId = 'gm-beauty-house-v1';

  const servicesQuery = useMemo(() => collection(db, 'data', appId, 'services'), [db, appId]);
  const productsQuery = useMemo(() => collection(db, 'data', appId, 'products'), [db, appId]);
  const projectsQuery = useMemo(() => collection(db, 'data', appId, 'projects'), [db, appId]);
  const menuQuery = useMemo(() => collection(db, 'data', appId, 'menu'), [db, appId]);

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
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">Loading Edition</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-primary/20">
      {view === 'client' ? (
        <ClientUI 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setView={setView} 
          dynamicData={dynamicData}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
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