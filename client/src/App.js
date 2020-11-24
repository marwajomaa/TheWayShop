import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import { DataProvider } from './GlobalState';
import Header from './components/Header'; 
import './App.css';

function App() {
  return (
  <DataProvider>
    <Router>
      <div>
        <Header />
      </div>   
    </Router>
  </DataProvider>
  );
}

export default App;
