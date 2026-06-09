import {
  useEffect,
  useState,
} from 'react';

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Stack,
} from '@mui/material';

import {
  Search,
  EventNote,
} from '@mui/icons-material';

import {
  DataGrid,
} from '@mui/x-data-grid';

import AppLayout from '../../../layout/AppLayout';

import {
  getTeamLeaves,
  approveLeave,
  rejectLeave,
} from '../../../api/leaveService';

const TeamLeaves = () => {
  const [leaves, setLeaves] =
    useState([]);

  const [search,
    setSearch] =
    useState('');

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves =
    async () => {
      try {
        const data =
          await getTeamLeaves();

        setLeaves(data);
      } catch (error) {
        console.error(error);
      }
    };

  const handleApprove =
    async (id) => {
      try {
        await approveLeave(id);

        loadLeaves();
      } catch (error) {
        console.error(error);
      }
    };

  const handleReject =
    async (id) => {
      try {
        await rejectLeave(id);

        loadLeaves();
      } catch (error) {
        console.error(error);
      }
    };

  const filteredLeaves =
    leaves.filter(
      leave =>
        `${leave.user?.firstName} ${leave.user?.lastName}`
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ),
    );

  const rows =
    filteredLeaves.map(
      leave => ({
        id:
          leave.id,

        employee:
          `${leave.user?.firstName || ''} ${leave.user?.lastName || ''}`,

        leaveType:
          leave.leaveType,

        startDate:
          leave.startDate,

        endDate:
          leave.endDate,

        status:
          leave.status,
      }),
    );

  const columns = [
    {
      field:
        'employee',
      headerName:
        'Employee',
      flex: 1.5,
    },

    {
      field:
        'leaveType',
      headerName:
        'Leave Type',
      flex: 1,
    },

    {
      field:
        'startDate',
      headerName:
        'Start Date',
      flex: 1,
    },

    {
      field:
        'endDate',
      headerName:
        'End Date',
      flex: 1,
    },

    {
      field:
        'status',
      headerName:
        'Status',
      flex: 1,

      renderCell:
        params => {
          const status =
            params.value;

          let color =
            'default';

          if (
            status ===
            'APPROVED'
          )
            color =
              'success';

          if (
            status ===
            'REJECTED'
          )
            color =
              'error';

          if (
            status ===
            'PENDING'
          )
            color =
              'warning';

          return (
            <Chip
              label={
                status
              }
              color={
                color
              }
              size="small"
            />
          );
        },
    },

    {
      field:
        'actions',
      headerName:
        'Actions',
      flex: 1.5,
      sortable: false,

      renderCell:
        params => {
          const leave =
            filteredLeaves.find(
              l =>
                l.id ===
                params.row.id,
            );

          if (
            leave?.status !==
            'PENDING'
          ) {
            return null;
          }

          return (
            <Stack
              direction="row"
              spacing={1}
            >
              <Button
                size="small"
                color="success"
                variant="contained"
                onClick={() =>
                  handleApprove(
                    leave.id,
                  )
                }
              >
                Approve
              </Button>

              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() =>
                  handleReject(
                    leave.id,
                  )
                }
              >
                Reject
              </Button>
            </Stack>
          );
        },
    },
  ];

  const pendingLeaves =
    leaves.filter(
      leave =>
        leave.status ===
        'PENDING',
    ).length;

  const approvedLeaves =
    leaves.filter(
      leave =>
        leave.status ===
        'APPROVED',
    ).length;

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

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          sx={{
            color:"#fff"
          }}
        >
          Team Leave Requests
        </Typography>

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

        {/* Summary Cards */}

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexWrap:
              'wrap',
            mb: 3,
          }}
        >

          <Card
            elevation={4}
            sx={{
              borderRadius: 4,
              minWidth: 220,
            }}
          >
            <CardContent>
              <Typography color="text.secondary">
                Total Requests
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {
                  leaves.length
                }
              </Typography>
            </CardContent>
          </Card>

          <Card
            elevation={4}
            sx={{
              borderRadius: 4,
              minWidth: 220,
            }}
          >
            <CardContent>
              <Typography color="text.secondary">
                Pending
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color="warning.main"
              >
                {
                  pendingLeaves
                }
              </Typography>
            </CardContent>
          </Card>

          <Card
            elevation={4}
            sx={{
              borderRadius: 4,
              minWidth: 220,
            }}
          >
            <CardContent>
              <Typography color="text.secondary">
                Approved
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color="success.main"
              >
                {
                  approvedLeaves
                }
              </Typography>
            </CardContent>
          </Card>

        </Box>

        {/* Grid */}

        <Card
          elevation={4}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent>

            <Box
              sx={{
                display:
                  'flex',
                alignItems:
                  'center',
                gap: 1,
                mb: 2,
              }}
            >
              <EventNote
                color="primary"
              />

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                Team Leave Requests
              </Typography>
            </Box>

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

export default TeamLeaves;