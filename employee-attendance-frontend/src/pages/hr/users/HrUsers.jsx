import {
  useEffect,
  useState,
} from 'react';

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Chip,
} from '@mui/material';

import {
  Search,
  Groups,
} from '@mui/icons-material';

import {
  DataGrid,
} from '@mui/x-data-grid';

import AppLayout from '../../../layout/AppLayout';

import {
  getEmployeeDirectory,
} from '../../../api/userService';

const HrUsers = () => {
  const [users, setUsers] =
    useState([]);

  const [search,
    setSearch] =
    useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers =
    async () => {
      try {
        const data =
          await getEmployeeDirectory();

        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

  const filteredUsers =
    users.filter(
      user =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ),
    );

  const rows =
    filteredUsers.map(
      user => ({
        id:
          user.id,

        name:
          `${user.firstName} ${user.lastName}`,

        email:
          user.email,

        username:
          user.username,

        role:
          user.role?.name,

        manager:
          user.manager
            ? `${user.manager.firstName} ${user.manager.lastName}`
            : '--',

        status:
          user.isActive,
      }),
    );

  const columns = [
    {
      field: 'name',
      headerName: 'Employee',
      flex: 1.5,
    },

    {
      field: 'email',
      headerName: 'Email',
      flex: 1.8,
    },

    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
    },

    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
    },

    {
      field: 'manager',
      headerName: 'Manager',
      flex: 1.5,
    },

    {
      field: 'status',
      headerName: 'Status',
      flex: 1,

      renderCell:
        params => (
          <Chip
            label={
              params.value
                ? 'Active'
                : 'Inactive'
            }
            color={
              params.value
                ? 'success'
                : 'error'
            }
            size="small"
          />
        ),
    },
  ];

  return (
    <AppLayout>

      <Box
        sx={{
          p: 4,
          background:
                        'linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)',
          minHeight:
            '100vh',
        }}
      >

        {/* Header */}

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          sx={{
            color:"#fff",
            mb:2
          }}
        >
          Employee Directory
        </Typography>

          <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 3,
                    alignItems:'center'
                    // alignItems: 'stretch',
                  }}
                >
        
                {/* Search */}

        <TextField
          placeholder="Search Employee..."
          value={search}
          onChange={e =>
            setSearch(
              e.target.value,
            )
          }
          sx={{
            mb: 3,
            width: 350,
            background:"#fff",
            borderRadius:4
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

        {/* Summary */}

        <Card
          elevation={4}
          sx={{
            mb: 3,
            borderRadius: 4,
            maxWidth: 250,
          }}
        >
          <CardContent>

            <Box
              sx={{
                display:
                  'flex',
                alignItems:
                  'center',
                gap: 2,
              }}
            >
              {/* <Groups
                color="primary"
              /> */}

              <Box>
                <Typography
                  color="text.secondary"
                  sx={{
                  display:"flex",
            justifyContent:"center"
                }}
                >
                  Employees
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                  display:"flex",
            justifyContent:"center"
                }}
                >
                  {
                    users.length
                  }
                </Typography>
              </Box>

            </Box>

          </CardContent>
        </Card>
        
                </Box>

 

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
                height: 700,
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
                  100,
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

      </Box>

    </AppLayout>
  );
};

export default HrUsers;