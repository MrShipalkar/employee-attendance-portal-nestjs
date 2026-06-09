import {
    useEffect,
    useState,
} from 'react';

import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    TextField,
    Button,
    Grid,
    CircularProgress,
    Stack,
} from '@mui/material';

import {
    CloudUpload,
    Save,
} from '@mui/icons-material';

import {
    getMyProfile,
    updateMyProfile,
    uploadProfilePicture,
} from '../../api/profileService';

import AppLayout from '../../layout/AppLayout';

import {
    useSelector,
} from 'react-redux';
import {
    useDispatch,
} from 'react-redux';

import {
    updateUser,
} from '../../redux/slices/authSlice';

const Profile = () => {
    const [profile, setProfile] =
        useState(null);

    const dispatch =
        useDispatch();

    const [formData, setFormData] =
        useState({
            firstName: '',
            lastName: '',
        });

    const user = useSelector(
        state => state.auth.user,
    );

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile =
        async () => {
            try {
                const data =
                    await getMyProfile();

                const existingUser =
                    user || {};

                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        ...existingUser,
                        firstName:
                            data.firstName,
                        lastName:
                            data.lastName,
                        profilePicture:
                            data.profilePicture,
                    }),
                );

                setProfile(data);

                setFormData({
                    firstName:
                        data.firstName,
                    lastName:
                        data.lastName,
                });
            } catch (error) {
                console.error(error);
            }
        };

    const handleChange =
        e => {
            setFormData({
                ...formData,
                [e.target.name]:
                    e.target.value,
            });
        };

    const handleSave =
        async () => {
            try {
                await updateMyProfile(
                    formData,
                );
                dispatch(
                    updateUser({
                        firstName:
                            formData.firstName,

                        lastName:
                            formData.lastName,
                    }),
                );

                alert(
                    'Profile updated successfully',
                );

                loadProfile();
            } catch (error) {
                console.error(error);
            }
        };

    const handleImageUpload =
        async e => {
            const file =
                e.target.files[0];

            if (!file) return;

            try {
                await uploadProfilePicture(
                    file,
                );

                await loadProfile();

                alert(
                    'Profile picture updated successfully',
                );
            } catch (error) {
                console.error(error);
            }
        };

    if (!profile) {
        return (
            <Box
                sx={{
                    display:
                        'flex',
                    justifyContent:
                        'center',
                    alignItems:
                        'center',
                    height:
                        '50vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    const profileContent = (
        <Box sx={{ p: 3 }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >
                My Profile
            </Typography>

            <Grid
                container
                spacing={3}
            >
                <Grid
                    size={{
                        xs: 12,
                        md: 4,
                    }}
                >
                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: 4,
                            textAlign:
                                'center',
                        }}
                    >
                        <CardContent
                            sx={{
                                p: 4,
                            }}
                        >
                            <Avatar
                                src={
                                    profile.profilePicture
                                        ? `http://localhost:5000${profile.profilePicture}`
                                        : '/avatar.png'
                                }
                                sx={{
                                    width: 140,
                                    height: 140,
                                    mx: 'auto',
                                    mb: 3,
                                    border:
                                        '4px solid #1976d2',
                                }}
                            />

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                            >
                                {profile.firstName}{' '}
                                {profile.lastName}
                            </Typography>

                            <Typography
                                color="text.secondary"
                                mb={3}
                            >
                                {profile.role?.name}
                            </Typography>

                            <Button
                                component="label"
                                variant="contained"
                                startIcon={
                                    <CloudUpload />
                                }
                            >
                                Upload Photo

                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleImageUpload
                                    }
                                />
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 8,
                    }}
                >
                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: 4,
                        }}
                    >
                        <CardContent
                            sx={{
                                p: 4,
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                mb={3}
                            >
                                Personal Information
                            </Typography>

                            <Stack spacing={3}>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={
                                        formData.firstName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    fullWidth
                                />

                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={
                                        formData.lastName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    fullWidth
                                />

                                <TextField
                                    label="Username"
                                    value={
                                        profile.username
                                    }
                                    disabled
                                    fullWidth
                                />

                                <TextField
                                    label="Email"
                                    value={
                                        profile.email
                                    }
                                    disabled
                                    fullWidth
                                />

                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={
                                        <Save />
                                    }
                                    onClick={
                                        handleSave
                                    }
                                >
                                    Save Changes
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <AppLayout>
            {profileContent}
        </AppLayout>
    );
};

export default Profile;