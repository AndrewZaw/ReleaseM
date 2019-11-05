import React from 'react';
import { AppBar, LoginForm } from './components/';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <AppBar />
      <LoginForm />
    </div>
  );
}

export default App;
