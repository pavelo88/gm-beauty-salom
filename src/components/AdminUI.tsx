"use client"

import React, { useState } from 'react';
import { Settings, LogOut, Plus, Trash2, Loader2, Edit3, X, Save } from 'lucide-react';
import { collection, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface AdminUIProps {
  setView: (view: 'client' | 'admin') => void;
  dynamicData: any;
}

export default function AdminUI({ setView, dynamicData }: AdminUIProps) {
  const db = useFirestore();
  const [activeTab, setActiveTab] = useState<'services' | 'products' | 'projects' | 'menu'>('services');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    category: '', 
    imageUrl: '', 
    title: '' 
  });

  const appId = 'gm-beauty-house-v1';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const dataToSave = { ...form };
    // Normalizar name/title para diferentes esquemas
    if (!dataToSave.name && dataToSave.title) dataToSave.name = dataToSave.title;
    if (!dataToSave.title && dataToSave.name) dataToSave.title = dataToSave.name;
    
    if (editingId) {
      // MODO EDICIÓN
      const docRef = doc(db, 'data', appId, activeTab, editingId);
      setDoc(docRef, dataToSave, { merge: true })
        .then(() => {
          setForm({ name: '', price: '', description: '', category: '', imageUrl: '', title: '' });
          setEditingId(null);
        })
        .catch(async (err) => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: docRef.path, operation: 'update', requestResourceData: dataToSave
          }));
        })
        .finally(() => setLoading(false));
    } else {
      // MODO CREACIÓN
      const collectionRef = collection(db, 'data', appId, activeTab);
      addDoc(collectionRef, dataToSave)
        .then(() => {
          setForm({ name: '', price: '', description: '', category: '', imageUrl: '', title: '' });
        })
        .catch(async (err) => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: collectionRef.path, operation: 'create', requestResourceData: dataToSave
          }));
        })
        .finally(() => setLoading(false));
    }
  };

  const handleEdit = (item: any) => {
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

  const handleCancel = () => {
    setForm({ name: '', price: '', description: '', category: '', imageUrl: '', title: '' });
    setEditingId(null);
  };

  const handleRemove = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este elemento permanentemente?")) {
      const docRef = doc(db, 'data', appId, activeTab, id);
      deleteDoc(docRef).catch(async (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: docRef.path, operation: 'delete'
        }));
      });
    }
  };

  const tabs = [
    { id: 'services', label: 'Belleza/Servicios' },
    { id: 'products', label: 'Boutique/Catálogo' },
    { id: 'projects', label: 'Modulares' },
    { id: 'menu', label: 'Menú Lounge' },
  ];

  const itemsToList = dynamicData[activeTab === 'menu' ? 'menuItems' : activeTab] || [];

  return (
    <div className="min-h-screen bg-background text-foreground animate-in fade-in duration-500 pb-20">
      <nav className="sticky top-0 z-50 p-6 md:p-8 border-b border-border flex flex-col md:flex-row justify-between items-center bg-card gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary text-primary-foreground rounded-xl shadow-lg">
            <Settings size={24} />
          </div>
          <div>
            <h1 className="font-headline font-bold text-2xl tracking-tighter uppercase">Admin Hub</h1>
            <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40">Gestión Editorial GM</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setView('client')} className="w-full md:w-auto gap-2 rounded-full font-black uppercase tracking-widest text-[10px] h-11">
          <LogOut size={14}/> Volver al Sitio
        </Button>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto no-scrollbar pb-4 lg:pb-0">
          {tabs.map(t => (
            <button 
              key={t.id} 
              onClick={() => { setActiveTab(t.id as any); handleCancel(); }} 
              className={cn(
                "p-5 rounded-2xl text-left font-bold uppercase tracking-widest text-[10px] transition-all whitespace-nowrap lg:whitespace-normal min-w-[160px] lg:min-w-0 border",
                activeTab === t.id 
                  ? "bg-primary text-primary-foreground border-primary shadow-xl scale-105" 
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-12">
          <form onSubmit={handleSubmit} className="bg-card p-8 md:p-12 rounded-[2.5rem] border border-border grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl relative overflow-hidden">
            {editingId && <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse"></div>}
            
            <h2 className="md:col-span-2 text-foreground font-headline font-bold text-3xl mb-2 flex items-center justify-between">
              <span className="flex items-center gap-3">
                {editingId ? <Edit3 className="text-primary" size={28} /> : <Plus className="text-primary" size={28} />}
                {editingId ? "Modificar Elemento" : `Añadir a ${tabs.find(t => t.id === activeTab)?.label}`}
              </span>
              {editingId && (
                <Button type="button" variant="ghost" onClick={handleCancel} className="text-[9px] uppercase font-black tracking-widest text-destructive">
                  <X size={14} className="mr-1" /> Cancelar Edición
                </Button>
              )}
            </h2>
            
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-muted-foreground ml-1">Nombre / Título</label>
              <Input 
                className="h-14 rounded-xl border-border focus:ring-primary" 
                placeholder="Ej: Balayage de Autor" 
                value={form.name || form.title} 
                onChange={e => setForm({...form, name: e.target.value, title: e.target.value})} 
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-muted-foreground ml-1">Precio o Valor</label>
              <Input 
                className="h-14 rounded-xl border-border focus:ring-primary" 
                placeholder="Ej: $45.00" 
                value={form.price} 
                onChange={e => setForm({...form, price: e.target.value})} 
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[9px] uppercase font-black text-muted-foreground ml-1">Categoría</label>
              <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                <SelectTrigger className="h-14 rounded-xl border-border">
                  <SelectValue placeholder="Seleccionar destino" />
                </SelectTrigger>
                <SelectContent>
                  {activeTab === 'services' && (
                    <>
                      <SelectItem value="barberia">Barber Shop (Hombre)</SelectItem>
                      <SelectItem value="salon">Le Salon (Mujer)</SelectItem>
                    </>
                  )}
                  {activeTab === 'products' && (
                    <>
                      <SelectItem value="mujer">Victoria (Mujer)</SelectItem>
                      <SelectItem value="hombre">Hugo Boss (Hombre)</SelectItem>
                      <SelectItem value="perfumes">Esprit (Perfumes)</SelectItem>
                    </>
                  )}
                  {activeTab === 'menu' && (
                    <>
                      <SelectItem value="Comida">Cuisine (Comida)</SelectItem>
                      <SelectItem value="Bebidas">Mixology (Bebidas)</SelectItem>
                    </>
                  )}
                  {activeTab === 'projects' && <SelectItem value="general">Mobiliario General</SelectItem>}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[9px] uppercase font-black text-muted-foreground ml-1">URL de Imagen</label>
              <Input 
                className="h-14 rounded-xl border-border focus:ring-primary" 
                placeholder="https://images.unsplash.com/..." 
                value={form.imageUrl} 
                onChange={e => setForm({...form, imageUrl: e.target.value})} 
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[9px] uppercase font-black text-muted-foreground ml-1">Descripción Narrativa</label>
              <Textarea 
                className="min-h-32 rounded-xl border-border focus:ring-primary resize-none p-4" 
                placeholder="Describe el elemento con un tono sofisticado..." 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="md:col-span-2 h-16 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] hover:brightness-110 shadow-xl transition-all text-[11px]"
            >
              {loading ? <Loader2 className="animate-spin" /> : editingId ? <><Save size={16} className="mr-2" /> Sincronizar Cambios</> : <><Plus size={16} className="mr-2" /> Publicar Elemento</>}
            </Button>
          </form>
          
          <div className="space-y-8">
            <h3 className="text-xl font-headline font-bold text-muted-foreground border-b border-border pb-4 uppercase tracking-widest flex justify-between items-center">
              <span>Elementos en Archivo</span>
              <span className="text-[10px] bg-muted px-3 py-1 rounded-full">{itemsToList.length} Ítems</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {itemsToList.map((item: any) => (
                <div key={item.id} className="bg-card p-6 rounded-[2rem] border border-border flex justify-between items-center group hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-muted flex-shrink-0 shadow-sm">
                      <img src={item.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.name || item.title} />
                    </div>
                    <div>
                      <p className="font-bold text-foreground uppercase text-xs tracking-widest">{item.name || item.title}</p>
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1 opacity-60">{item.category} • {item.price || 'S/P'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="text-muted-foreground hover:text-primary p-3 rounded-full hover:bg-primary/10 transition-all"
                      title="Editar"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleRemove(item.id)} 
                      className="text-muted-foreground hover:text-destructive p-3 rounded-full hover:bg-destructive/10 transition-all"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {itemsToList.length === 0 && (
                <div className="md:col-span-2 py-32 text-center border-2 border-dashed border-border rounded-[3rem] text-muted-foreground font-black uppercase tracking-widest text-[10px] italic">
                  No se encontraron registros en esta sección.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}