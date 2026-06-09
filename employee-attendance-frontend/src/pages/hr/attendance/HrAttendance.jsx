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
        `${record.user?.firstName} ${record.user?.lastName}`
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
          `${record.user?.firstName || ''
          } ${
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
      field:
        'employee',
      headerName:
        'Employee',
      flex: 1.5,
    },

    {
      field:
        'attendanceDate',
      headerName:
        'Date',
      flex: 1,
    },

    {
      field:
        'checkIn',
      headerName:
        'Check In',
      flex: 1,
    },

    {
      field:
        'checkOut',
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
          p: 4,
          backgroundColor:
            '#f8fafc',
          minHeight:
            '100vh',
        }}
      >

        {/* Header */}

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          Attendance Management
        </Typography>

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

export default HrAttendance;