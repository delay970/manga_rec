import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Manga_Info from './Manga_Info';
import Homepage from './Homepage';

function App() {

  return (
  <>
    <Router>
    <Routes>
        <Route path='/manga/:id' element={<Manga_Info/>} />
        <Route path='/' element={<Homepage/>} />
    </Routes>
    </Router>
  </>

  )
}

export default App;
