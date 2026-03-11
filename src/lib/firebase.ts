
'use client';

import { initializeFirebase } from '@/firebase';

// Re-export initialized instances from the standard provider location 
// to avoid confusion with multiple initialization sites.
const instances = typeof window !== 'undefined' ? initializeFirebase() : { auth: null, firestore: null, app: null };

export const auth = instances.auth;
export const db = instances.firestore;
export const app = instances.app;
