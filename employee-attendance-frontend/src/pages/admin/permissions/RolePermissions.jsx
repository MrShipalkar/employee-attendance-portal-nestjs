import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
} from 'react-router-dom';

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
} from '@mui/material';

import {
  Save,
} from '@mui/icons-material';

import AppLayout from '../../../layout/AppLayout';

import {
  getPermissions,
  getRolePermissions,
  updateRolePermissions,
} from '../../../api/permissionService';

const RolePermissions = () => {
  const { roleId } =
    useParams();

  const [
    permissions,
    setPermissions,
  ] = useState([]);

  const [
    selectedPermissions,
    setSelectedPermissions,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      try {
        const allPermissions =
          await getPermissions();

        const rolePermissions =
          await getRolePermissions(
            roleId,
          );

        setPermissions(
          allPermissions,
        );

        setSelectedPermissions(
          rolePermissions.permissionIds ||
            [],
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const togglePermission =
    permissionId => {
      if (
        selectedPermissions.includes(
          permissionId,
        )
      ) {
        setSelectedPermissions(
          selectedPermissions.filter(
            id =>
              id !==
              permissionId,
          ),
        );
      } else {
        setSelectedPermissions([
          ...selectedPermissions,
          permissionId,
        ]);
      }
    };

  const handleSave =
    async () => {
      try {
        await updateRolePermissions(
          roleId,
          selectedPermissions,
        );

        alert(
          'Permissions updated successfully',
        );
      } catch (error) {
        console.error(error);
      }
    };

  const groupedPermissions =
    permissions.reduce(
      (
        groups,
        permission,
      ) => {
        const category =
          permission.category;

        if (
          !groups[category]
        ) {
          groups[category] =
            [];
        }

        groups[
          category
        ].push(permission);

        return groups;
      },
      {},
    );

  return (
    <AppLayout>
      <Box
        sx={{
          p: 3,
        }}
      >
        {/* Header */}

        <Box
          sx={{
            display:
              'flex',
            justifyContent:
              'space-between',
            alignItems:
              'center',
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color:"#fff"
            }}
          >
            Role Permissions
          </Typography>

          <Button
            variant="contained"
            startIcon={
              <Save />
            }
            onClick={
              handleSave
            }
            size="large"
          >
            Save Changes
          </Button>
        </Box>

        {loading ? (
          <Box
            sx={{
              display:
                'flex',
              justifyContent:
                'center',
              mt: 8,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            container
            spacing={3}
          >
            {Object.entries(
              groupedPermissions,
            ).map(
              ([
                category,
                perms,
              ]) => (
                <Grid
                  key={
                    category
                  }
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <Card
                    elevation={
                      4
                    }
                    sx={{
                      borderRadius: 4,
                      height:
                        '100%',
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                      >
                        {
                          category
                        }
                      </Typography>

                      <Box
                        sx={{
                          mt: 2,
                        }}
                      >
                        {perms.map(
                          permission => (
                            <FormControlLabel
                              key={
                                permission.id
                              }
                              control={
                                <Checkbox
                                  checked={selectedPermissions.includes(
                                    permission.id,
                                  )}
                                  onChange={() =>
                                    togglePermission(
                                      permission.id,
                                    )
                                  }
                                />
                              }
                              label={
                                permission.name
                              }
                              sx={{
                                display:
                                  'flex',
                                mb: 1,
                              }}
                            />
                          ),
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ),
            )}
          </Grid>
        )}
      </Box>
    </AppLayout>
  );
};

export default RolePermissions;