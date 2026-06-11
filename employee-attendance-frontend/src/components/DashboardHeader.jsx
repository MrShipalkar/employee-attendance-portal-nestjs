import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Badge,
} from '@mui/material';

import {
  Search,
  NotificationsNone,
} from '@mui/icons-material';

import {
  useNavigate,
} from 'react-router-dom';

import {
  useSelector,
} from 'react-redux';

const DashboardHeader = () => {
  const navigate =
    useNavigate();

  const user =
    useSelector(
      state =>
        state.auth.user,
    );

  const handleProfileClick =
    () => {
      navigate(
        '/profile',
      );
    };

  const currentHour =
    new Date().getHours();

  const greeting =
    currentHour < 12
      ? 'Good Morning'
      : currentHour < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background:
          'transparent',

        borderBottom:
          '1px solid rgba(255,255,255,0.08)',

        backdropFilter:
          'blur(20px)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '90px',

          px: 4,

          display: 'flex',

          justifyContent:
            'space-between',
        }}
      >
        {/* Left Side */}

        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              color: '#fff',
            }}
          >
            {greeting},{' '}
            {user?.firstName}
            👋
          </Typography>

          <Typography
            sx={{
              color:
                'rgba(255,255,255,0.65)',

              mt: 0.5,
            }}
          >
            Manage your workforce
            efficiently
          </Typography>
        </Box>

        {/* Right Side */}

        <Box
          sx={{
            display: 'flex',

            alignItems:
              'center',

            gap: 2,
          }}
        >
          {/* Search */}

          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              width: 300,

              '& .MuiOutlinedInput-root':
              {
                borderRadius:
                  '16px',

                color:
                  '#fff',

                background:
                  'rgba(255,255,255,0.05)',

                backdropFilter:
                  'blur(20px)',

                '& fieldset':
                {
                  border:
                    '1px solid rgba(255,255,255,0.08)',
                },

                '&:hover fieldset':
                {
                  border:
                    '1px solid rgba(255,255,255,0.15)',
                },
              },

              '& input::placeholder':
              {
                color:
                  'rgba(255,255,255,0.5)',

                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment:
                (
                  <InputAdornment position="start">
                    <Search
                      sx={{
                        color:
                          'rgba(255,255,255,0.6)',
                      }}
                    />
                  </InputAdornment>
                ),
            }}
          />

          {/* Notifications */}

          <IconButton
            sx={{
              width: 48,
              height: 48,

              background:
                'rgba(255,255,255,0.05)',

              border:
                '1px solid rgba(255,255,255,0.08)',

              '&:hover':
              {
                background:
                  'rgba(255,255,255,0.1)',
              },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
            >
              <NotificationsNone
                sx={{
                  color:
                    '#fff',
                }}
              />
            </Badge>
          </IconButton>

          {/* Profile Card */}

          <Box
            onClick={
              handleProfileClick
            }
            sx={{
              display:
                'flex',

              alignItems:
                'center',

              gap: 1.5,

              px: 1.5,
              py: 1,

              cursor:
                'pointer',

              borderRadius:
                '18px',

              background:
                'rgba(255,255,255,0.05)',

              border:
                '1px solid rgba(255,255,255,0.08)',

              transition:
                'all .25s ease',

              '&:hover':
              {
                background:
                  'rgba(255,255,255,0.1)',

                transform:
                  'translateY(-2px)',
              },
            }}
          >
            <Avatar
              src={
                user?.profilePicture
                  ? `http://localhost:5000${user.profilePicture}`
                  : '/avatar.png'
              }
              sx={{
                width: 42,
                height: 42,
              }}
            />

            <Box>
              <Typography
                fontWeight={600}
                sx={{
                  color:
                    '#fff',

                  fontSize:
                    '0.95rem',
                }}
              >
                {
                  user?.firstName
                }
              </Typography>

              <Typography
                sx={{
                  color:
                    'rgba(255,255,255,0.55)',

                  fontSize:
                    '0.75rem',
                }}
              >
                {user?.role}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;