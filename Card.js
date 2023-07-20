import React, { useState, useEffect } from 'react';
import './Card.css'

const Card = ({ userId, itemCount, onClick }) => {
  const [albumData, setAlbumData] = useState([]);
  const [idCounts, setIdCounts] = useState({});

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      .then((data) => setAlbumData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Group data by ID and count the occurrences
    const counts = {};
    albumData.forEach((album) => {
      counts[album.userId] = (counts[album.userId] || 0) + 1;
    });
    setIdCounts(counts);
  }, [albumData]);

  return (
    <div className="card" onClick={onClick}>
      <span className="item-count">{itemCount}</span>
      <div className="card-header">
         {userId}
      </div>
    </div>

    
  );
};

export default Card;
