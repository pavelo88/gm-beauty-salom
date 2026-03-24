
"use client"

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Eye, Loader2, Save, X, Edit3, Trash2
} from 'lucide-react';
import { collection, addDoc, deleteDoc, doc, setDoc, getDoc, query, onSnapshot } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from '@/components/ui/card';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Link from 'next/link';

// Componentes Editores Gemelos
import { HomeEditor } from './components/HomeEditor';
import { BeautyEditor } from './components/BeautyEditor';
import { BoutiqueEditor } from './components/BoutiqueEditor';
import { AllianceEditor } from './components/AllianceEditor';
import { LoungeEditor } from './components/LoungeEditor';
import { TvEditor } from './components/TvEditor';
import { ContactEditor } from './components/ContactEditor';

export default function AdminPage() {
  const db = useFirestore();
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [globalSettings, setGlobalSettings] = useState<any>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const [services, setServices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const [form, setForm] = useState({ 
    name: '', price: '', description: '', category: '', imageUrl: '', title: '' 
  });

  const appId = 'gm-beauty-house-v1';

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'data', appId, 'settings', 'global');
      try {
        const snap = await getDoc(docRef);
        if (snap.exists()) setGlobalSettings(snap.data());
      } catch (e) { console.error("Error loading settings:", e); }
      finally { setGlobalLoading(false); }
    };
    fetchSettings();

    const unsubServices = onSnapshot(query(collection(db, 'data', appId, 'services')), (s) => setServices(s.docs.map(d => ({...d.data(), id: d.id}))));
    const unsubProducts = onSnapshot(query(collection(db, 'data', appId, 'products')), (s) => setProducts(s.docs.map(d => ({...d.data(), id: d.id}))));
    const unsubProjects = onSnapshot(query(collection(db, 'data', appId, 'projects')), (s) => setProjects(s.docs.map(d => ({...d.data(), id: d.id}))));
    const unsubMenu = onSnapshot(query(collection(db, 'data', appId, 'menu')), (s) => setMenuItems(s.docs.map(d => ({...d.data(), id: d.id}))));

    return () => {
      unsubServices(); unsubProducts(); unsubProjects(); unsubMenu();
    };
  }, [db]);

  const saveGlobal = async () => {
    setLoading(true);
    const docRef = doc(db, 'data', appId, 'settings', 'global');
    try {
      await setDoc(docRef, globalSettings, { merge: true });
      alert("Sincronización editorial exitosa.");
    } catch (err: any) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: docRef.path, operation: 'update', requestResourceData: globalSettings
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (colName: string) => {
    setLoading(true);
    const data = { ...form };
    if (!data.name && data.title) data.name = data.title;
    if (!data.title && data.name) data.title = data.name;
    
    try {
      if (editingId) {
        const docRef = doc(db, 'data', appId, colName, editingId);
        await setDoc(docRef, data, { merge: true });
        setEditingId(null);
      } else {
        const colRef = collection(db, 'data', appId, colName);
        await addDoc(colRef, data);
      }
      setForm({ name: '', price: '', description: '', category: '', imageUrl: '', title: '' });
    } catch (err: any) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: `data/${appId}/${colName}`, operation: editingId ? 'update' : 'create', requestResourceData: data
      }));
    } finally {
      setLoading(false);
    }
  };

  const editItem = (item: any) => {
    setForm({
      name: item.name || '',
      title: item.title || '',
      price: item.price || '',
      description: item.description || '',
      category: item.category || '',
      imageUrl: item.imageUrl || ''
    });
    setEditingId(item.id);
  };

  const cancelEdit = () => {
    setForm({ name: '', price: '', description: '', category: '', imageUrl: '', title: '' });
    setEditingId(null);
  };

  const removeItem = async (colName: string, id: string) => {
    if (!confirm("¿Eliminar permanentemente?")) return;
    try {
      await deleteDoc(doc(db, 'data', appId, colName, id));
    } catch (err) {
      console.error(err);
    }
  };

  if (globalLoading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 bg-card border-b p-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-3 rounded-2xl text-primary-foreground shadow-lg"><LayoutDashboard size={24} /></div>
          <div>
            <h1 className="font-headline font-black text-3xl uppercase tracking-tighter">Admin Master Hub</h1>
            <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted-foreground">Sistema de Control Editorial GM</p>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link href="/" className="flex-1 md:flex-none">
            <Button variant="outline" className="w-full rounded-full text-[10px] font-black uppercase px-8 h-12">
              <Eye size={16} className="mr-2" /> Ver Web
            </Button>
          </Link>
          <Button onClick={saveGlobal} disabled={loading} className="flex-1 md:flex-none h-12 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase px-12 shadow-xl">
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={16} className="mr-2" /> Guardar Todo</>}
          </Button>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto p-6 md:p-12 space-y-12 pb-32">
        <Tabs defaultValue="home" className="space-y-12">
          <TabsList className="bg-muted/40 p-2 rounded-3xl border h-auto grid grid-cols-2 md:grid-cols-7 gap-3 shadow-sm">
            <TabsTrigger value="home" className="rounded-2xl py-4 font-black uppercase text-[9px] tracking-widest">Inicio</TabsTrigger>
            <TabsTrigger value="beauty" className="rounded-2xl py-4 font-black uppercase text-[9px] tracking-widest">Belleza</TabsTrigger>
            <TabsTrigger value="boutique" className="rounded-2xl py-4 font-black uppercase text-[9px] tracking-widest">Boutique</TabsTrigger>
            <TabsTrigger value="modular" className="rounded-2xl py-4 font-black uppercase text-[9px] tracking-widest">Alianza</TabsTrigger>
            <TabsTrigger value="lounge" className="rounded-2xl py-4 font-black uppercase text-[9px] tracking-widest">Lounge</TabsTrigger>
            <TabsTrigger value="tv" className="rounded-2xl py-4 font-black uppercase text-[9px] tracking-widest">GM TV</TabsTrigger>
            <TabsTrigger value="contact" className="rounded-2xl py-4 font-black uppercase text-[9px] tracking-widest">Canales</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="animate-in fade-in duration-700">
            <HomeEditor settings={globalSettings} setSettings={setGlobalSettings} />
          </TabsContent>

          <TabsContent value="beauty" className="space-y-12 animate-in fade-in duration-700">
            <BeautyEditor settings={globalSettings} setSettings={setGlobalSettings} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Card className="p-8 rounded-[3rem] border shadow-2xl space-y-6 sticky top-32">
                  <h3 className="font-headline italic text-3xl">{editingId ? "Editar Servicio" : "Nuevo Servicio"}</h3>
                  <div className="space-y-4">
                    <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="h-12 rounded-xl" />
                    <Input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="h-12 rounded-xl" />
                    <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                      <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Categoría" /></SelectTrigger>
                      <SelectContent><SelectItem value="salon">Salon</SelectItem><SelectItem value="barberia">Barbería</SelectItem></SelectContent>
                    </Select>
                    <Input placeholder="Imagen URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="h-12 rounded-xl" />
                    <Textarea placeholder="Descripción..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="min-h-[120px] rounded-2xl" />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => handleAction('services')} disabled={loading} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest">{editingId ? "Actualizar" : "Publicar"}</Button>
                    {editingId && <Button variant="outline" onClick={cancelEdit} className="h-14 rounded-2xl px-6"><X /></Button>}
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(s => (
                  <div key={s.id} className="bg-card p-6 rounded-3xl border flex items-center justify-between group">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-muted"><img src={s.imageUrl} className="w-full h-full object-cover" /></div>
                      <div><h5 className="font-bold text-sm uppercase">{s.name}</h5><p className="text-[10px] opacity-50 uppercase mt-1">{s.category} • {s.price}</p></div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => editItem(s)} className="rounded-full"><Edit3 size={18}/></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem('services', s.id)} className="rounded-full"><Trash2 size={18}/></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="boutique" className="space-y-12 animate-in fade-in duration-700">
            <BoutiqueEditor settings={globalSettings} setSettings={setGlobalSettings} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Card className="p-8 rounded-[3rem] border shadow-2xl space-y-6 sticky top-32">
                  <h3 className="font-headline italic text-3xl">{editingId ? "Editar Pieza" : "Nueva Pieza"}</h3>
                  <div className="space-y-4">
                    <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="h-12 rounded-xl" />
                    <Input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="h-12 rounded-xl" />
                    <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                      <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Categoría" /></SelectTrigger>
                      <SelectContent><SelectItem value="mujer">Mujer</SelectItem><SelectItem value="hombre">Hombre</SelectItem><SelectItem value="perfumes">Perfumes</SelectItem></SelectContent>
                    </Select>
                    <Input placeholder="Imagen URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="h-12 rounded-xl" />
                    <Textarea placeholder="Descripción..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="min-h-[120px] rounded-2xl" />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => handleAction('products')} disabled={loading} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest">{editingId ? "Actualizar" : "Publicar"}</Button>
                    {editingId && <Button variant="outline" onClick={cancelEdit} className="h-14 rounded-2xl px-6"><X /></Button>}
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map(p => (
                  <div key={p.id} className="bg-card p-6 rounded-3xl border flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-20 rounded-2xl overflow-hidden bg-muted"><img src={p.imageUrl} className="w-full h-full object-cover" /></div>
                      <div><h5 className="font-bold text-sm uppercase">{p.name}</h5><p className="text-[10px] opacity-50 uppercase mt-1">{p.category} • {p.price}</p></div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => editItem(p)} className="rounded-full"><Edit3 size={18}/></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem('products', p.id)} className="rounded-full"><Trash2 size={18}/></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="modular" className="animate-in fade-in duration-700">
            <AllianceEditor settings={globalSettings} setSettings={setGlobalSettings} />
          </TabsContent>

          <TabsContent value="lounge" className="animate-in fade-in duration-700">
            <LoungeEditor settings={globalSettings} setSettings={setGlobalSettings} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
              <div className="lg:col-span-4">
                <Card className="p-8 rounded-[3rem] border shadow-2xl space-y-6">
                  <h3 className="font-headline italic text-3xl">{editingId ? "Editar Ítem" : "Nuevo Menú"}</h3>
                  <div className="space-y-4">
                    <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="h-12 rounded-xl" />
                    <Input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="h-12 rounded-xl" />
                    <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                      <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Categoría" /></SelectTrigger>
                      <SelectContent><SelectItem value="Comida">Comida</SelectItem><SelectItem value="Bebidas">Bebidas</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => handleAction('menu')} disabled={loading} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest">{editingId ? "Actualizar" : "Publicar"}</Button>
                    {editingId && <Button variant="outline" onClick={cancelEdit} className="h-14 rounded-2xl px-6"><X /></Button>}
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuItems.map(m => (
                  <div key={m.id} className="bg-card p-6 rounded-3xl border flex items-center justify-between">
                    <div><h5 className="font-bold text-sm uppercase">{m.name}</h5><p className="text-[10px] opacity-50 uppercase mt-1">{m.category} • {m.price}</p></div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => editItem(m)} className="rounded-full"><Edit3 size={18}/></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem('menu', m.id)} className="rounded-full"><Trash2 size={18}/></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tv" className="animate-in fade-in duration-700">
            <TvEditor settings={globalSettings} setSettings={setGlobalSettings} />
          </TabsContent>

          <TabsContent value="contact" className="animate-in fade-in duration-700">
            <ContactEditor settings={globalSettings} setSettings={setGlobalSettings} />
          </TabsContent>
        </Tabs>
      </nav>
    </div>
  );
}
