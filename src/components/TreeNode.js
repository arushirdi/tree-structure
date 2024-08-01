import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile, faChartBar, faDollarSign, faCogs } from '@fortawesome/free-solid-svg-icons';
import './TreeNode.css';

const iconMap = {
  'Master': faFolder,
  'Transaction': faFile,
  'View': faFile,
  'Report': faChartBar,
  'Accounts': faDollarSign,
  'Configuration': faCogs,
};

const TreeNode = ({ node, parentPath = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuPath = `${parentPath}/${node.name}`;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={`tree-node ${isOpen ? 'open' : ''} ${node.children.length ? 'has-children' : ''}`}>
      <div className="node-header" onClick={handleToggle}>
        <span className="toggle-icon">{isOpen ? '[-]' : '[+]'}</span>
        <input type="checkbox" checked={node.isActive} readOnly />
        {iconMap[node.name] && (
          <FontAwesomeIcon icon={iconMap[node.name]} className="icon icon-3d" />
        )}
        <span className="node-name">{node.name}</span>
      </div>
      {isOpen && (
        <div className="node-details">
          <p><strong>Name:</strong> {node.name}</p>
          <p><strong>Ref Group:</strong> {node.refGroup}</p>
          {node.refMenuId && <p><strong>Ref Menu ID :</strong> {node.refMenuId}</p>}
          <p><strong>Object Name:</strong> {node.objectName}</p>
          <p><strong>Is Active:</strong> {node.isActive ? 'True' : 'False'}</p>
          <p><strong>Menu Path:</strong> {menuPath}</p>
        </div>
      )}
      {isOpen && node.children && (
        <ul className="node-children">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} parentPath={menuPath} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
