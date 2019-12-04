import React from 'react';
import './App.css';
import 'typeface-roboto';
import Router from './Router';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider autoHideDuration={3000} maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

export default App;
