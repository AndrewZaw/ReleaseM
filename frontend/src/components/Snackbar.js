import React, { Component } from 'react';
import MaterialSnackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  successSnackbar: {}
});

class Snackbar extends Component {
  state = {
    snackbarType: this.props.snackbarType
  };

  renderLoginSnackbar() {
    return (
      <MaterialSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        variant="success"
        message={<span id="message-id">Logged in successfully!</span>}
        autoHideDuration={6000}
      />
    );
  }

  renderLogoutSnackbar() {
    return (
      <MaterialSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        variant="success"
        message={<span id="message-id">Logged out successfully!</span>}
        autoHideDuration={6000}
      />
    );
  }

  renderSnackbar(snackbarType) {
    switch (snackbarType) {
      case 'login':
        return this.renderLoginSnackbar();
      case 'logout':
        return this.renderLogoutSnackbar();
    }
  }

  render() {
    console.log(this.state.snackbarType);
    return <div>{this.renderSnackbar(this.state.snackbarType)}</div>;
  }
}
export default Snackbar;
