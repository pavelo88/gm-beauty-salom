"use client"

import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Loader2, Save, 
  FileText, ShoppingBag, Scissors, 
  UtensilsCrossed, Sofa, LayoutDashboard, 
  Eye, Share2, Edit3, X, CheckCircle2,
  ChevronRight, Smartphone, MessageCircle
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
import { cn } from '@/lib/utils';

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
      .then(() => alert("Configuración sincronizada con éxito."))
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
    // Normalizar name/title
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
    if (!confirm("¿Deseas eliminar este registro de forma permanente?")) return;
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
    <Card className="border-border rounded-3xl overflow-hidden shadow-sm bg-card mb-8">
      <CardHeader className="bg-primary/5 pb-6">
        <CardTitle className="font-headline italic text-xl">{title}</CardTitle>
        <CardDescription className="text-[9px] uppercase tracking-widest font-bold">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Título Editorial</label>
            <Input 
              value={globalSettings[`${prefix}Title`] || ''} 
              onChange={e => setGlobalSettings({...globalSettings, [`${prefix}Title`]: e.target.value})} 
              placeholder="Ej: Archivo de Belleza" 
              className="rounded-xl h-12"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subtítulo o Categoría</label>
            <Input 
              value={globalSettings[`${prefix}Subtitle`] || ''} 
              onChange={e => setGlobalSettings({...globalSettings, [`${prefix}Subtitle`]: e.target.value})} 
              placeholder="Ej: Salón & Barbería" 
              className="rounded-xl h-12"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Imagen de Impacto (URL)</label>
          <Input 
            value={globalSettings[`${prefix}Image`] || ''} 
            onChange={e => setGlobalSettings({...globalSettings, [`${prefix}Image`]: e.target.value})} 
            className="rounded-xl h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Texto Narrativo</label>
          <Textarea 
            value={globalSettings[`${prefix}Text`] || ''} 
            onChange={e => setGlobalSettings({...globalSettings, [`${prefix}Text`]: e.target.value})} 
            className="rounded-xl min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-body pb-20">
      <nav className="sticky top-0 z-50 bg-card border-b border-border p-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-lg">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="font-headline font-black text-2xl uppercase tracking-tighter">Admin Master Hub</h1>
            <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted-foreground">GM Beauty House • Sincronización 100%</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="outline" className="rounded-full text-[10px] font-black uppercase tracking-widest px-6 h-11">
              <Eye size={14} className="mr-2" /> Ver Sitio
            </Button>
          </Link>
          <Button onClick={saveGlobal} disabled={loading} className="h-11 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-widest px-10 shadow-lg shadow-primary/20">
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={14} className="mr-2" /> Sincronizar Cambios</>}
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-10">
        <Tabs defaultValue="home" className="space-y-10">
          <TabsList className="bg-muted/40 p-1 rounded-2xl border border-border h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <TabsTrigger value="home" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em]">Inicio</TabsTrigger>
            <TabsTrigger value="beauty" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em]">Belleza</TabsTrigger>
            <TabsTrigger value="boutique" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em]">Boutique</TabsTrigger>
            <TabsTrigger value="lounge" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em]">Lounge</TabsTrigger>
            <TabsTrigger value="modular" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em]">Modulares</TabsTrigger>
            <TabsTrigger value="contact" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em]">Contacto</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-in fade-in duration-500">
            <SectionEditor title="1. Hero de Portada" prefix="hero" description="Impacto Principal" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SectionEditor title="2. Sección Belleza" prefix="homeBeauty" description="Propuesta Salón & Barbería" />
              <SectionEditor title="3. Sección Moda" prefix="homeBoutique" description="Propuesta Boutique & Perfumes" />
              <SectionEditor title="4. Sección Modulares" prefix="homeAlliance" description="Propuesta Alianza Mobiliario" />
              <SectionEditor title="5. Sección Entretenimiento" prefix="homeTv" description="Propuesta Lounge & TV" />
            </div>
            <SectionEditor title="6. Manifiesto Final" prefix="manifesto" description="Cierre Editorial" />
          </TabsContent>

          <TabsContent value="beauty" className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <Card className="border-border rounded-[2rem] bg-card sticky top-24 shadow-xl p-6">
                  <h3 className="font-headline italic text-2xl mb-6">{editingId ? "Editar Servicio" : "Nuevo Servicio"}</h3>
                  <div className="space-y-4">
                    <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="h-12" />
                    <Input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="h-12" />
                    <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                      <SelectTrigger className="h-12"><SelectValue placeholder="Categoría" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salon">Le Salon (Mujer)</SelectItem>
                        <SelectItem value="barberia">Barber Shop (Hombre)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="URL Imagen" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="h-12" />
                    <Textarea placeholder="Descripción..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="min-h-[100px]" />
                    <div className="flex gap-2">
                      <Button onClick={() => addItem('services')} className="flex-1 h-12 rounded-xl font-black uppercase text-[10px]">
                        {editingId ? "Actualizar" : "Añadir"}
                      </Button>
                      {editingId && <Button onClick={cancelEdit} variant="outline" className="h-12 w-12"><X/></Button>}
                    </div>
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(s => (
                  <div key={s.id} className="bg-card p-4 rounded-2xl border border-border flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden"><img src={s.imageUrl} className="w-full h-full object-cover" /></div>
                      <div>
                        <h5 className="font-bold text-sm uppercase">{s.name}</h5>
                        <p className="text-[10px] text-primary font-black">{s.category} • {s.price}</p>
                      </div>
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
                <Card className="border-border rounded-[2rem] bg-card sticky top-24 shadow-xl p-6">
                  <h3 className="font-headline italic text-2xl mb-6">{editingId ? "Editar Pieza" : "Nueva Pieza"}</h3>
                  <div className="space-y-4">
                    <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="h-12" />
                    <Input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="h-12" />
                    <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                      <SelectTrigger className="h-12"><SelectValue placeholder="Categoría" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mujer">Victoria (Mujer)</SelectItem>
                        <SelectItem value="hombre">Hugo Boss (Hombre)</SelectItem>
                        <SelectItem value="perfumes">Esprit (Perfumes)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="URL Imagen" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="h-12" />
                    <Textarea placeholder="Descripción..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="min-h-[100px]" />
                    <div className="flex gap-2">
                      <Button onClick={() => addItem('products')} className="flex-1 h-12 rounded-xl font-black uppercase text-[10px]">
                        {editingId ? "Actualizar" : "Añadir"}
                      </Button>
                      {editingId && <Button onClick={cancelEdit} variant="outline" className="h-12 w-12"><X/></Button>}
                    </div>
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-8 space-y-4">
                 <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex items-center justify-between mb-4">
                    <div><h4 className="font-bold">Catálogo PDF Digital</h4><p className="text-xs opacity-60">URL para la descarga de clientes.</p></div>
                    <Input className="max-w-xs" value={globalSettings.catalogUrl || ''} onChange={e => setGlobalSettings({...globalSettings, catalogUrl: e.target.value})} placeholder="URL del PDF" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map(p => (
                      <div key={p.id} className="bg-card p-4 rounded-2xl border border-border flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-16 rounded-xl overflow-hidden bg-muted"><img src={p.imageUrl} className="w-full h-full object-cover" /></div>
                          <div><h5 className="font-bold text-sm uppercase">{p.name}</h5><p className="text-[10px] text-primary font-black">{p.category} • {p.price}</p></div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => editItem(p)}><Edit3 size={16}/></Button>
                          <Button variant="ghost" size="icon" onClick={() => removeItem('products', p.id)} className="text-destructive"><Trash2 size={16}/></Button>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lounge" className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <Card className="p-6 border-border rounded-[2rem] shadow-xl">
                  <h3 className="font-headline italic text-2xl mb-6">{editingId ? "Editar Plato/Bebida" : "Añadir al Menú"}</h3>
                  <div className="space-y-4">
                    <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="h-12" />
                    <Input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="h-12" />
                    <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                      <SelectTrigger className="h-12"><SelectValue placeholder="Tipo" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Comida">Gastronomie (Comida)</SelectItem>
                        <SelectItem value="Bebidas">Mixologie (Bebidas)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Button onClick={() => addItem('menu')} className="flex-1 h-12 rounded-xl font-black uppercase text-[10px]">Guardar</Button>
                      {editingId && <Button onClick={cancelEdit} variant="outline" className="h-12 w-12"><X/></Button>}
                    </div>
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.map(m => (
                  <div key={m.id} className="bg-card p-4 rounded-2xl border border-border flex items-center justify-between">
                    <div><h5 className="font-bold text-sm">{m.name}</h5><p className="text-[10px] uppercase font-black opacity-50">{m.category} • {m.price}</p></div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => editItem(m)}><Edit3 size={16}/></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem('menu', m.id)} className="text-destructive"><Trash2 size={16}/></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="modular" className="animate-in fade-in duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                  <Card className="p-6 border-border rounded-[2rem] shadow-xl">
                    <h3 className="font-headline italic text-2xl mb-6">{editingId ? "Editar Proyecto" : "Nuevo Proyecto"}</h3>
                    <div className="space-y-4">
                      <Input placeholder="Título del Proyecto" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="h-12" />
                      <Input placeholder="URL Imagen" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="h-12" />
                      <Textarea placeholder="Descripción del proyecto..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="min-h-[100px]" />
                      <div className="flex gap-2">
                        <Button onClick={() => addItem('projects')} className="flex-1 h-12 rounded-xl font-black uppercase text-[10px]">Añadir Proyecto</Button>
                        {editingId && <Button onClick={cancelEdit} variant="outline" className="h-12 w-12"><X/></Button>}
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map(p => (
                    <div key={p.id} className="bg-card p-4 rounded-2xl border border-border flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden"><img src={p.imageUrl} className="w-full h-full object-cover" /></div>
                        <div><h5 className="font-bold text-sm uppercase">{p.title}</h5></div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => editItem(p)}><Edit3 size={16}/></Button>
                        <Button variant="ghost" size="icon" onClick={() => removeItem('projects', p.id)} className="text-destructive"><Trash2 size={16}/></Button>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </TabsContent>

          <TabsContent value="contact" className="animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="p-8 rounded-[2rem] border-border bg-card shadow-xl space-y-6">
                 <h3 className="font-headline italic text-2xl">Canales Digitales</h3>
                 <div className="space-y-4">
                   <div><label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">WhatsApp Reservas</label><Input value={globalSettings.whatsappNumber || ''} onChange={e => setGlobalSettings({...globalSettings, whatsappNumber: e.target.value})} className="h-12" /></div>
                   <div><label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Instagram URL</label><Input value={globalSettings.instagramUrl || ''} onChange={e => setGlobalSettings({...globalSettings, instagramUrl: e.target.value})} className="h-12" /></div>
                   <div><label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Facebook URL</label><Input value={globalSettings.facebookUrl || ''} onChange={e => setGlobalSettings({...globalSettings, facebookUrl: e.target.value})} className="h-12" /></div>
                   <div><label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</label><Input value={globalSettings.email || ''} onChange={e => setGlobalSettings({...globalSettings, email: e.target.value})} className="h-12" /></div>
                 </div>
               </Card>
               <Card className="p-8 rounded-[2rem] border-border bg-card shadow-xl space-y-6">
                 <h3 className="font-headline italic text-2xl">Ubicación Física</h3>
                 <div><label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Dirección Exacta</label><Input value={globalSettings.address || ''} onChange={e => setGlobalSettings({...globalSettings, address: e.target.value})} className="h-12" /></div>
                 <Button onClick={saveGlobal} className="w-full h-14 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px]">Actualizar Contacto</Button>
               </Card>
             </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
