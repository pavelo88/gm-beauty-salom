"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Settings, LogOut, Plus, Trash2, Loader2, Save, 
  FileText, Share2, Scissors, ShoppingBag, Sofa, 
  UtensilsCrossed, LayoutDashboard, Eye, MapPin, 
  Globe, Instagram, Facebook, Phone
} from 'lucide-react';
import { collection, addDoc, deleteDoc, doc, setDoc, getDoc, query, onSnapshot } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Link from 'next/link';

export default function AdminPage() {
  const db = useFirestore();
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [globalSettings, setGlobalSettings] = useState<any>({
    heroTitle: 'GM HOUSE',
    heroSubtitle: 'Definiendo el Manifiesto Estético del Lujo Moderno en Quito',
    manifestoTitle: 'El lujo no es la acumulación, es la intención.',
    manifestoText: 'En GM Beauty House, cada servicio es un acto de diseño consciente.',
    whatsappNumber: '0987654321',
    instagramUrl: 'https://instagram.com/gmbeautyhouse',
    facebookUrl: 'https://facebook.com/gmbeautyhouse',
    address: 'Rosa Yeira 420 y Serapio Japeravi, Quito, Ecuador',
    catalogUrl: ''
  });

  const [services, setServices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    category: '', 
    imageUrl: '', 
    title: '' 
  });

  const appId = 'gm-beauty-house-v1';

  useEffect(() => {
    // Fetch Settings
    const fetchSettings = async () => {
      const docRef = doc(db, 'data', appId, 'settings', 'global');
      try {
        const snap = await getDoc(docRef);
        if (snap.exists()) setGlobalSettings(snap.data());
      } catch (e) { console.error(e); }
      finally { setGlobalLoading(false); }
    };
    fetchSettings();

    // Listen to Collections
    const qServices = query(collection(db, 'data', appId, 'services'));
    const qProducts = query(collection(db, 'data', appId, 'products'));
    const qProjects = query(collection(db, 'data', appId, 'projects'));
    const qMenu = query(collection(db, 'data', appId, 'menu'));

    const unsubServices = onSnapshot(qServices, (s) => setServices(s.docs.map(d => ({...d.data(), id: d.id}))));
    const unsubProducts = onSnapshot(qProducts, (s) => setProducts(s.docs.map(d => ({...d.data(), id: d.id}))));
    const unsubProjects = onSnapshot(qProjects, (s) => setProjects(s.docs.map(d => ({...d.data(), id: d.id}))));
    const unsubMenu = onSnapshot(qMenu, (s) => setMenuItems(s.docs.map(d => ({...d.data(), id: d.id}))));

    return () => {
      unsubServices();
      unsubProducts();
      unsubProjects();
      unsubMenu();
    };
  }, [db]);

  const saveGlobal = async () => {
    setLoading(true);
    const docRef = doc(db, 'data', appId, 'settings', 'global');
    setDoc(docRef, globalSettings, { merge: true })
      .then(() => alert("Configuración global sincronizada."))
      .catch(async (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: docRef.path, operation: 'update', requestResourceData: globalSettings
        }));
      })
      .finally(() => setLoading(false));
  };

  const addItem = async (colName: string) => {
    setLoading(true);
    const data = { ...form };
    if (!data.name && data.title) data.name = data.title;
    if (!data.title && data.name) data.title = data.name;
    
    const colRef = collection(db, 'data', appId, colName);
    addDoc(colRef, data)
      .then(() => {
        setForm({ name: '', price: '', description: '', category: '', imageUrl: '', title: '' });
        alert("Elemento añadido al archivo.");
      })
      .catch(async (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: colRef.path, operation: 'create', requestResourceData: data
        }));
      })
      .finally(() => setLoading(false));
  };

  const removeItem = async (colName: string, id: string) => {
    if (!confirm("¿Eliminar permanentemente del catálogo?")) return;
    const docRef = doc(db, 'data', appId, colName, id);
    deleteDoc(docRef).catch(err => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: docRef.path, operation: 'delete'
      }));
    });
  };

  if (globalLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-zinc-900 font-body">
      {/* Editorial Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-primary/10 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-2.5 rounded-2xl text-white shadow-lg shadow-primary/20">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="font-headline font-black text-xl md:text-2xl uppercase tracking-tighter">Admin Hub</h1>
            <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted-foreground">GM Beauty House • Quito Sur</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link href="/" className="flex-1 md:flex-none">
            <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5 rounded-full text-[10px] font-black uppercase tracking-widest px-6 h-11">
              <Eye size={14} className="mr-2" /> Ver Sitio
            </Button>
          </Link>
          <Button onClick={saveGlobal} disabled={loading} className="flex-1 md:flex-none bg-primary text-white hover:bg-primary/90 rounded-full text-[10px] font-black uppercase tracking-widest px-8 h-11 shadow-xl shadow-primary/10">
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={14} className="mr-2" /> Sincronizar Todo</>}
          </Button>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-4 md:p-8 lg:p-12">
        <Tabs defaultValue="editorial" className="space-y-10">
          <TabsList className="bg-white/50 backdrop-blur p-1 rounded-2xl border border-primary/10 h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
            <TabsTrigger value="editorial" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <FileText size={14} className="mr-2" /> Editorial
            </TabsTrigger>
            <TabsTrigger value="boutique" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <ShoppingBag size={14} className="mr-2" /> Boutique
            </TabsTrigger>
            <TabsTrigger value="beauty" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <Scissors size={14} className="mr-2" /> Belleza
            </TabsTrigger>
            <TabsTrigger value="lounge" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <UtensilsCrossed size={14} className="mr-2" /> Lounge
            </TabsTrigger>
            <TabsTrigger value="modular" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <Sofa size={14} className="mr-2" /> Modulares
            </TabsTrigger>
            <TabsTrigger value="contact" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <Share2 size={14} className="mr-2" /> Contacto
            </TabsTrigger>
          </TabsList>

          {/* SECTION: EDITORIAL GLOBAL */}
          <TabsContent value="editorial" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <Card className="border-primary/10 rounded-[2rem] overflow-hidden editorial-shadow">
                  <CardHeader className="bg-primary/5 pb-8">
                    <CardTitle className="font-headline italic text-2xl">Manifiesto & Hero</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest font-bold">Configuración de la Primera Impresión</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Título de Portada</label>
                        <Input className="h-12 rounded-xl" value={globalSettings.heroTitle} onChange={e => setGlobalSettings({...globalSettings, heroTitle: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subtítulo Descriptivo</label>
                        <Input className="h-12 rounded-xl" value={globalSettings.heroSubtitle} onChange={e => setGlobalSettings({...globalSettings, heroSubtitle: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Cita del Manifiesto</label>
                      <Input className="h-12 rounded-xl font-headline italic text-lg" value={globalSettings.manifestoTitle} onChange={e => setGlobalSettings({...globalSettings, manifestoTitle: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Texto del Manifiesto (Cuerpo)</label>
                      <Textarea className="min-h-[120px] rounded-2xl resize-none p-4" value={globalSettings.manifestoText} onChange={e => setGlobalSettings({...globalSettings, manifestoText: e.target.value})} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-5">
                <div className="sticky top-32 p-10 bg-white rounded-[3rem] border border-primary/5 editorial-shadow flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                    <FileText size={32} />
                  </div>
                  <h4 className="font-headline text-3xl italic">Vista Previa Editorial</h4>
                  <div className="w-full h-[1px] bg-primary/10"></div>
                  <div className="space-y-2">
                    <p className="text-4xl font-headline font-black uppercase leading-none">{globalSettings.heroTitle}</p>
                    <p className="text-[8px] uppercase tracking-[0.4em] text-primary font-bold">{globalSettings.heroSubtitle}</p>
                  </div>
                  <p className="text-sm italic text-muted-foreground line-clamp-3">"{globalSettings.manifestoTitle}"</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SECTION: BOUTIQUE & MODA */}
          <TabsContent value="boutique" className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6">
                <Card className="border-primary/10 rounded-[2rem] editorial-shadow bg-white">
                  <CardHeader>
                    <CardTitle className="font-headline italic">Nuevo Ítem Boutique</CardTitle>
                    <CardDescription className="text-[10px] uppercase font-black tracking-widest">Añadir al archivo de temporada</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Nombre de la Prenda" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <Input placeholder="Precio (Ej: $120.00)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                    <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Categoría de Moda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mujer">Revista Victoria (Mujer)</SelectItem>
                        <SelectItem value="hombre">Revista Hugo Boss (Hombre)</SelectItem>
                        <SelectItem value="perfumes">Esencias de Lujo (Perfumes)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="URL Imagen (Unsplash o Storage)" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
                    <Textarea placeholder="Descripción corta de la pieza..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                    <Button onClick={() => addItem('products')} disabled={loading} className="w-full bg-primary text-white h-12 rounded-xl font-black uppercase text-[10px] tracking-widest">
                      Añadir a Boutique
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-primary/10 rounded-[2rem] editorial-shadow bg-primary text-white">
                  <CardHeader>
                    <CardTitle className="font-headline italic">Catálogo PDF</CardTitle>
                    <CardDescription className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Habilitar descarga en boutique</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/40" placeholder="URL del PDF del Catálogo" value={globalSettings.catalogUrl} onChange={e => setGlobalSettings({...globalSettings, catalogUrl: e.target.value})} />
                    <Button variant="secondary" onClick={saveGlobal} className="w-full h-11 text-[10px] font-black uppercase tracking-widest">Actualizar Enlace</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map(p => (
                    <div key={p.id} className="bg-white p-4 rounded-3xl border border-primary/5 editorial-shadow flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-100 border border-primary/5">
                          {p.imageUrl && <img src={p.imageUrl} className="w-full h-full object-cover" alt={p.name} />}
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary">{p.category}</p>
                          <h5 className="font-bold text-sm tracking-tighter uppercase">{p.name}</h5>
                          <p className="text-xs font-bold text-zinc-400">{p.price}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem('products', p.id)} className="text-zinc-300 hover:text-red-500 hover:bg-red-50">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SECTION: BELLEZA & SALON */}
          <TabsContent value="beauty" className="animate-in fade-in duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-4 space-y-6">
                 <Card className="border-primary/10 rounded-[2rem] editorial-shadow bg-white">
                   <CardHeader>
                     <CardTitle className="font-headline italic">Nuevo Servicio de Autor</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <Input placeholder="Nombre del Servicio" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                      <Input placeholder="Precio o 'Desde $...'" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                      <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Sección de Estilo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salon">Le Salon (Mujer)</SelectItem>
                          <SelectItem value="barberia">Barber Shop (Hombre)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="URL de Imagen (Impacto Visual)" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
                      <Button onClick={() => addItem('services')} disabled={loading} className="w-full bg-primary text-white h-12 rounded-xl font-black uppercase text-[10px] tracking-widest">
                        Registrar Servicio
                      </Button>
                   </CardContent>
                 </Card>
               </div>
               <div className="lg:col-span-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(s => (
                      <Card key={s.id} className="border-primary/5 rounded-[2rem] overflow-hidden group editorial-shadow">
                        <div className="aspect-square relative overflow-hidden">
                          <img src={s.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={s.name} />
                          <div className="absolute top-4 right-4">
                            <Button size="icon" variant="destructive" onClick={() => removeItem('services', s.id)} className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        <CardHeader className="p-6">
                          <p className="text-[9px] font-black uppercase tracking-widest text-primary">{s.category}</p>
                          <CardTitle className="text-sm font-bold uppercase tracking-tight line-clamp-1">{s.name}</CardTitle>
                          <CardDescription className="text-primary font-bold">{s.price}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                 </div>
               </div>
             </div>
          </TabsContent>

          {/* SECTION: LOUNGE & RESTO */}
          <TabsContent value="lounge" className="animate-in fade-in duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-4 space-y-6">
                 <Card className="border-primary/10 rounded-[2rem] editorial-shadow bg-white">
                   <CardHeader>
                     <CardTitle className="font-headline italic">Mixología & Gastronomía</CardTitle>
                     <CardDescription className="text-[10px] font-black uppercase tracking-widest">Gestionar Carta de Autor</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <Input placeholder="Nombre del Plato/Bebida" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                      <Input placeholder="Precio (Ej: $6.00)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                      <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Tipo de Ítem" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Comida">Gastronomie (Comida)</SelectItem>
                          <SelectItem value="Bebidas">Mixologie (Bebidas)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={() => addItem('menu')} disabled={loading} className="w-full bg-primary text-white h-12 rounded-xl font-black uppercase text-[10px] tracking-widest">
                        Añadir a la Carta
                      </Button>
                   </CardContent>
                 </Card>
               </div>
               <div className="lg:col-span-8">
                 <div className="bg-white p-12 rounded-[3.5rem] border border-primary/5 editorial-shadow space-y-12">
                   <h4 className="text-center font-headline text-3xl italic text-primary">Previsualización de Menú</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                     <div className="space-y-6">
                       <h5 className="text-[10px] font-black uppercase tracking-[0.4em] border-b border-primary/10 pb-2">Gastronomie</h5>
                       {menuItems.filter(m => m.category === 'Comida').map(m => (
                         <div key={m.id} className="flex justify-between items-baseline group">
                           <span className="text-xs font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{m.name}</span>
                           <span className="flex-grow border-b border-dotted border-primary/20 mx-4"></span>
                           <div className="flex items-center gap-3">
                             <span className="text-xs font-bold text-primary">{m.price}</span>
                             <button onClick={() => removeItem('menu', m.id)} className="text-zinc-200 hover:text-red-500"><Trash2 size={12}/></button>
                           </div>
                         </div>
                       ))}
                     </div>
                     <div className="space-y-6">
                       <h5 className="text-[10px] font-black uppercase tracking-[0.4em] border-b border-primary/10 pb-2">Mixologie</h5>
                       {menuItems.filter(m => m.category === 'Bebidas').map(m => (
                         <div key={m.id} className="flex justify-between items-baseline group">
                           <span className="text-xs font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{m.name}</span>
                           <span className="flex-grow border-b border-dotted border-primary/20 mx-4"></span>
                           <div className="flex items-center gap-3">
                             <span className="text-xs font-bold text-primary">{m.price}</span>
                             <button onClick={() => removeItem('menu', m.id)} className="text-zinc-200 hover:text-red-500"><Trash2 size={12}/></button>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </TabsContent>

          {/* SECTION: CONTACTO & REDES */}
          <TabsContent value="contact" className="animate-in fade-in duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7">
                  <Card className="border-primary/10 rounded-[2rem] editorial-shadow bg-white overflow-hidden">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="font-headline italic text-2xl">Canales Digitales & Ubicación</CardTitle>
                      <CardDescription className="text-[10px] font-black uppercase tracking-widest">Gestión de atención al cliente</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary">
                              <Phone size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                            </div>
                            <Input value={globalSettings.whatsappNumber} onChange={e => setGlobalSettings({...globalSettings, whatsappNumber: e.target.value})} placeholder="Ej: 0987654321" />
                         </div>
                         <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary">
                              <Instagram size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Instagram URL</span>
                            </div>
                            <Input value={globalSettings.instagramUrl} onChange={e => setGlobalSettings({...globalSettings, instagramUrl: e.target.value})} placeholder="https://instagram.com/..." />
                         </div>
                         <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary">
                              <Facebook size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Facebook URL</span>
                            </div>
                            <Input value={globalSettings.facebookUrl} onChange={e => setGlobalSettings({...globalSettings, facebookUrl: e.target.value})} placeholder="https://facebook.com/..." />
                         </div>
                         <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary">
                              <MapPin size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Dirección Física</span>
                            </div>
                            <Input value={globalSettings.address} onChange={e => setGlobalSettings({...globalSettings, address: e.target.value})} placeholder="Calle y Número, Quito" />
                         </div>
                       </div>
                       <Button onClick={saveGlobal} disabled={loading} className="w-full bg-primary text-white h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl">
                          Sincronizar Canales de Contacto
                       </Button>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-10 bg-white rounded-[3rem] border border-primary/5 editorial-shadow space-y-8">
                     <h4 className="font-headline text-3xl italic">Social Preview</h4>
                     <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                          <Instagram className="text-primary" />
                          <div className="text-xs truncate font-medium text-zinc-500">{globalSettings.instagramUrl}</div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                          <Phone className="text-primary" />
                          <div className="text-xs font-bold text-zinc-900">{globalSettings.whatsappNumber}</div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                          <MapPin className="text-primary mt-1" />
                          <div className="text-xs font-bold text-zinc-900 leading-relaxed">{globalSettings.address}</div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </TabsContent>

          {/* SECTION: MODULARES / PROYECTOS */}
          <TabsContent value="modular" className="animate-in fade-in duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-4 space-y-6">
                 <Card className="border-primary/10 rounded-[2rem] editorial-shadow bg-white">
                   <CardHeader>
                     <CardTitle className="font-headline italic">Nuevo Proyecto Modular</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <Input placeholder="Título del Proyecto" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                      <Input placeholder="URL de Imagen (Proyecto Realizado)" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
                      <Textarea placeholder="Descripción del diseño e ingeniería..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                      <Button onClick={() => addItem('projects')} disabled={loading} className="w-full bg-primary text-white h-12 rounded-xl font-black uppercase text-[10px] tracking-widest">
                        Añadir al Portafolio
                      </Button>
                   </CardContent>
                 </Card>
               </div>
               <div className="lg:col-span-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map(p => (
                      <div key={p.id} className="bg-white p-4 rounded-3xl border border-primary/5 editorial-shadow flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-100 border border-primary/5">
                            {p.imageUrl && <img src={p.imageUrl} className="w-full h-full object-cover" alt={p.title} />}
                          </div>
                          <div>
                            <h5 className="font-bold text-sm tracking-tighter uppercase">{p.title}</h5>
                            <p className="text-[10px] text-zinc-400 line-clamp-2">{p.description}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeItem('projects', p.id)} className="text-zinc-200 hover:text-red-500">
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    ))}
                 </div>
               </div>
             </div>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}