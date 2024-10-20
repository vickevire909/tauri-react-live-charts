import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { SciChartSurface } from 'scichart';

// Call loadWasmFromCDN once before SciChart.js is initialised to load Wasm files from our CDN
// Alternative methods for serving and resolving wasm are available on our website
SciChartSurface.configure({
  dataUrl: '/src/assets/scripts/scicharts2d.data',
  wasmUrl: '/src/assets/scripts/scicharts2d.wasm',
});
SciChartSurface.UseCommunityLicense();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
