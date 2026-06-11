import { Box } from '@mui/material';

import AppSidebar from '../components/sidebar/AppSidebar';
import DashboardHeader from '../components/DashboardHeader';

const AppLayout = ({
  children,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',

        minHeight: '100vh',

        p: 2,

        gap: 3,

        position: 'relative',

        overflow: 'hidden',

        background: `
          radial-gradient(
            circle at top left,
            rgba(99,102,241,0.25) 0%,
            transparent 35%
          ),
          radial-gradient(
            circle at top right,
            rgba(14,165,233,0.20) 0%,
            transparent 30%
          ),
          #020617
        `,
      }}
    >
      {/* Decorative Blur */}

      <Box
        sx={{
          position: 'fixed',

          width: 400,
          height: 400,

          background: '#4f46e5',

          borderRadius: '50%',

          filter: 'blur(180px)',

          opacity: 0.12,

          top: -100,
          left: -100,

          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'fixed',

          width: 350,
          height: 350,

          background: '#06b6d4',

          borderRadius: '50%',

          filter: 'blur(180px)',

          opacity: 0.10,

          bottom: -100,
          right: -100,

          zIndex: 0,
        }}
      />

      {/* Sidebar */}

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <AppSidebar />
      </Box>

      {/* Main Area */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,

          position: 'relative',

          zIndex: 1,

          borderRadius: '32px',

          overflow: 'hidden',

          background:
            'rgba(255,255,255,0.04)',

          backdropFilter:
            'blur(20px)',

          border:
            '1px solid rgba(255,255,255,0.08)',

          display: 'flex',

          flexDirection: 'column',
        }}
      >
        <DashboardHeader />

        <Box
          sx={{
            p: 4,
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