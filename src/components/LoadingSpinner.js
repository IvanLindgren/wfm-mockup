import React from 'react';
import { Box, CircularProgress } from '@mui/material';

function LoadingSpinner({ size = 40 }) { // size - необязательный параметр размера
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
      <CircularProgress size={size} />
    </Box>
  );
}

export default LoadingSpinner;