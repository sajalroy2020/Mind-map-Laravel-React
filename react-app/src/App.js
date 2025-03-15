import './App.css';
import MindMap from './components/MindMap';
import MindMapAi from './components/MindMapAi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {
  const [currentPage, setCurrentPage] = useState('mindmap');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <nav className="app-nav">
          <button 
            className={`nav-button ${currentPage === 'mindmap' ? 'active' : ''}`}
            onClick={() => setCurrentPage('mindmap')}
          >
            Mind Map
          </button>
          <button 
            className={`nav-button ${currentPage === 'mind-map-ai' ? 'active' : ''}`}
            onClick={() => setCurrentPage('mind-map-ai')}
          >
            Mind Map AI
          </button>
        </nav>
        <div className="content-container">
          {currentPage === 'mindmap' ? <MindMap /> : <MindMapAi />}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
