
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
import { SectionEditor } from './components/SectionEditor';

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
      alert("Configuración global sincronizada.");
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
    if (!confirm("¿Eliminar este registro?")) return;
    try {
      await deleteDoc(doc(db, 'data', appId, colName, id));
    } catch (err) {
      console.error(err);
    }
  };

  if (globalLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card border-b p-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-lg"><LayoutDashboard size={20} /></div>
          <div>
            <h1 className="font-headline font-black text-2xl uppercase tracking-tighter">Admin Master Hub</h1>
            <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted-foreground">Control Total Editorial</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/"><Button variant="outline" className="rounded-full text-[10px] font-black uppercase px-6 h-11"><Eye size={14} className="mr-2" /> Ver Web</Button></Link>
          <Button onClick={saveGlobal} disabled={loading} className="h-11 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase px-10">
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={14} className="mr-2" /> Guardar Cambios</>}
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-10">
        <Tabs defaultValue="home" className="space-y-10">
          <TabsList className="bg-muted/40 p-1 rounded-2xl border h-auto grid grid-cols-2 md:grid-cols-6 gap-2">
            <TabsTrigger value="home" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-widest">Inicio</TabsTrigger>
            <TabsTrigger value="beauty" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-widest">Belleza</TabsTrigger>
            <TabsTrigger value="boutique" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-widest">Boutique</TabsTrigger>
            <TabsTrigger value="lounge" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-widest">Lounge</TabsTrigger>
            <TabsTrigger value="modular" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-widest">Modulares</TabsTrigger>
            <TabsTrigger value="contact" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-widest">Canales</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-in fade-in duration-500">
            <SectionEditor title="Hero Principal" prefix="hero" description="Portada Editorial" settings={globalSettings} setSettings={setGlobalSettings} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SectionEditor title="Belleza" prefix="homeBeauty" description="Salón & Barbería" settings={globalSettings} setSettings={setGlobalSettings} />
              <SectionEditor title="Boutique" prefix="homeBoutique" description="Moda & Perfumes" settings={globalSettings} setSettings={setGlobalSettings} />
              <SectionEditor title="Alianza" prefix="homeAlliance" description="Interiorismo GM" settings={globalSettings} setSettings={setGlobalSettings} />
              <SectionEditor title="Entretenimiento" prefix="homeTv" description="GM TV Hub" settings={globalSettings} setSettings={setGlobalSettings} />
            </div>
          </TabsContent>

          <TabsContent value="beauty" className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <Card className="p-6 rounded-[2rem] border shadow-xl space-y-4">
                  <h3 className="font-headline italic text-2xl">{editingId ? "Editar Servicio" : "Nuevo Servicio"}</h3>
                  <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <Input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                  <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                    <SelectTrigger><SelectValue placeholder="Categoría" /></SelectTrigger>
                    <SelectContent><SelectItem value="salon">Le Salon</SelectItem><SelectItem value="barberia">Barber Shop</SelectItem></SelectContent>
                  </Select>
                  <Input placeholder="URL Imagen" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
                  <Textarea placeholder="Descripción..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                  <div className="flex gap-2">
                    <Button onClick={() => handleAction('services')} disabled={loading} className="flex-1">{editingId ? "Actualizar" : "Crear"}</Button>
                    {editingId && <Button variant="outline" onClick={cancelEdit}><X /></Button>}
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(s => (
                  <div key={s.id} className="bg-card p-4 rounded-2xl border flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted"><img src={s.imageUrl} className="w-full h-full object-cover" /></div>
                      <div><h5 className="font-bold text-sm">{s.name}</h5><p className="text-[10px] opacity-50">{s.category} • {s.price}</p></div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => editItem(s)}><Edit3 size={16}/></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem('services', s.id)} className="text-destructive"><Trash2 size={16}/></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="boutique" className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <Card className="p-6 rounded-[2rem] border shadow-xl space-y-4">
                  <h3 className="font-headline italic text-2xl">{editingId ? "Editar Pieza" : "Nueva Pieza Boutique"}</h3>
                  <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <Input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                  <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                    <SelectTrigger><SelectValue placeholder="Categoría" /></SelectTrigger>
                    <SelectContent><SelectItem value="mujer">Mujer</SelectItem><SelectItem value="hombre">Hombre</SelectItem><SelectItem value="perfumes">Perfumes</SelectItem></SelectContent>
                  </Select>
                  <Input placeholder="URL Imagen" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
                  <Textarea placeholder="Descripción..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                  <div className="flex gap-2">
                    <Button onClick={() => handleAction('products')} disabled={loading} className="flex-1">{editingId ? "Actualizar" : "Crear"}</Button>
                    {editingId && <Button variant="outline" onClick={cancelEdit}><X /></Button>}
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map(p => (
                  <div key={p.id} className="bg-card p-4 rounded-2xl border flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 rounded-xl overflow-hidden bg-muted"><img src={p.imageUrl} className="w-full h-full object-cover" /></div>
                      <div><h5 className="font-bold text-sm">{p.name}</h5><p className="text-[10px] opacity-50">{p.category} • {p.price}</p></div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => editItem(p)}><Edit3 size={16}/></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem('products', p.id)} className="text-destructive"><Trash2 size={16}/></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
