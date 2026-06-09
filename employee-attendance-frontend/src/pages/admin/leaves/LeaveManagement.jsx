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
  Stack,
  Button,
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

const LeaveManagement = () => {
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
      (leave) =>
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
          } ${
            leave.user?.lastName || ''
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
          p: 3,
        }}
      >
        {/* Header */}

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          sx={{
            color:"#fff"
          }}
        >
          Leave Management
        </Typography>

        <Box
         sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
            alignItems: 'center'
            // alignItems: 'stretch',
          }}
        >
     {/* Search */}

        <TextField
          placeholder="Search Employee..."
          value={
            searchTerm
          }
          onChange={(
            e,
          ) =>
            setSearchTerm(
              e.target.value,
            )
          }
          sx={{
            mb: 3,
            width: 350,
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

        {/* Summary Card */}

        <Card
          elevation={4}
          sx={{
            mb: 3,
            borderRadius: 4,
            maxWidth: 250,
            
          }}
        >
          <CardContent>
            <Typography
              color="text.secondary"
            >
              Total Leave Requests
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
                leaves.length
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

export default LeaveManagement;