import React, { useState } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import List from './components/List';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const handleMenuClick = (newData) => {
    setData(newData);
  }

  return (
    <div className="App">
      <div className="container">
      <Menu onMenuClick={handleMenuClick} />
      <List data={data}/>
      </div>
    </div>
  );
}

export default App;