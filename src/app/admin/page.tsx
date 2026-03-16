"use client"

import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Loader2, Save, 
  FileText, ShoppingBag, Scissors, 
  UtensilsCrossed, Sofa, LayoutDashboard, 
  Eye, MapPin, Share2, Edit3, X, Download
} from 'lucide-react';
import { collection, addDoc, deleteDoc, doc, setDoc, getDoc, query, onSnapshot } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Link from 'next/link';

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
        if (snap.exists()) setGlobalSettings(snap.data());
      } catch (e) { console.error(e); }
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
    setDoc(docRef, globalSettings, { merge: true })
      .then(() => alert("Inicio sincronizado correctamente."))
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
    
    if (editingId) {
      const docRef = doc(db, 'data', appId, colName, editingId);
      setDoc(docRef, data, { merge: true })
        .then(() => {
          setForm({ name: '', price: '', description: '', category: '', imageUrl: '', title: '' });
          setEditingId(null);
        })
        .catch(async (err) => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: docRef.path, operation: 'update', requestResourceData: data
          }));
        })
        .finally(() => setLoading(false));
    } else {
      const colRef = collection(db, 'data', appId, colName);
      addDoc(colRef, data)
        .then(() => {
          setForm({ name: '', price: '', description: '', category: '', imageUrl: '', title: '' });
        })
        .catch(async (err) => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: colRef.path, operation: 'create', requestResourceData: data
          }));
        })
        .finally(() => setLoading(false));
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setForm({ name: '', price: '', description: '', category: '', imageUrl: '', title: '' });
    setEditingId(null);
  };

  const removeItem = async (colName: string, id: string) => {
    if (!confirm("¿Eliminar del archivo?")) return;
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

  const SectionEditor = ({ title, prefix, description }: { title: string, prefix: string, description: string }) => (
    <Card className="border-primary/10 rounded-3xl overflow-hidden shadow-sm bg-white mb-6">
      <CardHeader className="bg-primary/5 pb-6">
        <CardTitle className="font-headline italic text-xl">{title}</CardTitle>
        <CardDescription className="text-[9px] uppercase tracking-widest font-bold">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground ml-1">Título de Sección</label>
            <Input value={globalSettings[`${prefix}Title`] || ''} onChange={e => setGlobalSettings({...globalSettings, [`${prefix}Title`]: e.target.value})} placeholder="Ej: Archivo de Belleza" />
          </div>
          <div className="space-y-2">
            <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subtítulo</label>
            <Input value={globalSettings[`${prefix}Subtitle`] || ''} onChange={e => setGlobalSettings({...globalSettings, [`${prefix}Subtitle`]: e.target.value})} placeholder="Ej: Salón & Barbería" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground ml-1">Imagen de Impacto (URL)</label>
          <Input value={globalSettings[`${prefix}Image`] || ''} onChange={e => setGlobalSettings({...globalSettings, [`${prefix}Image`]: e.target.value})} placeholder="https://..." />
        </div>
        <div className="space-y-2">
          <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground ml-1">Texto Descriptivo</label>
          <Textarea value={globalSettings[`${prefix}Text`] || ''} onChange={e => setGlobalSettings({...globalSettings, [`${prefix}Text`]: e.target.value})} placeholder="Describe la propuesta de valor..." />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-body pb-20">
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border p-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-2 rounded-xl text-primary-foreground">
            <LayoutDashboard size={18} />
          </div>
          <div>
            <h1 className="font-headline font-black text-xl uppercase tracking-tighter">Admin Hub</h1>
            <p className="text-[7px] uppercase tracking-[0.4em] font-bold text-muted-foreground">GM Beauty House • Quito Sur</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link href="/" className="flex-1 md:flex-none">
            <Button variant="outline" className="w-full h-10 rounded-full text-[9px] font-black uppercase tracking-widest px-6">
              <Eye size={14} className="mr-2" /> Ver Sitio
            </Button>
          </Link>
          <Button onClick={saveGlobal} disabled={loading} className="flex-1 md:flex-none h-10 bg-primary text-primary-foreground rounded-full text-[9px] font-black uppercase tracking-widest px-8 shadow-lg shadow-primary/20">
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={14} className="mr-2" /> Sincronizar Hub</>}
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-10">
        <Tabs defaultValue="home" className="space-y-8">
          <TabsList className="bg-muted/60 backdrop-blur p-1 rounded-2xl border border-border h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
            <TabsTrigger value="home" className="rounded-xl py-2.5 font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText size={12} className="mr-2" /> Inicio
            </TabsTrigger>
            <TabsTrigger value="beauty" className="rounded-xl py-2.5 font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Scissors size={12} className="mr-2" /> Belleza
            </TabsTrigger>
            <TabsTrigger value="boutique" className="rounded-xl py-2.5 font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShoppingBag size={12} className="mr-2" /> Boutique
            </TabsTrigger>
            <TabsTrigger value="lounge" className="rounded-xl py-2.5 font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <UtensilsCrossed size={12} className="mr-2" /> Lounge
            </TabsTrigger>
            <TabsTrigger value="modular" className="rounded-xl py-2.5 font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sofa size={12} className="mr-2" /> Modulares
            </TabsTrigger>
            <TabsTrigger value="contact" className="rounded-xl py-2.5 font-black uppercase text-[8px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Share2 size={12} className="mr-2" /> Contacto
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <Card className="border-border rounded-3xl overflow-hidden shadow-sm bg-card">
              <CardHeader className="bg-primary/5 pb-6">
                <CardTitle className="font-headline italic text-xl">1. Héroe de Portada</CardTitle>
                <CardDescription className="text-[9px] uppercase tracking-widest font-bold">Impacto Inicial</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground ml-1">Título Monumental</label>
                    <Input value={globalSettings.heroTitle || ''} onChange={e => setGlobalSettings({...globalSettings, heroTitle: e.target.value})} placeholder="Ej: GM HOUSE" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subtítulo</label>
                    <Input value={globalSettings.heroSubtitle || ''} onChange={e => setGlobalSettings({...globalSettings, heroSubtitle: e.target.value})} placeholder="Frase de entrada..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground ml-1">Imagen Hero (URL)</label>
                  <Input value={globalSettings.heroImage || ''} onChange={e => setGlobalSettings({...globalSettings, heroImage: e.target.value})} placeholder="URL de la imagen de portada" />
                </div>
              </CardContent>
            </Card>
            <SectionEditor title="2. Belleza" prefix="homeBeauty" description="Propuesta Salón & Barbería" />
            <SectionEditor title="3. Moda" prefix="homeBoutique" description="Propuesta Boutique" />
            <SectionEditor title="4. Modulares" prefix="homeAlliance" description="Propuesta Mobiliario" />
            <SectionEditor title="5. Lounge" prefix="homeTv" description="Propuesta Entretenimiento" />
            <Card className="border-border rounded-3xl overflow-hidden shadow-sm bg-card">
              <CardHeader className="bg-primary/5 pb-6">
                <CardTitle className="font-headline italic text-xl">6. Manifiesto</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <Input value={globalSettings.manifestoTitle || ''} onChange={e => setGlobalSettings({...globalSettings, manifestoTitle: e.target.value})} placeholder="Título manifiesto" />
                <Textarea value={globalSettings.manifestoText || ''} onChange={e => setGlobalSettings({...globalSettings, manifestoText: e.target.value})} placeholder="Texto manifiesto" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="beauty">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <Card className="border-border rounded-3xl bg-card sticky top-24">
                  <CardHeader><CardTitle className="font-headline italic text-lg">{editingId ? "Editar Servicio" : "Nuevo Servicio"}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <Input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                    <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder="Categoría" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salon">Le Salon</SelectItem>
                        <SelectItem value="barberia">Barber Shop</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Imagen URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
                    <Textarea placeholder="Descripción" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                    <div className="flex gap-2">
                      <Button onClick={() => addItem('services')} className="flex-1 rounded-xl text-[9px] font-black uppercase tracking-widest h-11">
                        {editingId ? "Actualizar" : "Añadir"}
                      </Button>
                      {editingId && <Button onClick={cancelEdit} variant="outline" className="rounded-xl"><X size={14}/></Button>}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(s => (
                  <div key={s.id} className="bg-card p-4 rounded-2xl border flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <img src={s.imageUrl} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="text-[8px] font-black uppercase text-primary">{s.category}</p>
                        <h5 className="font-bold text-xs uppercase">{s.name}</h5>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => editItem(s)}><Edit3 size={14} /></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem('services', s.id)} className="text-red-500"><Trash2 size={14} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="boutique">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <Card className="border-border rounded-3xl bg-card sticky top-24">
                  <CardHeader><CardTitle className="font-headline italic text-lg">{editingId ? "Editar Ítem" : "Nuevo Ítem Moda"}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <Input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                    <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder="Tipo" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mujer">Victoria (Mujer)</SelectItem>
                        <SelectItem value="hombre">Hugo Boss (Hombre)</SelectItem>
                        <SelectItem value="perfumes">Perfumes</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Imagen URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
                    <Textarea placeholder="Descripción" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                    <div className="flex gap-2">
                      <Button onClick={() => addItem('products')} className="flex-1 rounded-xl text-[9px] font-black uppercase tracking-widest h-11">
                        {editingId ? "Actualizar" : "Añadir"}
                      </Button>
                      {editingId && <Button onClick={cancelEdit} variant="outline" className="rounded-xl"><X size={14}/></Button>}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map(p => (
                  <div key={p.id} className="bg-card p-4 rounded-2xl border flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <img src={p.imageUrl} className="w-12 h-16 rounded-lg object-cover" />
                      <div>
                        <p className="text-[8px] font-black uppercase text-primary">{p.category}</p>
                        <h5 className="font-bold text-xs uppercase">{p.name}</h5>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => editItem(p)}><Edit3 size={14} /></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem('products', p.id)} className="text-red-500"><Trash2 size={14} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lounge">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <Card className="border-border rounded-3xl bg-card sticky top-24">
                  <CardHeader><CardTitle className="font-headline italic text-lg">{editingId ? "Editar Plato" : "Nuevo Plato/Bebida"}</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <Input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                    <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder="Tipo" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Comida">Comida</SelectItem>
                        <SelectItem value="Bebidas">Bebidas</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Button onClick={() => addItem('menu')} className="flex-1 rounded-xl text-[9px] font-black uppercase tracking-widest h-11">
                        {editingId ? "Actualizar" : "Añadir"}
                      </Button>
                      {editingId && <Button onClick={cancelEdit} variant="outline" className="rounded-xl"><X size={14}/></Button>}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.map(m => (
                  <div key={m.id} className="bg-card p-4 rounded-2xl border flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-black uppercase text-primary">{m.category}</p>
                      <h5 className="font-bold text-xs uppercase">{m.name}</h5>
                      <p className="text-xs font-bold text-zinc-400">{m.price}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => editItem(m)}><Edit3 size={14} /></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem('menu', m.id)} className="text-red-500"><Trash2 size={14} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="border-border rounded-3xl bg-card max-w-2xl">
              <CardHeader><CardTitle className="font-headline italic text-xl">Canales Digitales</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input value={globalSettings.whatsappNumber || ''} onChange={e => setGlobalSettings({...globalSettings, whatsappNumber: e.target.value})} placeholder="WhatsApp" />
                  <Input value={globalSettings.instagramUrl || ''} onChange={e => setGlobalSettings({...globalSettings, instagramUrl: e.target.value})} placeholder="Instagram" />
                  <Input value={globalSettings.facebookUrl || ''} onChange={e => setGlobalSettings({...globalSettings, facebookUrl: e.target.value})} placeholder="Facebook" />
                  <Input value={globalSettings.address || ''} onChange={e => setGlobalSettings({...globalSettings, address: e.target.value})} placeholder="Dirección" />
                  <Input value={globalSettings.catalogUrl || ''} onChange={e => setGlobalSettings({...globalSettings, catalogUrl: e.target.value})} placeholder="Enlace Revista PDF (Boutique)" />
                </div>
                <Button onClick={saveGlobal} className="w-full rounded-xl text-[9px] font-black uppercase tracking-widest h-12">Actualizar Contacto</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}