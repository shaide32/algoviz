import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './css/App.css';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Header from './components/Header';
import Sorting from './components/sorting';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar"><Sidebar></Sidebar></div>
        <div className="main">
          <Header></Header>
          <Canvas></Canvas>
          <Route path="/sorting" component={Sorting}></Route>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
