import {
  useEffect,
  useState,
  useMemo,
} from 'react';

import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';

import {
  DataGrid,
} from '@mui/x-data-grid';

import {
  Add,
  Search,
  Edit,
  Delete,
  SupervisorAccount,
} from '@mui/icons-material';

import AppLayout from '../../../layout/AppLayout';

import {
  getUsers,
  deleteUser,
} from '../../../api/userService';

import CreateUserModal from '../../../components/CreateUserModal';
import EditUserModal from '../../../components/EditUserModal';
import AssignManagerModal from '../../../components/AssignManagerModal';

const Users = () => {
  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState('');

  const [
    showCreateModal,
    setShowCreateModal,
  ] = useState(false);

  const [
    selectedUser,
    setSelectedUser,
  ] = useState(null);

  const [
    showEditModal,
    setShowEditModal,
  ] = useState(false);

  const [
    showAssignManagerModal,
    setShowAssignManagerModal,
  ] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers =
    async () => {
      try {
        const data =
          await getUsers();

        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          'Delete this user?',
        );

      if (!confirmDelete)
        return;

      try {
        await deleteUser(id);
        loadUsers();
      } catch (error) {
        console.error(error);
      }
    };

  const openEdit = (
    user,
  ) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const openAssignManager = (
    user,
  ) => {
    setSelectedUser(user);

    setShowAssignManagerModal(
      true,
    );
  };

  const roles = [
    {
      id:
        '6ac6e746-1990-4eae-82a0-3c40b4bbf420',
      name: 'ADMIN',
    },
    {
      id:
        'c5859b95-e041-4bab-a407-8f040424b975',
      name: 'HR',
    },
    {
      id:
        'db61a5eb-52b7-40a4-881e-d022a9ccdff1',
      name: 'MANAGER',
    },
    {
      id:
        'f1ddb77a-11ff-4e24-84b4-20f6ab41820c',
      name: 'EMPLOYEE',
    },
  ];

  const filteredUsers =
    users.filter(
      (user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ) ||
        user.email
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ) ||
        user.username
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ),
    );

  const columns =
    useMemo(
      () => [
        {
          field: 'name',
          headerName:
            'Name',
          flex: 1.2,
        },

        {
          field: 'username',
          headerName:
            'Username',
          flex: 1,
        },

        {
          field: 'email',
          headerName:
            'Email',
          flex: 1.5,
        },

        {
          field: 'role',
          headerName:
            'Role',
          flex: 1,
          renderCell:
            (
              params,
            ) => (
              <Chip
                label={
                  params.value
                }
                color={
                  params.value ===
                  'ADMIN'
                    ? 'error'
                    : params.value ===
                        'HR'
                      ? 'secondary'
                      : params.value ===
                          'MANAGER'
                        ? 'warning'
                        : 'primary'
                }
                size="small"
              />
            ),
        },

        {
          field: 'status',
          headerName:
            'Status',
          flex: 1,
          renderCell:
            (
              params,
            ) => (
              <Chip
                label={
                  params.value
                }
                color={
                  params.value ===
                  'Active'
                    ? 'success'
                    : 'default'
                }
                size="small"
              />
            ),
        },

        {
          field: 'actions',
          headerName:
            'Actions',
          flex: 1.5,
          sortable:
            false,

          renderCell:
            (
              params,
            ) => (
              <Stack
                direction="row"
                spacing={
                  1
                }
              >
                <IconButton
                  color="primary"
                  onClick={() =>
                    openEdit(
                      params.row
                        .original,
                    )
                  }
                >
                  <Edit />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() =>
                    handleDelete(
                      params.row
                        .id,
                    )
                  }
                >
                  <Delete />
                </IconButton>

                {params.row
                  .role ===
                  'EMPLOYEE' && (
                  <IconButton
                    color="warning"
                    onClick={() =>
                      openAssignManager(
                        params.row
                          .original,
                      )
                    }
                  >
                    <SupervisorAccount />
                  </IconButton>
                )}
              </Stack>
            ),
        },
      ],
      [],
    );

  const rows =
    filteredUsers.map(
      (
        user,
      ) => ({
        id: user.id,

        name:
          `${user.firstName} ${user.lastName}`,

        username:
          user.username,

        email:
          user.email,

        role:
          user.role
            ?.name,

        status:
          user.isActive
            ? 'Active'
            : 'Inactive',

        original:
          user,
      }),
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
            mb: 3,
            
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color:"#fff"
            }}
          >
            Users
            Management
          </Typography>

          <Button
            variant="contained"
            startIcon={
              <Add />
            }
            onClick={() =>
              setShowCreateModal(
                true,
              )
            }
            sx={{
              borderRadius: 3,
            }}
          >
            Create User
          </Button>
        </Box>

        {/* Search */}

        <TextField
          fullWidth
          placeholder="Search users..."
          value={search}
          onChange={(
            e,
          ) =>
            setSearch(
              e.target.value,
            )
          }
          sx={{
            mb: 3,
            maxWidth:
              400,
              background:"#fff",
              borderRadius:'10px'
          }}
          InputProps={{
            startAdornment:
              (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
          }}
        />

        {/* DataGrid */}

        <Card
          elevation={4}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Box
              sx={{
                height: 650,
                width:
                  '100%',
              }}
            >
              <DataGrid
                rows={
                  rows
                }
                columns={
                  columns
                }
                pageSizeOptions={[
                  10,
                  25,
                  50,
                ]}
                initialState={{
                  pagination:
                    {
                      paginationModel:
                        {
                          pageSize:
                            10,
                        },
                    },
                }}
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>

        {showCreateModal && (
          <CreateUserModal
            roles={roles}
            onClose={() =>
              setShowCreateModal(
                false,
              )
            }
            onSuccess={
              loadUsers
            }
          />
        )}

        {showEditModal &&
          selectedUser && (
            <EditUserModal
              user={
                selectedUser
              }
              onClose={() =>
                setShowEditModal(
                  false,
                )
              }
              onSuccess={
                loadUsers
              }
            />
          )}

        {showAssignManagerModal &&
          selectedUser && (
            <AssignManagerModal
              employee={
                selectedUser
              }
              users={
                users
              }
              onClose={() =>
                setShowAssignManagerModal(
                  false,
                )
              }
              onSuccess={
                loadUsers
              }
            />
          )}
      </Box>
    </AppLayout>
  );
};

export default Users;