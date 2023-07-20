import React, { useState, useEffect } from 'react';

const UserIdNumber = ({onClick}) => {
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
    <span className="item-count">{Object.keys(idCounts).map((userId) => (
        <li key={userId}>{userId},{idCounts[userId]}</li>
      ))}</span>
      <ul>
        {Object.keys(idCounts).map((userId) => (
          <li key={userId}>{userId},{idCounts[userId]}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserIdNumber;
