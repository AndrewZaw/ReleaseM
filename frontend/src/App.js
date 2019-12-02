import React from 'react';
import './App.css';
import 'typeface-roboto';
import Router from './Router';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider autoHideDuration={3000} maxSnack={3}>
      <Router />
    </SnackbarProvider>
  );
}

export default App;
