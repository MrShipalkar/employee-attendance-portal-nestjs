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
} from '@mui/material';

import {
  Search,
} from '@mui/icons-material';

import {
  DataGrid,
} from '@mui/x-data-grid';

import AppLayout from '../../../layout/AppLayout';

import {
  getAllAttendance,
} from '../../../api/attendanceService';

const AttendanceManagement = () => {
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
      (record) =>
        `${record.user?.firstName} ${record.user?.lastName}`
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase(),
          ),
    );

  const columns =
    useMemo(
      () => [
        {
          field: 'employee',
          headerName:
            'Employee',
          flex: 1.5,
        },

        {
          field: 'date',
          headerName:
            'Date',
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
          field: 'hours',
          headerName:
            'Hours',
          flex: 1,
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
                    'Present'
                    ? 'success'
                    : 'warning'
                }
                size="small"
              />
            ),
        },
      ],
      [],
    );

  const rows =
    filteredAttendance.map(
      (
        record,
      ) => ({
        id:
          record.id,

        employee:
          `${record.user?.firstName || ''
          } ${record.user?.lastName || ''
          }`,

        date:
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

        hours:
          record.totalHours ||
          '--',

        status:
          record.checkIn
            ? 'Present'
            : 'Absent',
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
          Attendance
          Management
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

        {/* Stats */}

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

export default AttendanceManagement;