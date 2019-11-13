import React from 'react';
import { AppBar } from './components';
import { Login } from './scenes';
import './App.css';
import 'typeface-roboto';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar />
        <Switch>
          <Route path="/" />
          <Route path="/login" component={Login} />
          <Route path="/register" />
          <Route path="/about" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
