import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import NavBar from '../../components/Navbar/Navbar'
import Sidepane from '../../components/Sidepane/Sidepane'
function App() {
  return (
    <div className='page'>
    <NavBar />
    <Sidepane />
    </div>
  );
}

export default App;
