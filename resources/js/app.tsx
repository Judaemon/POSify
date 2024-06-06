import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const rootElement = document.getElementById('app');

if (rootElement) {
    createRoot(rootElement).render(<App />);
}

function App() {
    return (
        <div>
            <h1>Test</h1>
        </div>
    );
}