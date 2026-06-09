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

import { useNavigate } from 'react-router-dom';
  import {
  useSelector,
} from 'react-redux';

const DashboardHeader = () => {
    const navigate = useNavigate();



const user =
  useSelector(
    state =>
      state.auth.user,
  );

    const handleProfileClick = () => {
        navigate('/profile'); // Change this route if needed
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: 'transparent',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                background:
                        'linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)',
                        
            }}
        >
            <Toolbar
                sx={{
                    minHeight: '80px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                            color:'#fff',
                        }}
                    >
                        Welcome Back 👋
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color:'#fff',
                        }}
                    >
                        Manage your workforce efficiently
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <TextField
                        size="small"
                        placeholder="Search..."
                        sx={{
                            width: 280,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                bgcolor: '#fff',
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <IconButton>
                        <Badge
                            badgeContent={3}
                            color="error"
                        >
                            <NotificationsNone
                            sx={{
                                color:'#fff'
                            }} />
                        </Badge>
                    </IconButton>

                    <Box
                        onClick={handleProfileClick}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                            borderRadius: 2,
                            px: 1,
                            py: 0.5,
                            
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor:
                                    'rgba(0,0,0,0.05)',
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
                                transition:
                                    'transform 0.2s ease',
                            }}
                        />

                        <Typography
                            fontWeight={600}
                            sx={{
                                color:'#fff',
                            }}
                        >
                            {user?.firstName}
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default DashboardHeader;