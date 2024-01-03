import { createRoot } from 'react-dom/client';
import App from './App';

const root: HTMLElement | null = document.getElementById('root');

if (!root) {
  throw new Error('Could not find root element');
}

createRoot(root).render(<App />);
