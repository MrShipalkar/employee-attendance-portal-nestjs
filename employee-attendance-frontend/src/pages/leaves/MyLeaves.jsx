import {
  useEffect,
  useState,
} from 'react';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
} from '@mui/material';

import {
  EventNote,
} from '@mui/icons-material';

import {
  DataGrid,
} from '@mui/x-data-grid';

import AppLayout from '../../layout/AppLayout';

import {
  getMyLeaves,
} from '../../api/leaveService';

const MyLeaves = () => {
  const [leaves, setLeaves] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves =
    async () => {
      try {
        const data =
          await getMyLeaves();

        setLeaves(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

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

  const rejectedLeaves =
    leaves.filter(
      leave =>
        leave.status ===
        'REJECTED',
    ).length;

  const rows =
    leaves.map(
      leave => ({
        id: leave.id,
        leaveType:
          leave.leaveType,
        startDate:
          leave.startDate,
        endDate:
          leave.endDate,
        status:
          leave.status,
        remarks:
          leave.remarks ||
          '--',
      }),
    );

  const columns = [
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
          let color =
            'warning';

          if (
            params.value ===
            'APPROVED'
          ) {
            color =
              'success';
          }

          if (
            params.value ===
            'REJECTED'
          ) {
            color =
              'error';
          }

          return (
            <Chip
              label={
                params.value
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
        'remarks',
      headerName:
        'Remarks',
      flex: 2,
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
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          sx={{
            color:"#fff",
            mb:2
          }}
        >
          My Leave Requests
        </Typography>

        {/* Summary Cards */}

        <Box
          sx={{
            display:
              'grid',
            gridTemplateColumns:
              {
                xs: '1fr',
                md: 'repeat(3, 1fr)',
              },
            gap: 3,
            mb: 4,
          }}
        >
          <Card
            elevation={4}
            sx={{
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography color="text.secondary"
               sx={{
                  display:"flex",
            justifyContent:"center"
                }}
                >
                Pending Requests
              </Typography>

              <Typography
                variant="h3"
                fontWeight="bold"
                color="warning.main"
                mt={1}
                 sx={{
                  display:"flex",
            justifyContent:"center"
                }}
              >
                {pendingLeaves}
              </Typography>
            </CardContent>
          </Card>

          <Card
            elevation={4}
            sx={{
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography color="text.secondary"
               sx={{
                  display:"flex",
            justifyContent:"center"
                }}
                >
                Approved Requests
              </Typography>

              <Typography
                variant="h3"
                fontWeight="bold"
                color="success.main"
                mt={1}
                 sx={{
                  display:"flex",
            justifyContent:"center"
                }}
              >
                {approvedLeaves}
              </Typography>
            </CardContent>
          </Card>

          <Card
            elevation={4}
            sx={{
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography color="text.secondary"
               sx={{
                  display:"flex",
            justifyContent:"center"
                }}
                >
                Rejected Requests
              </Typography>

              <Typography
                variant="h3"
                fontWeight="bold"
                color="error.main"
                mt={1}
                 sx={{
                  display:"flex",
            justifyContent:"center"
                }}
              >
                {rejectedLeaves}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Leave History */}

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
                Leave History
              </Typography>
            </Box>

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
                loading={
                  loading
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

export default MyLeaves;