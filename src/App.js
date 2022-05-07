import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Manga_Info from './Manga_Info';
import Homepage from './Homepage';

let user = 1;

function setUserID(id){
    user = id
};

function App() {
  return (
  <>
    <Router>
    <Routes>
        <Route path='/manga/:id' element={<Manga_Info user = {user}/>}/>
        <Route path='/' element={<Homepage user = {user}/>} />
    </Routes>
    </Router>
  </>

  )
}

export default App;
