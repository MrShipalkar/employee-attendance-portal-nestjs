import { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Avatar,
  Box,
  Typography,
} from '@mui/material';

import {
  Edit,
} from '@mui/icons-material';

import {
  updateUser,
} from '../api/userService';

const EditUserModal = ({
  user,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] =
    useState({
      firstName:
        user.firstName || '',

      lastName:
        user.lastName || '',

      email:
        user.email || '',

      password: '',

      isActive:
        user.isActive,
    });

  const handleChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      setFormData({
        ...formData,
        [name]: value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const payload = {
          ...formData,
        };

        if (
          !payload.password
        ) {
          delete payload.password;
        }

        await updateUser(
          user.id,
          payload,
        );

        alert(
          formData.password
            ? 'User updated and temporary password reset successfully'
            : 'User updated successfully',
        );

        onSuccess();
        onClose();
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
          'Failed to update user',
        );
      }
    };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Edit User
      </DialogTitle>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <DialogContent>

          <Box
            sx={{
              display:
                'flex',
              flexDirection:
                'column',
              alignItems:
                'center',
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor:
                  'warning.main',
                mb: 2,
              }}
            >
              <Edit
                sx={{
                  fontSize: 40,
                }}
              />
            </Avatar>

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              {
                user.firstName
              }{' '}
              {
                user.lastName
              }
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Update user
              information
            </Typography>
          </Box>

          <Grid
            container
            spacing={3}
          >
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={
                  formData.firstName
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={
                  formData.lastName
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                type="password"
                label="Temporary Password"
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                helperText="Leave blank to keep current password. If provided, user must change password on next login."
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
              }}
            >
              <TextField
                select
                fullWidth
                label="Status"
                value={
                  formData.isActive
                }
                onChange={(
                  e,
                ) =>
                  setFormData({
                    ...formData,
                    isActive:
                      e.target
                        .value ===
                      'true',
                  })
                }
              >
                <MenuItem value="true">
                  Active
                </MenuItem>

                <MenuItem value="false">
                  Inactive
                </MenuItem>
              </TextField>
            </Grid>

          </Grid>

        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
          }}
        >
          <Button
            onClick={
              onClose
            }
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
          >
            Update User
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserModal;