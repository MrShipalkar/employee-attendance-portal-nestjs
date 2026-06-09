import { Box } from '@mui/material';
import AppSidebar from '../components/sidebar/AppSidebar';
import DashboardHeader from '../components/DashboardHeader';

// const drawerWidth = 280;

const AppLayout = ({
  children,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f5f7fb',
      }}
    >
      <AppSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DashboardHeader />

        <Box
          sx={{
            p: 3,
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;