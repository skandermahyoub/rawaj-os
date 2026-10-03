import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Safely clear any legacy or corrupted firestore_targets keys from localStorage on startup
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('firestore_targets') || key.startsWith('firestore_clients'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.warn('LocalStorage cleanup note:', err);
  }
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Use memoryLocalCache to eliminate browser localStorage quota errors (QuotaExceededError)
// while keeping fast, in-memory real-time sync across all components
export const db = initializeFirestore(
  app,
  {
    localCache: memoryLocalCache(),
  },
  firebaseConfig.firestoreDatabaseId
);

export const auth = getAuth(app);
export default app;
