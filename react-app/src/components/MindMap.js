'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Tree } from 'react-d3-tree';

const MindChartPage = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState('');
  const [parentId, setParentId] = useState(null);
  const [nodesData, setNodesData] = useState([]);

  const mindMap = [
    { id: 1, parent_id: null, title: 'Mane' },
    { id: 2, parent_id: 1, title: 'Head-1'},
    { id: 8, parent_id: 1, title: 'Head-2'},
    { id: 3, parent_id: 2, text: 'Hand-one'},
    { id: 4, parent_id: 2, text: 'Body'},
    { id: 5, parent_id: 2, text: 'Hand-two'},
    { id: 6, parent_id: 4, text: 'Footer-one'},
    { id: 7, parent_id: 4, text: 'Footer-two'},
  ];

  // Convert flat array to hierarchical tree structure
  const buildTree = (nodes, parentId)=> {
    return nodes
      .filter((node) => node.parent_id == parentId)
      .map((node) => ({
        name: node.title,
        attributes: { id: node.id },
        children: buildTree(nodes, node.id),
      }));
  };

  const treeData = buildTree(nodesData, null);

  useEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 20 });
    }
  }, []);

  const CustomNode = ({ nodeDatum, toggleNode }) => (
    <g className="cursor-pointer">
      <circle
        r={20}
        fill="#0ea5e9"
        className="transition-all hover:fill-sky-600"
        onClick={toggleNode}
      />
      <text
        x={0}
        y={5}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="500"
        className="font-sans"
      >
        {nodeDatum.name}
      </text>
    </g>
  );

//   fromsubmit 
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const newNode = {
            title,
            parent_id: parentId || null,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/nodes-store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNode),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }            

            const result = await response.json();
            setNodesData(result);

            setTitle('');
            setParentId(null);
        } catch (error) {
            console.error('Error adding node:', error);
        }
    };

    useEffect(() => {
        const fetchNodes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/nodes');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();                
                setNodesData(data);
            } catch (error) {
                console.error('Error fetching nodes:', error);
            }
        };

        fetchNodes();
    }, []);


  return (
    <div className="w-full bg-gray-50">
      <div className="container mx-auto px-4">

        <form onSubmit={handleSubmit} className="mind-map-form">
            <input
                type="text"
                placeholder="Enter node title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mind-map-input"
            />
            <select 
                value={parentId || ""}
                onChange={(e) => setParentId(e.target.value || null)}
                className="mind-map-select"
            >
                <option value="">No Parent (Root Node)</option>
                {nodesData.map((node) => (
                    <option key={node.id} value={node.id}>
                        {node.title}
                    </option>
                ))}
            </select>
            <button type="submit" className="mind-map-button">
                Add Node
            </button>
        </form>

        <div  className="w-full border rounded-lg shadow-lg bg-white mt-4 pt-4 tree-box"
        //   ref={containerRef}
        >
          {treeData.length > 0 && (
            <Tree
              data={treeData}
              orientation="vertical"
              translate={translate}
              renderCustomNodeElement={(rd3tProps) => (
                <CustomNode {...rd3tProps} />
              )}
              pathClassFunc={() => 'stroke-sky-300 stroke-2'}
              separation={{ siblings: 1.5, nonSiblings: 2 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MindChartPage;

