'use client'

import React, { useState } from 'react';
import axios from 'axios';
// import ReactFlow from 'react-flow-renderer';
import ReactFlow, { Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const MindMapAi = () => {
  const [topic, setTopic] = useState('');
  const [elements, setElements] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/generate-flowchart', {
        topic
      });
      setElements(response.data.elements);
    } catch (error) {
      console.error('Error generating flowchart:', error);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <input
          className="mind-map-input"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic"
        />
        <button type="submit" className="mind-map-button">Generate MindMap</button>
      </form>
      <ReactFlow elements={elements}> <Controls /> </ReactFlow>
    </div>
  );
};

export default MindMapAi; 