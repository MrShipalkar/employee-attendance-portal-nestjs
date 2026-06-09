import {
  useEffect,
  useState,
  useMemo,
} from 'react';

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
} from '@mui/material';

import {
  Search,
} from '@mui/icons-material';

import {
  DataGrid,
} from '@mui/x-data-grid';

import AppLayout from '../../../layout/AppLayout';

import {
  getAllLeaves,
  approveLeave,
  rejectLeave,
} from '../../../api/leaveService';

const HrLeaveManagement = () => {
  const [leaves, setLeaves] =
    useState([]);

  const [searchTerm,
    setSearchTerm] =
    useState('');

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves =
    async () => {
      try {
        const data =
          await getAllLeaves();

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
            searchTerm.toLowerCase(),
          ),
    );

  const columns =
    useMemo(
      () => [
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
            (
              params,
            ) => (
              <Chip
                label={
                  params.value
                }
                color={
                  params.value ===
                    'APPROVED'
                    ? 'success'
                    : params.value ===
                      'REJECTED'
                      ? 'error'
                      : 'warning'
                }
                size="small"
              />
            ),
        },

        {
          field:
            'actions',
          headerName:
            'Actions',
          flex: 2,
          sortable:
            false,

          renderCell:
            (
              params,
            ) =>
              params.row
                .status ===
                'PENDING' ? (
                <Stack
                  direction="row"
                  spacing={
                    1
                  }
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() =>
                      handleApprove(
                        params
                          .row
                          .id,
                      )
                    }
                  >
                    Approve
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() =>
                      handleReject(
                        params
                          .row
                          .id,
                      )
                    }
                  >
                    Reject
                  </Button>
                </Stack>
              ) : (
                '-'
              ),
        },
      ],
      [],
    );

  const rows =
    filteredLeaves.map(
      (
        leave,
      ) => ({
        id:
          leave.id,

        employee:
          `${leave.user?.firstName || ''
          } ${leave.user?.lastName || ''
          }`,

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
            color: "#fff"
          }}
        >
          Leave Requests
        </Typography>



        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
            // alignItems: 'stretch',
          }}
        >

          {/* Search */}

          <TextField
            placeholder="Search Employee..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value,
              )
            }
            sx={{
              minWidth: 300,
              maxHeight:55,
              background: '#fff',
              borderRadius: 4,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          {/* Total */}

          <Card
            sx={{
              minWidth: 180,
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography
                color="text.secondary"
              >
                Total Requests
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {leaves.length}
              </Typography>
            </CardContent>
          </Card>

          {/* Pending */}

          <Card
            sx={{
              minWidth: 180,
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography
                color="text.secondary"
              >
                Pending
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color="#f59e0b"
              >
                {
                  leaves.filter(
                    l =>
                      l.status ===
                      'PENDING',
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>

          {/* Approved */}

          <Card
            sx={{
              minWidth: 180,
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography
                color="text.secondary"
              >
                Approved
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color="#16a34a"
              >
                {
                  leaves.filter(
                    l =>
                      l.status ===
                      'APPROVED',
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>

          {/* Rejected */}

          <Card
            sx={{
              minWidth: 180,
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography
                color="text.secondary"
              >
                Rejected
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color="#dc2626"
              >
                {
                  leaves.filter(
                    l =>
                      l.status ===
                      'REJECTED',
                  ).length
                }
              </Typography>
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

      </Box>
    </AppLayout>
  );
};

export default HrLeaveManagement;