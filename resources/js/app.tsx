import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { StrictMode } from "react";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const App = () => (
  <StrictMode>
    <div className="app-container">
      <h1>{appName}</h1>
    </div>
  </StrictMode>
);

export default App;

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(<App />);
}