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
} from '@mui/material';

import {
  Search,
  AccessTime,
} from '@mui/icons-material';

import {
  DataGrid,
} from '@mui/x-data-grid';

import AppLayout from '../../../layout/AppLayout';

import {
  getAllAttendance,
} from '../../../api/attendanceService';

const HrAttendance = () => {
  const [
    attendance,
    setAttendance,
  ] = useState([]);

  const [
    searchTerm,
    setSearchTerm,
  ] = useState('');

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance =
    async () => {
      try {
        const data =
          await getAllAttendance();

        setAttendance(data);
      } catch (error) {
        console.error(error);
      }
    };

  const filteredAttendance =
    attendance.filter(
      record =>
        `${record.user?.firstName || ''} ${
          record.user?.lastName || ''
        }`
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase(),
          ),
    );

  const rows =
    filteredAttendance.map(
      record => ({
        id:
          record.id,

        employee:
          `${record.user?.firstName || ''} ${
            record.user?.lastName || ''
          }`,

        attendanceDate:
          record.attendanceDate,

        checkIn:
          record.checkIn
            ? new Date(
                record.checkIn,
              ).toLocaleTimeString()
            : '--',

        checkOut:
          record.checkOut
            ? new Date(
                record.checkOut,
              ).toLocaleTimeString()
            : '--',

        totalHours:
          record.totalHours ||
          '--',
      }),
    );

  const columns = [
    {
      field: 'employee',
      headerName:
        'Employee',
      flex: 1.5,
    },

    {
      field:
        'attendanceDate',
      headerName: 'Date',
      flex: 1,
    },

    {
      field: 'checkIn',
      headerName:
        'Check In',
      flex: 1,
    },

    {
      field: 'checkOut',
      headerName:
        'Check Out',
      flex: 1,
    },

    {
      field:
        'totalHours',
      headerName:
        'Hours',
      flex: 1,
    },
  ];

  return (
    <AppLayout>
      <Box
        sx={{
          p: 1,
        }}
      >
        {/* Title */}

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: '#fff',
            mb: 3,
          }}
        >
          Attendance Management
        </Typography>

        {/* Search + Summary */}

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
            alignItems:
              'center',
          }}
        >
          <TextField
            placeholder="Search Employee..."
            value={
              searchTerm
            }
            onChange={e =>
              setSearchTerm(
                e.target.value,
              )
            }
            sx={{
              width: 350,

              '& .MuiOutlinedInput-root':
                {
                  borderRadius: 4,
                  background:
                    '#fff',
                },
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

          <Card
            elevation={4}
            sx={{
              borderRadius: 4,
              minWidth: 220,
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
                <AccessTime
                  color="primary"
                />

                <Box>
                  <Typography
                    color="text.secondary"
                  >
                    Total Records
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                  >
                    {
                      attendance.length
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
                rows={rows}
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

export default HrAttendance;