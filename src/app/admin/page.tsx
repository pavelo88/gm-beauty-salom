
"use client"

import React, { useState, useEffect } from 'react';
import { 
  Settings, LogOut, Plus, Trash2, Loader2, Save, 
  Image as ImageIcon, FileText, Share2, Scissors, 
  ShoppingBag, Sofa, UtensilsCrossed 
} from 'lucide-react';
import { collection, addDoc, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    const fetchSettings = async () => {
      const docRef = doc(db, 'data', appId, 'settings', 'global');
      try {
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setGlobalSettings(snap.data());
        }
      } catch (e) {
        console.error("Error fetching settings", e);
      } finally {
        setGlobalLoading(false);
      }
    };
    fetchSettings();
  }, [db]);

  const saveGlobal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const docRef = doc(db, 'data', appId, 'settings', 'global');
    setDoc(docRef, globalSettings, { merge: true })
      .then(() => alert("Configuración global guardada con éxito"))
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: globalSettings,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => setLoading(false));
  };

  const addItem = async (collectionName: string) => {
    setLoading(true);
    const dataToSave = { ...form };
    if (!dataToSave.name && dataToSave.title) dataToSave.name = dataToSave.title;
    if (!dataToSave.title && dataToSave.name) dataToSave.title = dataToSave.name;
    
    const colRef = collection(db, 'data', appId, collectionName);
    addDoc(colRef, dataToSave)
      .then(() => {
        setForm({ name: '', price: '', description: '', category: '', imageUrl: '', title: '' });
        alert("Elemento añadido correctamente");
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: dataToSave,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => setLoading(false));
  };

  if (globalLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-body">
      {/* Navbar Editorial */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-2 rounded-lg text-black">
            <Settings size={20} />
          </div>
          <h1 className="font-headline font-bold text-xl uppercase tracking-widest text-white">GM Admin Hub</h1>
        </div>
        <Link href="/">
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-xs font-black tracking-widest uppercase">
            <LogOut size={16} className="mr-2" /> Salir del Panel
          </Button>
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto p-8 lg:p-12">
        <Tabs defaultValue="editorial" className="space-y-12">
          <TabsList className="bg-zinc-900/50 p-1 rounded-2xl border border-white/5 h-auto flex flex-wrap gap-2">
            <TabsTrigger value="editorial" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-xl px-6 py-3 font-bold uppercase text-[10px] tracking-widest">
              <FileText size={14} className="mr-2" /> Editorial / Global
            </TabsTrigger>
            <TabsTrigger value="boutique" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-xl px-6 py-3 font-bold uppercase text-[10px] tracking-widest">
              <ShoppingBag size={14} className="mr-2" /> Boutique & Moda
            </TabsTrigger>
            <TabsTrigger value="beauty" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-xl px-6 py-3 font-bold uppercase text-[10px] tracking-widest">
              <Scissors size={14} className="mr-2" /> Belleza / Salon
            </TabsTrigger>
            <TabsTrigger value="lounge" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-xl px-6 py-3 font-bold uppercase text-[10px] tracking-widest">
              <UtensilsCrossed size={14} className="mr-2" /> Lounge & Resto
            </TabsTrigger>
            <TabsTrigger value="alliance" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-xl px-6 py-3 font-bold uppercase text-[10px] tracking-widest">
              <Sofa size={14} className="mr-2" /> Modulares / Alianza
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-xl px-6 py-3 font-bold uppercase text-[10px] tracking-widest">
              <Share2 size={14} className="mr-2" /> Contacto & Redes
            </TabsTrigger>
          </TabsList>

          {/* EDITORIAL SETTINGS */}
          <TabsContent value="editorial" className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <form onSubmit={saveGlobal} className="space-y-8 bg-zinc-900/30 p-10 rounded-3xl border border-white/5">
                <h3 className="text-2xl font-headline font-bold text-white italic border-b border-white/10 pb-4">Identidad Visual (Hero)</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Título Monumental</label>
                    <Input 
                      className="bg-black/50 border-white/10 h-14 rounded-xl"
                      value={globalSettings.heroTitle} 
                      onChange={e => setGlobalSettings({...globalSettings, heroTitle: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Subtítulo Hero</label>
                    <Input 
                      className="bg-black/50 border-white/10 h-14 rounded-xl"
                      value={globalSettings.heroSubtitle} 
                      onChange={e => setGlobalSettings({...globalSettings, heroSubtitle: e.target.value})}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-headline font-bold text-white italic border-b border-white/10 pb-4 mt-12">Manifiesto GM</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Título Manifiesto</label>
                    <Input 
                      className="bg-black/50 border-white/10 h-14 rounded-xl"
                      value={globalSettings.manifestoTitle} 
                      onChange={e => setGlobalSettings({...globalSettings, manifestoTitle: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Cuerpo del Manifiesto</label>
                    <Textarea 
                      className="bg-black/50 border-white/10 min-h-[120px] rounded-xl resize-none"
                      value={globalSettings.manifestoText} 
                      onChange={e => setGlobalSettings({...globalSettings, manifestoText: e.target.value})}
                    />
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-transform">
                  {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} className="mr-2" /> Guardar Cambios Editoriales</>}
                </Button>
              </form>

              <div className="space-y-8">
                 <div className="bg-zinc-900/30 p-10 rounded-3xl border border-white/5 space-y-6">
                   <h3 className="text-2xl font-headline font-bold text-white italic">Vista Previa Editorial</h3>
                   <div className="p-8 border-l-4 border-primary bg-black/40 space-y-4">
                      <p className="text-4xl font-headline font-black text-white leading-none">{globalSettings.heroTitle}</p>
                      <p className="text-xs uppercase tracking-[0.4em] text-primary">{globalSettings.heroSubtitle}</p>
                   </div>
                   <div className="p-8 bg-zinc-800/40 rounded-2xl italic text-lg font-light">
                      "{globalSettings.manifestoTitle}"
                   </div>
                 </div>
              </div>
            </div>
          </TabsContent>

          {/* BOUTIQUE SETTINGS */}
          <TabsContent value="boutique" className="animate-in fade-in duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8 bg-zinc-900/30 p-10 rounded-3xl border border-white/5">
                  <h3 className="text-2xl font-headline font-bold text-white italic border-b border-white/10 pb-4">Nuevo Ítem Boutique</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Nombre Prenda/Perfume</label>
                      <Input 
                        className="bg-black/50 border-white/10 h-14 rounded-xl"
                        placeholder="Ej: Abrigo Hugo Boss"
                        value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Precio (Format: $0.00)</label>
                      <Input 
                        className="bg-black/50 border-white/10 h-14 rounded-xl"
                        placeholder="$120.00"
                        value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Categoría</label>
                      <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                        <SelectTrigger className="bg-black/50 border-white/10 h-14 rounded-xl">
                          <SelectValue placeholder="Seleccionar sección..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mujer">Revista Victoria (Mujer)</SelectItem>
                          <SelectItem value="hombre">Revista Hugo Boss (Hombre)</SelectItem>
                          <SelectItem value="perfumes">Esencias de Lujo (Perfumes)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">URL Imagen (FB Storage o Unsplash)</label>
                      <Input 
                        className="bg-black/50 border-white/10 h-14 rounded-xl"
                        placeholder="https://..."
                        value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Descripción Corta</label>
                      <Textarea 
                        className="bg-black/50 border-white/10 min-h-[100px] rounded-xl"
                        value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={() => addItem('products')} disabled={loading} className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-xl">
                    Añadir Ítem a Boutique
                  </Button>
                </div>

                <div className="space-y-8 bg-zinc-900/30 p-10 rounded-3xl border border-white/5">
                  <h3 className="text-2xl font-headline font-bold text-white italic border-b border-white/10 pb-4">Gestión de Catálogos PDF</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">URL Catálogo General (PDF)</label>
                      <div className="flex gap-2">
                        <Input 
                          className="bg-black/50 border-white/10 h-14 rounded-xl flex-grow"
                          placeholder="https://tu-storage.com/catalogo.pdf"
                          value={globalSettings.catalogUrl} 
                          onChange={e => setGlobalSettings({...globalSettings, catalogUrl: e.target.value})}
                        />
                        <Button onClick={saveGlobal} className="h-14 bg-white/5 border border-white/10">Sincronizar</Button>
                      </div>
                      <p className="text-[10px] text-zinc-500 italic mt-2">Este enlace habilitará los botones de descarga en la sección de Boutique.</p>
                    </div>
                  </div>
                </div>
             </div>
          </TabsContent>

          {/* BELLEZA / SALON SETTINGS */}
          <TabsContent value="beauty" className="animate-in fade-in duration-500">
             <div className="grid grid-cols-1 gap-12">
                <div className="bg-zinc-900/30 p-10 rounded-3xl border border-white/5 space-y-8">
                  <h3 className="text-2xl font-headline font-bold text-white italic border-b border-white/10 pb-4">Gestión de Servicios de Autor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Nombre del Servicio</label>
                      <Input className="bg-black/50 border-white/10 h-14 rounded-xl" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Precio / Desde</label>
                      <Input className="bg-black/50 border-white/10 h-14 rounded-xl" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Categoría</label>
                      <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                        <SelectTrigger className="bg-black/50 border-white/10 h-14 rounded-xl">
                          <SelectValue placeholder="Concepto..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salon">Le Salon (Mujer)</SelectItem>
                          <SelectItem value="barberia">Barber Shop (Hombre)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="lg:col-span-3 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40">URL Imagen de Impacto</label>
                      <Input className="bg-black/50 border-white/10 h-14 rounded-xl" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
                    </div>
                    <div className="lg:col-span-3">
                      <Button onClick={() => addItem('services')} disabled={loading} className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-xl">
                        Registrar Servicio en el Archivo
                      </Button>
                    </div>
                  </div>
                </div>
             </div>
          </TabsContent>

          {/* SOCIAL & CONTACT SETTINGS */}
          <TabsContent value="social" className="animate-in fade-in duration-500">
             <div className="bg-zinc-900/30 p-10 rounded-3xl border border-white/5 space-y-8">
               <h3 className="text-2xl font-headline font-bold text-white italic border-b border-white/10 pb-4">Canales de Contacto y Ubicación</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest opacity-40">WhatsApp de Agendamiento</label>
                   <Input className="bg-black/50 border-white/10 h-14 rounded-xl" value={globalSettings.whatsappNumber} onChange={e => setGlobalSettings({...globalSettings, whatsappNumber: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Instagram URL</label>
                   <Input className="bg-black/50 border-white/10 h-14 rounded-xl" value={globalSettings.instagramUrl} onChange={e => setGlobalSettings({...globalSettings, instagramUrl: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Facebook URL</label>
                   <Input className="bg-black/50 border-white/10 h-14 rounded-xl" value={globalSettings.facebookUrl} onChange={e => setGlobalSettings({...globalSettings, facebookUrl: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Dirección Física (Quito Sur)</label>
                   <Input className="bg-black/50 border-white/10 h-14 rounded-xl" value={globalSettings.address} onChange={e => setGlobalSettings({...globalSettings, address: e.target.value})} />
                 </div>
                 <div className="md:col-span-2">
                    <Button onClick={saveGlobal} disabled={loading} className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-xl">
                      Actualizar Canales de Contacto
                    </Button>
                 </div>
               </div>
             </div>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
