"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { collection, doc } from 'firebase/firestore';
import { useAuth, useFirestore, useUser, useCollection, useDoc } from '@/firebase';
import { Loader2 } from 'lucide-react';

import ClientUI from '@/components/ClientUI';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  const defaultProducts = [
    // MUJER (7)
    { id: 'w1', category: 'mujer', name: 'Corset Victoria Editorial', price: '$85.00', description: 'Encaje francés con estructura de autor.', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600' },
    { id: 'w2', category: 'mujer', name: 'Vestido Seda Royale', price: '$120.00', description: 'Corte asimétrico en seda pura.', imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600' },
    { id: 'w3', category: 'mujer', name: 'Blazer Femme Fatale', price: '$95.00', description: 'Hombros estructurados y acabado mate.', imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600' },
    { id: 'w4', category: 'mujer', name: 'Lingerie Noire Set', price: '$65.00', description: 'Transparencias arquitectónicas de lujo.', imageUrl: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=600' },
    { id: 'w5', category: 'mujer', name: 'Pantalón Palazzo Archive', price: '$78.00', description: 'Caída fluida con cintura alta.', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600' },
    { id: 'w6', category: 'mujer', name: 'Tacones D\'Orsey Elite', price: '$145.00', description: 'Cuero italiano con tacón de aguja.', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' },
    { id: 'w7', category: 'mujer', name: 'Bolso Clutch Victoria', price: '$110.00', description: 'Herrajes en oro champagne.', imageUrl: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=600' },
    
    // HOMBRE (7)
    { id: 'm1', category: 'hombre', name: 'Traje Hugo Boss Black', price: '$450.00', description: 'Lana virgen con corte slim fit.', imageUrl: 'https://images.unsplash.com/photo-1594932224456-7489ff203176?auto=format&fit=crop&q=80&w=600' },
    { id: 'm2', category: 'hombre', name: 'Camisa Oxford Blanca', price: '$75.00', description: 'Algodón egipcio de alta densidad.', imageUrl: 'https://images.unsplash.com/photo-1621072156002-e2fcc103e869?auto=format&fit=crop&q=80&w=600' },
    { id: 'm3', category: 'hombre', name: 'Reloj Chrono Boss', price: '$280.00', description: 'Maquinaria suiza, correa de cuero.', imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600' },
    { id: 'm4', category: 'hombre', name: 'Chaqueta Cuero Urban', price: '$220.00', description: 'Nappa premium con detalles en metal.', imageUrl: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=600' },
    { id: 'm5', category: 'hombre', name: 'Zapatos Oxford Italianos', price: '$190.00', description: 'Construcción Goodyear de autor.', imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600' },
    { id: 'm6', category: 'hombre', name: 'Corbata Seda Boss', price: '$55.00', description: 'Estampado jacquard micro-diseño.', imageUrl: 'https://images.unsplash.com/photo-1589756823851-41e53773c168?auto=format&fit=crop&q=80&w=600' },
    { id: 'm7', category: 'hombre', name: 'Gafas Aviador GM', price: '$130.00', description: 'Lentes polarizados con marco de titanio.', imageUrl: 'https://images.unsplash.com/photo-1511499767390-91f197606024?auto=format&fit=crop&q=80&w=600' },
    
    // PERFUMES (7)
    { id: 'p1', category: 'perfumes', name: 'Elixir d\'Or GM', price: '$115.00', description: 'Notas de sándalo y ámbar gris.', imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
    { id: 'p2', category: 'perfumes', name: 'Nuit Intense', price: '$95.00', description: 'Esencia nocturna de jazmín y cuero.', imageUrl: 'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?auto=format&fit=crop&q=80&w=600' },
    { id: 'p3', category: 'perfumes', name: 'Vogue Spritz', price: '$85.00', description: 'Cítricos sicilianos y brisa marina.', imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600' },
    { id: 'p4', category: 'perfumes', name: 'Rose Royale', price: '$105.00', description: 'Pétalos frescos con fondo de almizcle.', imageUrl: 'https://images.unsplash.com/photo-1557170334-a7c3cbacaefd?auto=format&fit=crop&q=80&w=600' },
    { id: 'p5', category: 'perfumes', name: 'Oud Mystique', price: '$140.00', description: 'Madera de Oud pura del Sudeste Asiático.', imageUrl: 'https://images.unsplash.com/photo-1616948055600-a12117d73c52?auto=format&fit=crop&q=80&w=600' },
    { id: 'p6', category: 'perfumes', name: 'Velvet Oud', price: '$110.00', description: 'Vainilla negra y toques ahumados.', imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600' },
    { id: 'p7', category: 'perfumes', name: 'Essence of GM', price: '$130.00', description: 'Nuestra fragancia insignia del Lounge.', imageUrl: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=600' }
  ];

  const dynamicData = {
    services: services || [],
    products: products?.length ? products : defaultProducts,
    projects: projects || [],
    menuItems: menuItems || [],
    settings: globalSettings || {
      heroTitle: 'GM HOUSE',
      heroSubtitle: 'Definiendo el Manifiesto Estético del Lujo Moderno',
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