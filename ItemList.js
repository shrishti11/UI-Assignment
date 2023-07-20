import React from 'react';
import './ItemList.css'

const ItemList = ({ items, onItemClick, seenItems }) => {
  const handleItemClick = (itemTitle) => {
    if (!seenItems.includes(itemTitle)) {
      onItemClick(itemTitle);
    }
    
  };

  return (
    <ul className='list-container'>
      {items.map((item) => (
        <li
        className='list-item'
          key={item.id}
          onClick={() => handleItemClick(item.title)}
          style={{ color: seenItems.includes(item.title) ? 'gray' : 'black' }}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
