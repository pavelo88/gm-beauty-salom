
"use client"

import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Loader2, Save, 
  FileText, ShoppingBag, Scissors, 
  UtensilsCrossed, Sofa, LayoutDashboard, 
  Eye, MapPin, Share2, Edit3, X, RefreshCcw,
  CheckCircle2
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
    if (!confirm("¿Eliminar este elemento permanentemente?")) return;
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
            placeholder="https://images.unsplash.com/..." 
            className="rounded-xl h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Texto Narrativo</label>
          <Textarea 
            value={globalSettings[`${prefix}Text`] || ''} 
            onChange={e => setGlobalSettings({...globalSettings, [`${prefix}Text`]: e.target.value})} 
            placeholder="Describe la propuesta de esta sección..." 
            className="rounded-xl min-h-[100px] resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-body pb-20">
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border p-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-2 rounded-xl text-primary-foreground">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="font-headline font-black text-2xl uppercase tracking-tighter">Admin Master Hub</h1>
            <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-muted-foreground">GM Beauty House • Sincronización 100%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link href="/" className="flex-1 md:flex-none">
            <Button variant="outline" className="w-full h-11 rounded-full text-[10px] font-black uppercase tracking-widest px-6 border-primary/20 hover:bg-primary/5">
              <Eye size={14} className="mr-2" /> Ver Sitio
            </Button>
          </Link>
          <Button onClick={saveGlobal} disabled={loading} className="flex-1 md:flex-none h-11 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-widest px-10 shadow-lg shadow-primary/20">
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={14} className="mr-2" /> Sincronizar Cambios</>}
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-10">
        <Tabs defaultValue="home" className="space-y-10">
          <TabsList className="bg-muted/40 backdrop-blur p-1 rounded-2xl border border-border h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <TabsTrigger value="home" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText size={14} className="mr-2" /> Inicio
            </TabsTrigger>
            <TabsTrigger value="beauty" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Scissors size={14} className="mr-2" /> Belleza
            </TabsTrigger>
            <TabsTrigger value="boutique" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShoppingBag size={14} className="mr-2" /> Boutique
            </TabsTrigger>
            <TabsTrigger value="lounge" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <UtensilsCrossed size={14} className="mr-2" /> Lounge
            </TabsTrigger>
            <TabsTrigger value="modular" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sofa size={14} className="mr-2" /> Modulares
            </TabsTrigger>
            <TabsTrigger value="contact" className="rounded-xl py-3 font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Share2 size={14} className="mr-2" /> Contacto
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-border rounded-3xl overflow-hidden shadow-sm bg-card">
                <CardHeader className="bg-primary/5 pb-6">
                  <CardTitle className="font-headline italic text-xl">1. Héroe de Portada</CardTitle>
                  <CardDescription className="text-[9px] uppercase tracking-widest font-bold">Impacto Monumental</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Título de Portada</label>
                    <Input value={globalSettings.heroTitle || ''} onChange={e => setGlobalSettings({...globalSettings, heroTitle: e.target.value})} placeholder="Ej: GM HOUSE" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subtítulo Hero</label>
                    <Textarea value={globalSettings.heroSubtitle || ''} onChange={e => setGlobalSettings({...globalSettings, heroSubtitle: e.target.value})} placeholder="Frase de entrada..." className="rounded-xl min-h-[80px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Imagen Hero (Fondo)</label>
                    <Input value={globalSettings.heroImage || ''} onChange={e => setGlobalSettings({...globalSettings, heroImage: e.target.value})} placeholder="URL de la imagen de portada" className="h-12 rounded-xl" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border rounded-3xl overflow-hidden shadow-sm bg-card">
                <CardHeader className="bg-primary/5 pb-6">
                  <CardTitle className="font-headline italic text-xl">6. Manifiesto Final</CardTitle>
                  <CardDescription className="text-[9px] uppercase tracking-widest font-bold">Cierre de Experiencia</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Título del Manifiesto</label>
                    <Input value={globalSettings.manifestoTitle || ''} onChange={e => setGlobalSettings({...globalSettings, manifestoTitle: e.target.value})} placeholder="Frase destacada en el cierre" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Cuerpo del Manifiesto</label>
                    <Textarea value={globalSettings.manifestoText || ''} onChange={e => setGlobalSettings({...globalSettings, manifestoText: e.target.value})} placeholder="Texto largo del manifiesto..." className="rounded-xl min-h-[120px]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SectionEditor title="2. Sección Belleza" prefix="homeBeauty" description="Propuesta Salón & Barbería" />
              <SectionEditor title="3. Sección Moda" prefix="homeBoutique" description="Propuesta Boutique & Perfumes" />
              <SectionEditor title="4. Sección Modulares" prefix="homeAlliance" description="Propuesta Alianza Mobiliario" />
              <SectionEditor title="5. Sección Entretenimiento" prefix="homeTv" description="Propuesta Lounge & TV" />
            </div>
          </TabsContent>

          <TabsContent value="beauty" className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <Card className="border-border rounded-[2.5rem] bg-card sticky top-24 shadow-xl">
                  <CardHeader className="text-center">
                    <CardTitle className="font-headline italic text-2xl">{editingId ? "Editar Servicio" : "Nuevo Servicio"}</CardTitle>
                    <CardDescription className="text-[9px] uppercase tracking-widest font-black text-primary">Archivo de Autor</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <Input placeholder="Nombre del Servicio" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="h-12 rounded-xl" />
                    <Input placeholder="Precio (Ej: $25.00)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="h-12 rounded-xl" />
                    <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                      <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Categoría" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salon">Le Salon (Mujer)</SelectItem>
                        <SelectItem value="barberia">Barber Shop (Hombre)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="URL de Imagen" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="h-12 rounded-xl" />
                    <Textarea placeholder="Descripción del servicio..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="rounded-xl min-h-[100px] resize-none" />
                    <div className="flex gap-3">
                      <Button onClick={() => addItem('services')} className="flex-1 h-12 rounded-xl font-black uppercase text-[10px] tracking-widest">
                        {editingId ? <><Save size={14} className="mr-2"/> Actualizar</> : <><Plus size={14} className="mr-2"/> Añadir</>}
                      </Button>
                      {editingId && <Button onClick={cancelEdit} variant="outline" className="h-12 w-12 rounded-xl"><X size={16}/></Button>}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(s => (
                  <div key={s.id} className="bg-card p-5 rounded-3xl border border-border flex items-center justify-between group hover:shadow-lg transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
                        <img src={s.imageUrl} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-primary tracking-widest">{s.category}</p>
                        <h5 className="font-bold text-sm uppercase tracking-tight">{s.name}</h5>
                        <p className="text-xs font-black opacity-40">{s.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => editItem(s)} className="rounded-full"><Edit3 size={16} /></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem('services', s.id)} className="rounded-full text-destructive"><Trash2 size={16} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="boutique" className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <Card className="border-border rounded-[2.5rem] bg-card sticky top-24 shadow-xl">
                  <CardHeader className="text-center">
                    <CardTitle className="font-headline italic text-2xl">{editingId ? "Editar Pieza" : "Nueva Pieza de Moda"}</CardTitle>
                    <CardDescription className="text-[9px] uppercase tracking-widest font-black text-primary">Curaduría Boutique</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nombre del Producto</label>
                      <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ej: Traje Hugo Boss Black" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Precio</label>
                      <Input value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="Ej: $450.00" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Categoría</label>
                      <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                        <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Tipo de Ítem" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mujer">Victoria (Mujer)</SelectItem>
                          <SelectItem value="hombre">Hugo Boss (Hombre)</SelectItem>
                          <SelectItem value="perfumes">Perfumes & Esencias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">URL Imagen</label>
                      <Input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} placeholder="https://..." className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Descripción</label>
                      <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe los materiales y el estilo..." className="rounded-xl min-h-[80px] resize-none" />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button onClick={() => addItem('products')} className="flex-1 h-12 rounded-xl font-black uppercase text-[10px] tracking-widest">
                        {editingId ? <><Save size={14} className="mr-2"/> Actualizar</> : <><Plus size={14} className="mr-2"/> Publicar</>}
                      </Button>
                      {editingId && <Button onClick={cancelEdit} variant="outline" className="h-12 w-12 rounded-xl"><X size={16}/></Button>}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ShoppingBag className="text-primary" size={24} />
                    <div>
                      <h4 className="font-bold text-lg">Catálogo PDF Digital</h4>
                      <p className="text-xs text-muted-foreground">Enlace a la revista descargable que verán los clientes.</p>
                    </div>
                  </div>
                  <Input 
                    value={globalSettings.catalogUrl || ''} 
                    onChange={e => setGlobalSettings({...globalSettings, catalogUrl: e.target.value})} 
                    placeholder="URL del PDF (Drive/Dropbox/Web)" 
                    className="max-w-md h-12 rounded-xl"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map(p => (
                    <div key={p.id} className="bg-card p-5 rounded-3xl border border-border flex items-center justify-between group hover:shadow-lg transition-all">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-20 rounded-2xl overflow-hidden shadow-sm">
                          <img src={p.imageUrl} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase text-primary tracking-widest">{p.category}</p>
                          <h5 className="font-bold text-sm uppercase tracking-tight">{p.name}</h5>
                          <p className="text-xs font-black opacity-40">{p.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => editItem(p)} className="rounded-full"><Edit3 size={16} /></Button>
                        <Button variant="ghost" size="icon" onClick={() => removeItem('products', p.id)} className="rounded-full text-destructive"><Trash2 size={16} /></Button>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-border/20 rounded-[2.5rem]">
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground italic">El catálogo de Boutique está vacío.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Card className="border-border rounded-[2.5rem] bg-card shadow-xl overflow-hidden">
                <CardHeader className="bg-primary/5 text-center">
                  <CardTitle className="font-headline italic text-2xl">Canales Digitales</CardTitle>
                  <CardDescription className="text-[9px] uppercase tracking-widest font-black">Conectividad Global</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">WhatsApp de Reservas</label>
                      <Input value={globalSettings.whatsappNumber || ''} onChange={e => setGlobalSettings({...globalSettings, whatsappNumber: e.target.value})} placeholder="Ej: 0987654321" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Instagram (URL)</label>
                      <Input value={globalSettings.instagramUrl || ''} onChange={e => setGlobalSettings({...globalSettings, instagramUrl: e.target.value})} placeholder="https://instagram.com/..." className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Facebook (URL)</label>
                      <Input value={globalSettings.facebookUrl || ''} onChange={e => setGlobalSettings({...globalSettings, facebookUrl: e.target.value})} placeholder="https://facebook.com/..." className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Oficial</label>
                      <Input value={globalSettings.email || ''} onChange={e => setGlobalSettings({...globalSettings, email: e.target.value})} placeholder="hola@gmbeautyhouse.com" className="h-12 rounded-xl" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border rounded-[2.5rem] bg-card shadow-xl overflow-hidden">
                <CardHeader className="bg-primary/5 text-center">
                  <CardTitle className="font-headline italic text-2xl">Ubicación Física</CardTitle>
                  <CardDescription className="text-[9px] uppercase tracking-widest font-black">GM House Quito Sur</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Dirección Exacta</label>
                    <Input value={globalSettings.address || ''} onChange={e => setGlobalSettings({...globalSettings, address: e.target.value})} placeholder="Rosa Yeira 420 y Serapio Japeravi..." className="h-12 rounded-xl" />
                  </div>
                  <div className="aspect-video bg-muted rounded-3xl overflow-hidden border border-border relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                       <MapPin className="text-primary/20" size={60} />
                       <p className="absolute bottom-4 text-[8px] font-black uppercase tracking-widest opacity-40">Vista previa del mapa integrada en la web</p>
                    </div>
                  </div>
                  <Button onClick={saveGlobal} className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg">
                    Actualizar Información de Contacto
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
