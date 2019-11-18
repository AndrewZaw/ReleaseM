import React from 'react';
import { AppBar } from './components';
import { Home, Login, Register } from './scenes';
import './App.css';
import 'typeface-roboto';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/about" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
