import './App.css';
import MindMap from './components/MindMap';
import AboutUs from './components/AboutUs';
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
          {/* <button 
            className={`nav-button ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentPage('about')}
          >
            About Us
          </button> */}
        </nav>
        <div className="content-container">
          {currentPage === 'mindmap' ? <MindMap /> : <AboutUs />}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
