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
  PersonAdd,
} from '@mui/icons-material';

import {
  createUser,
} from '../api/userService';

const CreateUserModal = ({
  onClose,
  onSuccess,
  roles,
}) => {
  const [formData, setFormData] =
    useState({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      roleId: '',
    });

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createUser(
          formData,
        );

        onSuccess();
        onClose();
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            'Error creating user',
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
        Create User
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
                  'primary.main',
                mb: 2,
              }}
            >
              <PersonAdd
                sx={{
                  fontSize: 40,
                }}
              />
            </Avatar>

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              New Employee
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Create a new user
              account
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
                required
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
                required
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
                label="Username"
                name="username"
                value={
                  formData.username
                }
                onChange={
                  handleChange
                }
                required
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
                type="password"
                label="Password"
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                required
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
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
                label="Role"
                name="roleId"
                value={
                  formData.roleId
                }
                onChange={
                  handleChange
                }
                required
              >
                {roles.map(
                  (
                    role,
                  ) => (
                    <MenuItem
                      key={
                        role.id
                      }
                      value={
                        role.id
                      }
                    >
                      {
                        role.name
                      }
                    </MenuItem>
                  ),
                )}
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
            Create User
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateUserModal;