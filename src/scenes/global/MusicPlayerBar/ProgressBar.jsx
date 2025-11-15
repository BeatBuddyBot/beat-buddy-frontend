import React from 'react';
import { Box, Slider, Typography } from '@mui/joy';

const ProgressBar = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: 300, ml: 3 }}>
      <Typography level="body-sm" sx={{ width: 35 }}>
        2:40
      </Typography>
      <Slider disabled value={82.5} sx={{ flex: 1, mx: 1 }} />
      <Typography level="body-sm" sx={{ width: 35 }}>
        3:14
      </Typography>
    </Box>
  );
};

export default ProgressBar;
