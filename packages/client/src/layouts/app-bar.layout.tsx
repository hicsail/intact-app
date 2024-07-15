import { FC } from 'react';
import { AppBar, Container, Toolbar, Typography, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const AppBarLayout: FC = () => {
  const { palette } = useTheme();
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: palette.primary.dark }}>
        <Toolbar>
          <Typography variant="h4" component="div" color="primary" sx={{ flexGrow: 1 }}>
            ABLE
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ p: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};
