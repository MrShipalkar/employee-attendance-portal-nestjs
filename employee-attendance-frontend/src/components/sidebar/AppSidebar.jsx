import {
  NavLink,
  useNavigate,
} from 'react-router-dom';

import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';

import {
  Logout,
} from '@mui/icons-material';

import {
  logout,
} from '../../api/authService';

import {
  sidebarConfig,
} from '../../config/sidebarConfig';

import {
  useSelector,
  useDispatch,
} from 'react-redux';

import {
  logoutSuccess,
} from '../../redux/slices/authSlice';

const drawerWidth = 300;

const AppSidebar = () => {
  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const user =
    useSelector(
      state => state.auth.user,
    );

  const menuItems =
    sidebarConfig[
    user?.role
    ] || [];

  const handleLogout =
    async () => {
      try {
        await logout();
      } catch (error) {
        console.error(
          error,
        );
      }

      dispatch(
        logoutSuccess(),
      );

      navigate(
        '/login',
      );
    };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width:
          drawerWidth,

        flexShrink: 0,

        '& .MuiDrawer-paper':
        {
          width:
            drawerWidth,

          margin:
            '16px',

          height:
            'calc(100% - 32px)',

          borderRadius:
            '28px',

          overflowX:
            'hidden',

          boxSizing:
            'border-box',

          background:
            'rgba(15, 23, 42, 0.85)',

          backdropFilter:
            'blur(20px)',

          border:
            '1px solid rgba(255,255,255,0.08)',

          color:
            '#fff',
        },
      }}
    >
      <Box
        sx={{
          display:
            'flex',

          flexDirection:
            'column',

          height:
            '100%',
        }}
      >

        {/* Logo */}

        <Box
          sx={{
            p: 3,
            display:
              'flex',

            alignItems:
              'center',

            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,

              borderRadius:
                '16px',

              background:
                'linear-gradient(135deg,#6366F1,#8B5CF6)',

              display:
                'flex',

              alignItems:
                'center',

              justifyContent:
                'center',

              fontWeight: 700,
              fontSize: 22,
            }}
          >
            EA
          </Box>

          <Box>
            <Typography
              fontWeight={700}
              fontSize={20}
            >
              EA Portal
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color:
                  'rgba(255,255,255,0.6)',
              }}
            >
              HR Management
            </Typography>
          </Box>
        </Box>

        {/* User Card */}

        <Box
          sx={{
            mx: 2,
            mb: 3,
            p: 2,

            borderRadius:
              '20px',

            background:
              'rgba(255,255,255,0.05)',

            border:
              '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Typography
            fontWeight={600}
          >
            {user?.firstName}{' '}
            {user?.lastName}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color:
                'rgba(255,255,255,0.6)',
            }}
          >
            {user?.role}
          </Typography>
        </Box>

        {/* Navigation */}

        <List
          sx={{
            flexGrow: 1,
            px: 1,

            overflowY: 'auto',
            overflowX: 'hidden',

            '&::-webkit-scrollbar': {
              width: '8px',
            },

            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },

            '&::-webkit-scrollbar-thumb': {
              background:
                'linear-gradient(180deg,#6366F1,#8B5CF6)',
              borderRadius: '20px',
            },

            '&::-webkit-scrollbar-thumb:hover': {
              background:
                'linear-gradient(180deg,#818CF8,#A78BFA)',
            },
          }}
        >
          {menuItems.map(
            item => (
              <NavLink
                key={
                  item.path
                }
                to={
                  item.path
                }
                end={
                  item.end
                }
                style={{
                  textDecoration:
                    'none',

                  color:
                    'inherit',
                }}
              >
                {({
                  isActive,
                }) => (
                  <ListItemButton
                    sx={{
                      mx: 1,
                      mb: 1,

                      py: 1.5,

                      borderRadius:
                        '16px',

                      background:
                        isActive
                          ? 'linear-gradient(135deg,#4F46E5,#6366F1)'
                          : 'transparent',

                      transition:
                        'all .25s ease',

                      '&:hover':
                      {
                        background:
                          isActive
                            ? 'linear-gradient(135deg,#4F46E5,#6366F1)'
                            : 'rgba(255,255,255,0.08)',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          '#fff',

                        minWidth:
                          42,
                      }}
                    >
                      {
                        item.icon
                      }
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        item.text
                      }
                    />
                  </ListItemButton>
                )}
              </NavLink>
            ),
          )}
        </List>

        {/* Account Section */}

        <Box
          sx={{
            px: 3,
            pb: 2,
          }}
        >
          <Typography
            sx={{
              color:
                'rgba(255,255,255,0.5)',

              fontSize: 12,

              textTransform:
                'uppercase',

              letterSpacing:
                1,

              mb: 1,
            }}
          >
            Account
          </Typography>

          <Button
            fullWidth
            startIcon={
              <Logout />
            }
            onClick={
              handleLogout
            }
            sx={{
              py: 1.5,

              borderRadius:
                '16px',

              background:
                'rgba(239,68,68,0.15)',

              color:
                '#EF4444',

              '&:hover':
              {
                background:
                  'rgba(239,68,68,0.25)',
              },
            }}
          >
            Logout
          </Button>
        </Box>

      </Box>
    </Drawer>
  );
};

export default AppSidebar;