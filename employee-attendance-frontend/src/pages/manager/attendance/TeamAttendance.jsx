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
  getTeamAttendance,
} from '../../../api/attendanceService';

const TeamAttendance = () => {
  const [
    attendance,
    setAttendance,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState('');

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance =
    async () => {
      try {
        const data =
          await getTeamAttendance();

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
            search.toLowerCase(),
          ),
    );

  const rows =
    filteredAttendance.map(
      record => ({
        id:
          record.id,

        employee:
          `${record.user?.firstName || ''} ${record.user?.lastName || ''}`,

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
          record.totalHours || 0,
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

      renderCell:
        params => (
          <Chip
            label={`${params.value} hrs`}
            color="primary"
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

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          sx={{
            color:"#fff"
          }}
        >
          Team Attendance
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
            borderRadius:4,
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
            maxWidth: 280,
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
              <Groups
                color="primary"
              />

              <Box>
                <Typography
                  color="text.secondary"
                >
                  Attendance Records
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

        {/* Attendance Grid */}

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

export default TeamAttendance;