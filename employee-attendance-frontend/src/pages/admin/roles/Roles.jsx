import {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';

import {
  Security,
} from '@mui/icons-material';

import AppLayout from '../../../layout/AppLayout';

import {
  getRoles,
} from '../../../api/roleService';

const Roles = () => {
  const [roles, setRoles] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles =
    async () => {
      try {
        const data =
          await getRoles();

        setRoles(data);
      } catch (error) {
        console.error(error);
      }
    };

  const getRoleColor =
    role => {
      switch (
        role
      ) {
        case 'ADMIN':
          return 'error';

        case 'HR':
          return 'secondary';

        case 'MANAGER':
          return 'warning';

        default:
          return 'primary';
      }
    };

  const getRoleDescription =
    role => {
      switch (
        role
      ) {
        case 'ADMIN':
          return 'Full system access and administration';

        case 'HR':
          return 'Human resources and employee management';

        case 'MANAGER':
          return 'Team management and approvals';

        case 'EMPLOYEE':
          return 'Basic employee access';

        default:
          return '';
      }
    };

  return (
    <AppLayout>
      <Box
        sx={{
          p: 3,
        }}
      >
        {/* Header */}

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
        >
          Roles Management
        </Typography>

        {/* Role Cards */}

        <Grid
          container
          spacing={3}
        >
          {roles.map(
            role => (
              <Grid
                key={
                  role.id
                }
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 3,
                }}
              >
                <Card
                  elevation={4}
                  sx={{
                    borderRadius: 4,
                    height:
                      '100%',
                    transition:
                      '0.3s',

                    '&:hover':
                    {
                      transform:
                        'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display:
                          'flex',
                        justifyContent:
                          'space-between',
                        alignItems:
                          'center',
                        mb: 2,
                      }}
                    >
                      <Security
                        color="primary"
                      />

                      <Chip
                        label={
                          role.name
                        }
                        color={getRoleColor(
                          role.name,
                        )}
                        size="small"
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {
                        role.name
                      }
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        minHeight:
                          40,
                      }}
                    >
                      {getRoleDescription(
                        role.name,
                      )}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() =>
                        navigate(
                          `/admin/roles/${role.id}/permissions`,
                        )
                      }
                    >
                      Manage Permissions
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ),
          )}
        </Grid>
      </Box>
    </AppLayout>
  );
};

export default Roles;