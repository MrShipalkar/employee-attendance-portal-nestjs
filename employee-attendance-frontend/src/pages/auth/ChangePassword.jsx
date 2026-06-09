import {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';

import {
  Lock,
  Security,
  Visibility,
  VisibilityOff,
  Send,
} from '@mui/icons-material';

import {
  changePassword,
  sendChangePasswordOtp,
} from '../../api/authService';

import { useSelector } from 'react-redux';

const ChangePassword = () => {
  const navigate =
    useNavigate();

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState('');

  const [
    newPassword,
    setNewPassword,
  ] = useState('');

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  const [otp, setOtp] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [
    otpLoading,
    setOtpLoading,
  ] = useState(false);

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] = useState(false);

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  useEffect(() => {
    const user =
      JSON.parse(
        localStorage.getItem(
          'user',
        ),
      );

    if (
      !user?.forcePasswordChange
    ) {
      switch (
        user?.role
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
    }
  }, [navigate]);

  const handleSendOtp =
    async () => {
      try {
        setOtpLoading(true);

        await sendChangePasswordOtp();

        alert(
          'OTP sent to your registered email',
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            'Failed to send OTP',
        );
      } finally {
        setOtpLoading(false);
      }
    };

  const handleSubmit =
    async e => {
      e.preventDefault();

      if (
        newPassword.length < 8
      ) {
        alert(
          'Password must be at least 8 characters',
        );
        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        alert(
          'Passwords do not match',
        );
        return;
      }

      if (!otp) {
        alert(
          'Please enter OTP',
        );
        return;
      }

      try {
        setLoading(true);

        await changePassword({
          currentPassword,
          newPassword,
          otp,
        });

        const user = useSelector(
  state => state.auth.user,
);

        user.forcePasswordChange =
          false;

        localStorage.setItem(
          'user',
          JSON.stringify(user),
        );

        alert(
          'Password changed successfully',
        );

        switch (
          user.role
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
        alert(
          error.response?.data
            ?.message ||
            'Failed to change password',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent:
          'center',
        alignItems:
          'center',
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2563eb 100%)',
        p: 3,
      }}
    >
      <Card
        elevation={12}
        sx={{
          width: '100%',
          maxWidth: 600,
          borderRadius: 5,
        }}
      >
        <CardContent
          sx={{
            p: 5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent:
                'center',
              mb: 2,
            }}
          >
            <Security
              sx={{
                fontSize: 60,
                color:
                  'primary.main',
              }}
            />
          </Box>

          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Change Password
          </Typography>

          <Alert
            severity="warning"
            sx={{
              mb: 3,
            }}
          >
            Your password was reset by an administrator.
            Please create a new password before continuing.
          </Alert>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <TextField
              fullWidth
              label="Current Password"
              margin="normal"
              type={
                showCurrentPassword
                  ? 'text'
                  : 'password'
              }
              value={
                currentPassword
              }
              onChange={e =>
                setCurrentPassword(
                  e.target.value,
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
                          setShowCurrentPassword(
                            !showCurrentPassword,
                          )
                        }
                      >
                        {showCurrentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
              }}
              required
            />

            <TextField
              fullWidth
              label="New Password"
              margin="normal"
              type={
                showNewPassword
                  ? 'text'
                  : 'password'
              }
              value={
                newPassword
              }
              onChange={e =>
                setNewPassword(
                  e.target.value,
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
                          setShowNewPassword(
                            !showNewPassword,
                          )
                        }
                      >
                        {showNewPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
              }}
              required
            />

            <TextField
              fullWidth
              label="Confirm Password"
              margin="normal"
              type={
                showConfirmPassword
                  ? 'text'
                  : 'password'
              }
              value={
                confirmPassword
              }
              onChange={e =>
                setConfirmPassword(
                  e.target.value,
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
                          setShowConfirmPassword(
                            !showConfirmPassword,
                          )
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
              }}
              required
            />

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mt: 2,
              }}
            >
              <TextField
                fullWidth
                label="OTP"
                value={otp}
                onChange={e =>
                  setOtp(
                    e.target.value,
                  )
                }
              />

              <Button
                variant="contained"
                fullWidth
                startIcon={
                  <Send />
                }
                onClick={
                  handleSendOtp
                }
                disabled={
                  otpLoading
                }
              >
                {otpLoading
                  ? 'Sending...'
                  : 'Send OTP'}
              </Button>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 2,
              }}
              disabled={
                loading
              }
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                'Change Password'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChangePassword;