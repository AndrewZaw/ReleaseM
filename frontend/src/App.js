import React from 'react';
import { AppBar, LoginForm, TestData } from './components/';
import './App.css';
import 'typeface-roboto';

function App() {
  return (
    <div className="App">
      <AppBar />
      <LoginForm />
      <TestData />
    </div>
  );
}

export default App;
