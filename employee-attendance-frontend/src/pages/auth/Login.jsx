import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Snackbar,
    Alert,
    CircularProgress,
    Paper,
    Stack,
} from '@mui/material';

import {
    Person,
    Lock,
    Visibility,
    VisibilityOff,
    AccessTime,
    CheckCircle,
} from '@mui/icons-material';

import { loginUser } from '../../api/authService';
// import { useAuth } from '../../context/AuthContext';
import {
    useDispatch,
} from 'react-redux';

import {
    loginSuccess,
} from '../../redux/slices/authSlice';

const Login = () => {
    const navigate = useNavigate();


    const [username, setUsername] =
        useState('');

    const [password, setPassword] =
        useState('');

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState('');

    const [openSnackbar, setOpenSnackbar] =
        useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const dispatch =
        useDispatch();

    const handleSubmit =
        async (e) => {
            e.preventDefault();

            try {
                setLoading(true);

                const data =
                    await loginUser(
                        username,
                        password,
                    );

            
                dispatch(
                    loginSuccess({
                        token:
                            data.accessToken,

                        user: {
                            ...data.user,
                            forcePasswordChange:
                                data.forcePasswordChange,
                        },
                    }),
                );

                if (
                    data.forcePasswordChange
                ) {
                    navigate(
                        '/change-password',
                    );
                    return;
                }

                switch (
                data.user.role
                ) {
                    case 'ADMIN':
                        navigate(
                            '/admin/dashboard',
                        );
                        break;

                    case 'HR':
                        navigate(
                            '/hr/dashboard',
                        );
                        break;

                    case 'MANAGER':
                        navigate(
                            '/manager/dashboard',
                        );
                        break;

                    default:
                        navigate(
                            '/employee/dashboard',
                        );
                }
            } catch (error) {
                setError(
                    error.response?.data
                        ?.message ||
                    'Login failed',
                );

                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        };

    return (
        <>
            <Box
                sx={{
                    minHeight:
                        '100vh',
                    display: 'flex',
                    position:
                        'relative',
                    overflow:
                        'hidden',
                    background:
                        'linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)',
                }}
            >
                {/* Blur Effects */}

                <Box
                    sx={{
                        position:
                            'absolute',
                        top: -200,
                        left: -150,
                        width: 450,
                        height: 450,
                        borderRadius:
                            '50%',
                        background:
                            'rgba(37,99,235,0.35)',
                        filter:
                            'blur(140px)',
                    }}
                />

                <Box
                    sx={{
                        position:
                            'absolute',
                        bottom:
                            -200,
                        right:
                            -150,
                        width: 450,
                        height: 450,
                        borderRadius:
                            '50%',
                        background:
                            'rgba(124,58,237,0.35)',
                        filter:
                            'blur(140px)',
                    }}
                />

                {/* Left Section */}

                <Box
                    sx={{
                        flex: 1,
                        display: {
                            xs: 'none',
                            md: 'flex',
                        },
                        flexDirection:
                            'column',
                        justifyContent:
                            'center',
                        px: 10,
                        position:
                            'relative',
                        zIndex: 2,
                    }}
                >
                    <Box
                        sx={{
                            maxWidth:
                                550,
                        }}
                    >
                        <AccessTime
                            sx={{
                                fontSize:
                                    80,
                                color:
                                    '#60a5fa',
                                mb: 3,
                            }}
                        />

                        <Typography
                            variant="h2"
                            fontWeight={
                                800
                            }
                            sx={{
                                color:
                                    '#fff',
                                lineHeight:
                                    1.1,
                                mb: 3,
                            }}
                        >
                            Employee
                            Attendance
                            Portal
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                color:
                                    'rgba(255,255,255,0.75)',
                                mb: 5,
                                lineHeight:
                                    1.8,
                            }}
                        >
                            Workforce
                            management
                            made simple.
                            Manage
                            attendance,
                            leaves,
                            employees
                            and
                            permissions
                            from a
                            single
                            platform.
                        </Typography>

                        <Stack
                            spacing={
                                2
                            }
                        >
                            {[
                                'Attendance Tracking',
                                'Leave Management',
                                'Employee Management',
                                'Role Based Access',
                            ].map(
                                (
                                    item,
                                ) => (
                                    <Box
                                        key={
                                            item
                                        }
                                        sx={{
                                            display:
                                                'flex',
                                            alignItems:
                                                'center',
                                            gap: 2,
                                        }}
                                    >
                                        <CheckCircle
                                            sx={{
                                                color:
                                                    '#60a5fa',
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                color:
                                                    '#fff',
                                            }}
                                        >
                                            {
                                                item
                                            }
                                        </Typography>
                                    </Box>
                                ),
                            )}
                        </Stack>
                    </Box>
                </Box>

                {/* Right Section */}

                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent:
                            'center',
                        alignItems:
                            'center',
                        p: 3,
                        position:
                            'relative',
                        zIndex: 2,
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            width:
                                '100%',
                            maxWidth:
                                450,

                            p: 5,

                            borderRadius: 6,

                            backdropFilter:
                                'blur(24px)',

                            background:
                                'rgba(255,255,255,0.08)',

                            border:
                                '1px solid rgba(255,255,255,0.12)',

                            boxShadow:
                                '0 20px 60px rgba(0,0,0,0.3)',
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight={
                                700
                            }
                            sx={{
                                color:
                                    '#fff',
                                mb: 1,
                            }}
                        >
                            Welcome
                            Back
                        </Typography>

                        <Typography
                            sx={{
                                color:
                                    'rgba(255,255,255,0.7)',
                                mb: 4,
                            }}
                        >
                            Sign in to
                            continue
                            to your
                            account
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={
                                handleSubmit
                            }
                        >
                            <TextField
                                fullWidth
                                label="Username"
                                margin="normal"
                                value={
                                    username
                                }
                                onChange={(
                                    e,
                                ) =>
                                    setUsername(
                                        e.target
                                            .value,
                                    )
                                }
                                InputProps={{
                                    startAdornment:
                                        (
                                            <InputAdornment position="start">
                                                <Person />
                                            </InputAdornment>
                                        ),
                                }}
                                sx={{
                                    mb: 2,

                                    '& .MuiOutlinedInput-root':
                                    {
                                        borderRadius: 3,
                                        background:
                                            'rgba(255,255,255,0.05)',
                                        color:
                                            '#fff',
                                    },

                                    '& .MuiInputLabel-root':
                                    {
                                        color:
                                            'rgba(255,255,255,0.7)',
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type={
                                    showPassword
                                        ? 'text'
                                        : 'password'
                                }
                                margin="normal"
                                value={
                                    password
                                }
                                onChange={(
                                    e,
                                ) =>
                                    setPassword(
                                        e.target
                                            .value,
                                    )
                                }
                                InputProps={{
                                    startAdornment:
                                        (
                                            <InputAdornment position="start">
                                                <Lock />
                                            </InputAdornment>
                                        ),

                                    endAdornment:
                                        (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                }}
                                sx={{
                                    mb: 3,

                                    '& .MuiOutlinedInput-root':
                                    {
                                        borderRadius: 3,
                                        background:
                                            'rgba(255,255,255,0.05)',
                                        color:
                                            '#fff',
                                    },

                                    '& .MuiInputLabel-root':
                                    {
                                        color:
                                            'rgba(255,255,255,0.7)',
                                    },
                                }}
                            />

                            <Button
                                fullWidth
                                type="submit"
                                disabled={
                                    loading ||
                                    !username.trim() ||
                                    !password.trim()
                                }
                                sx={{
                                    height: 56,
                                    borderRadius: 3,

                                    textTransform:
                                        'none',

                                    fontSize:
                                        '1rem',

                                    fontWeight:
                                        700,

                                    background:
                                        'linear-gradient(135deg,#2563eb,#7c3aed)',

                                    color:
                                        '#fff',

                                    '&:hover':
                                    {
                                        background:
                                            'linear-gradient(135deg,#1d4ed8,#6d28d9)',
                                    },
                                }}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={
                                            24
                                        }
                                        color="inherit"
                                    />
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={
                    4000
                }
                onClose={
                    handleCloseSnackbar
                }
                anchorOrigin={{
                    vertical:
                        'top',
                    horizontal:
                        'right',
                }}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    onClose={
                        handleCloseSnackbar
                    }
                >
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Login;