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
        // backgroundColor: '#f5f7fb',
        background:
                        'linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)',
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