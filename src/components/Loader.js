import React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
    return (
        <Box sx={{ display: 'flex', margin: 'auto' }}>
            <CircularProgress size={100} color='error'
            />
        </Box>
    );
}

export default Loader;
