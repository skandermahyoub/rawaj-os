import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const prepareFreshPwaRuntime = async () => {
  try {
    // Remove any caches left by historical service-worker versions.
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }

    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      // Ask the browser to pick up a newer worker immediately when one exists.
      await registration.update().catch(() => undefined);
    }
  } catch (error) {
    console.warn('[Rawaj] PWA runtime note:', error);
  }
};

void prepareFreshPwaRuntime();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
