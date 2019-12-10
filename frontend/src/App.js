import React from 'react';
import './App.css';
import 'typeface-roboto';
import Router from './Router';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { indigo, lightGreen } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: lightGreen
  }
});
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
