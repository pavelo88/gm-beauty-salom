
'use client';
import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const [instances, setInstances] = useState<ReturnType<typeof initializeFirebase> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const fb = initializeFirebase();
      setInstances(fb);
    } catch (e: any) {
      console.error("Critical error initializing Firebase:", e);
      setError(e);
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
        <div className="max-w-md w-full p-8 border border-destructive/50 rounded-3xl bg-card shadow-2xl">
          <h2 className="text-2xl font-headline font-bold text-destructive mb-4">Error de Configuración</h2>
          <p className="text-sm opacity-70 mb-6">No se pudo conectar con los servicios de GM Beauty House. Verifica las credenciales de Firebase.</p>
          <pre className="text-[10px] bg-black p-4 rounded-xl overflow-auto border border-white/10">{error.message}</pre>
        </div>
      </div>
    );
  }

  if (!instances) return null;

  return (
    <FirebaseProvider 
      app={instances.app} 
      firestore={instances.firestore} 
      auth={instances.auth}
    >
      {children}
    </FirebaseProvider>
  );
}
