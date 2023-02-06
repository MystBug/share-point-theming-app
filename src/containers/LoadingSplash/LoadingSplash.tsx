import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type LoadingSplashProps = {
    show: boolean;
};

export default function LoadingSplash({ show }: LoadingSplashProps) {
  return (
    <div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}