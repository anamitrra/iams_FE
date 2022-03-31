import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Categories from './pages/categories';
import Items from './pages/items';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";


function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/" element={<Items/>} />
        <Route path='/categories' element={<Categories/>}/> 
      
      </Routes>
    </Router>
    </div>
  );
}

export default App;
