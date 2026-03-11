"use client"

import React, { useState } from 'react';
import { Settings, LogOut, Plus, Trash2, Loader2 } from 'lucide-react';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface AdminUIProps {
  setView: (view: 'client' | 'admin') => void;
  dynamicData: any;
}

export default function AdminUI({ setView, dynamicData }: AdminUIProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'products' | 'projects' | 'menu'>('services');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    category: 'barberia', 
    imageUrl: '', 
    title: '' 
  });

  const appId = 'gm-beauty-house-v1';

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSave = { ...form };
      if (!dataToSave.name && dataToSave.title) dataToSave.name = dataToSave.title;
      if (!dataToSave.title && dataToSave.name) dataToSave.title = dataToSave.name;
      
      await addDoc(collection(db, 'data', appId, activeTab), dataToSave);
      setForm({ name: '', price: '', description: '', category: 'barberia', imageUrl: '', title: '' });
    } catch (err) {
      console.error(err);
      alert("Error al guardar.");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este elemento?")) {
      await deleteDoc(doc(db, 'data', appId, activeTab, id));
    }
  };

  const tabs = [
    { id: 'services', label: 'Belleza/Servicios' },
    { id: 'products', label: 'Boutique/Revista' },
    { id: 'projects', label: 'Modulares' },
    { id: 'menu', label: 'Menú Lounge' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] animate-in fade-in duration-500">
      <nav className="p-8 border-b border-primary/20 flex justify-between items-center bg-card">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary text-black rounded-xl">
            <Settings size={24} />
          </div>
          <h1 className="text-white font-headline font-bold text-2xl tracking-widest uppercase">Panel de Control GM</h1>
        </div>
        <Button variant="outline" onClick={() => setView('client')} className="gap-2 border-zinc-800 hover:bg-zinc-800">
          <LogOut size={18}/> Volver al Sitio
        </Button>
      </nav>

      <div className="max-w-7xl mx-auto p-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="flex flex-col gap-3">
          {tabs.map(t => (
            <button 
              key={t.id} 
              onClick={() => setActiveTab(t.id as any)} 
              className={cn(
                "p-5 rounded-2xl text-left font-bold uppercase tracking-widest text-xs transition-all",
                activeTab === t.id 
                  ? "bg-gold-vibrant text-black shadow-2xl shadow-primary/20 scale-105" 
                  : "bg-zinc-900 text-zinc-500 hover:text-white hover:bg-zinc-800"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-12">
          <form onSubmit={add} className="bg-card p-10 rounded-[2.5rem] border border-zinc-800 grid grid-cols-2 gap-8 shadow-2xl">
            <h2 className="col-span-2 text-primary font-headline font-bold text-3xl mb-2 flex items-center gap-3">
              <Plus size={28}/> Añadir {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Nombre o Título</label>
              <Input 
                className="bg-black/50 p-6 h-14 rounded-xl border-zinc-800 focus:border-primary" 
                placeholder="Ej: Balayage Premium" 
                value={form.name || form.title} 
                onChange={e => setForm({...form, name: e.target.value, title: e.target.value})} 
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Precio / Valor</label>
              <Input 
                className="bg-black/50 p-6 h-14 rounded-xl border-zinc-800 focus:border-primary" 
                placeholder="Ej: $45.00 o Desde $10" 
                value={form.price} 
                onChange={e => setForm({...form, price: e.target.value})} 
              />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Categoría</label>
              <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                <SelectTrigger className="bg-black/50 h-14 rounded-xl border-zinc-800">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {activeTab === 'services' && (
                    <>
                      <SelectItem value="barberia">Barbería</SelectItem>
                      <SelectItem value="salon">Salón</SelectItem>
                    </>
                  )}
                  {activeTab === 'products' && (
                    <>
                      <SelectItem value="mujer">Mujer</SelectItem>
                      <SelectItem value="hombre">Hombre</SelectItem>
                      <SelectItem value="perfumes">Perfumes</SelectItem>
                    </>
                  )}
                  {activeTab === 'menu' && (
                    <>
                      <SelectItem value="Comida">Comida</SelectItem>
                      <SelectItem value="Bebidas">Bebidas</SelectItem>
                    </>
                  )}
                  {activeTab === 'projects' && <SelectItem value="general">Proyecto General</SelectItem>}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">URL de Imagen</label>
              <Input 
                className="bg-black/50 p-6 h-14 rounded-xl border-zinc-800 focus:border-primary" 
                placeholder="https://images.unsplash.com/..." 
                value={form.imageUrl} 
                onChange={e => setForm({...form, imageUrl: e.target.value})} 
              />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Descripción</label>
              <Textarea 
                className="bg-black/50 p-6 min-h-32 rounded-xl border-zinc-800 focus:border-primary resize-none" 
                placeholder="Describe el producto o servicio con un tono persuasivo..." 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="col-span-2 h-auto py-5 rounded-2xl bg-gold-vibrant text-black font-black uppercase tracking-widest hover:brightness-110 shadow-2xl"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Guardar Elemento"}
            </Button>
          </form>
          
          <div className="space-y-6">
            <h3 className="text-xl font-headline font-bold text-zinc-400 border-b border-zinc-800 pb-4">Elementos Publicados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(dynamicData[activeTab === 'menu' ? 'menuItems' : activeTab] || []).map((item: any) => (
                <div key={item.id} className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 flex justify-between items-center group hover:border-red-500/50 transition-all">
                  <div className="flex items-center gap-4">
                    {item.imageUrl && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0">
                        <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-white uppercase text-sm tracking-widest">{item.name || item.title}</p>
                      <p className="text-primary text-xs font-bold mt-1">{item.category} • {item.price || 'N/A'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => remove(item.id)} 
                    className="text-zinc-700 hover:text-red-500 hover:bg-red-500/10 p-4 rounded-full transition-all"
                  >
                    <Trash2 size={20}/>
                  </button>
                </div>
              ))}
              {(dynamicData[activeTab === 'menu' ? 'menuItems' : activeTab] || []).length === 0 && (
                <div className="col-span-2 py-20 text-center border-2 border-dashed border-zinc-800 rounded-3xl text-zinc-600 font-bold uppercase tracking-widest">
                  No hay elementos cargados en esta sección
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
