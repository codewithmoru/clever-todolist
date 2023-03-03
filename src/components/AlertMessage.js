import React from 'react';
import Snackbar from '@mui/material/Snackbar';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function AlertMessage({ error, setError }) {
  return (
    <Snackbar
      open={error}
      autoHideDuration={6000}
      onClose={() => setError(false)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
    >
      <Alert onClose={() => setError(false)} severity='error' sx={{ width: '100%' }}>
        Wrong email or password!
      </Alert>
    </Snackbar>
  );
}

export default AlertMessage;
