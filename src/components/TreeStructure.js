// src/components/TreeStructure.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TreeNode from './TreeNode';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TreeStructure.scss';

const TreeStructure = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    axios.get('http://49.249.110.2:8050/api/MenuMasters/GetMenuMasterList/173')
      .then((response) => {
        const formattedData = formatData(response.data.data);
        setTreeData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const formatData = (data) => {
    const map = {};
    const roots = [];

    data.forEach((node) => {
      map[node.id] = { ...node, children: [] };
    });

    data.forEach((node) => {
      if (node.refMenuId && map[node.refMenuId]) {
        map[node.refMenuId].children.push(map[node.id]);
      } else {
        roots.push(map[node.id]);
      }
    });

    return roots;
  };

  return (
    <div className="tree-container">
      <h2 className="text-center mb-4"></h2>
      <ul className="treeview">
        {treeData.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </ul>
    </div>
  );
};

export default TreeStructure;
