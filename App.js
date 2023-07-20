import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Components/Card';
import ItemList from './Components/ItemList';
import UserIdNumber from './Components/UserIdNumber';
import './App.css';
import SearchBar from './Components/SearchBar';
import SearchResultsList from './Components/SearchResultsList';

const App = () => {
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [seenItems, setSeenItems] = useState([]);
  const[results,setResults]=useState([]);
  const [idCounts, setIdCounts] = useState({});
  const [albumData, setAlbumData] = useState([]);
    
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCardClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleItemClick = (itemTitle) => {
    if (!seenItems.includes(itemTitle)) {
      setSeenItems([...seenItems, itemTitle]);
    }
  };

  const filteredItems = data.filter((album) =>
    album.userId === selectedUserId
  );

  useEffect(() => {
    // Group data by ID and count the occurrences
    const counts = {};
    albumData.forEach((album) => {
      counts[album.userId] = (counts[album.userId] || 0) + 1;
    });
    setIdCounts(counts);
  }, [albumData]);


  return (
    <div className="app">
    <div className='search-bar-container'>
    <SearchBar setResults={setResults}/>
    <span className='logo'>Logo</span>
    <SearchResultsList results={results}/>
     </div>
      <div className="card-container">
    {data.map((album) => ( 
         <><Card
           key={album.id}
             name={`Album ${album.id}`}
             userId={album.userId}
            itemCount={album.userId.length}
             onClick={() => handleCardClick(album.userId)} 
            />
              </>
         ))}
      </div>
      {selectedUserId && (
        <div className="item-list-container">
          <h2>Items associated with User {selectedUserId}</h2>
          <ItemList
            items={filteredItems}
            onItemClick={handleItemClick}
            seenItems={seenItems}
          />
        </div>
      )}
    </div>
  );
};

export default App;

