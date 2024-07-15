import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';
import SearchResult from './Pages/SearchResult';

function App() {
  const [sidebar, setSidebar] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div>
      <Navbar setSidebar={setSidebar} onSearch={setQuery} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
        <Route path='/Search-Result' element={<SearchResult query={query} />} />
      </Routes>
    </div>
  );
}

export default App;
