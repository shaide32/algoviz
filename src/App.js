import React from 'react';
import './css/App.css';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Header from './components/Header';
import Footer from './components/Footer'
function App() {
  return (
    <div className="App">
        <div className="sidebar"><Sidebar></Sidebar></div>
        <div className="main">
          <Header></Header>
          <Canvas></Canvas>
          <Footer></Footer>
        </div>
      </div>
  );
}

export default App;
