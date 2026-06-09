import {
  useEffect,
  useState,
} from 'react';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from '@mui/material';

import {
  Login,
  Logout,
  AccessTime,
} from '@mui/icons-material';

import AppLayout from '../../layout/AppLayout';

import {
  checkIn,
  checkOut,
  getMyAttendance,
} from '../../api/attendanceService';

const MyAttendance = () => {
  const [attendance, setAttendance] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance =
    async () => {
      try {
        const data =
          await getMyAttendance();

        setAttendance(data);
      } catch (error) {
        console.error(error);
      } finally {
        setPageLoading(false);
      }
    };

  const handleCheckIn =
    async () => {
      try {
        setLoading(true);

        await checkIn();

        await loadAttendance();
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            'Failed to check in',
        );
      } finally {
        setLoading(false);
      }
    };

  const handleCheckOut =
    async () => {
      try {
        setLoading(true);

        await checkOut();

        await loadAttendance();
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            'Failed to check out',
        );
      } finally {
        setLoading(false);
      }
    };

  const today =
    attendance[0];

  if (pageLoading) {
    return (
      <AppLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent:
              'center',
            alignItems:
              'center',
            minHeight:
              '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box
        sx={{
          p: 4,
          background:
                        'linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)',
          // backgroundColor:
          //   '#f8fafc',
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
          My Attendance
        </Typography>

        {/* Summary Card */}

        <Card
          elevation={4}
          sx={{
            borderRadius: 4,
            mb: 4,
            background:
                          'rgba(255,255,255,0.85)',
          }}
        >
          <CardContent
          sx={{
            background:
                          'rgba(255,255,255,0.85)',
          }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Today's Status
            </Typography>

            <Grid
              container
              spacing={3}
              mt={1}
            >
              <Grid
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Login color="success" />

                  <Box>
                    <Typography
                      color="text.secondary"
                    >
                      Check In
                    </Typography>

                    <Typography
                      variant="h6"
                    >
                      {today?.checkIn
                        ? new Date(
                            today.checkIn,
                          ).toLocaleTimeString()
                        : '--'}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Logout color="error" />

                  <Box>
                    <Typography
                      color="text.secondary"
                    >
                      Check Out
                    </Typography>

                    <Typography
                      variant="h6"
                    >
                      {today?.checkOut
                        ? new Date(
                            today.checkOut,
                          ).toLocaleTimeString()
                        : '--'}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <AccessTime color="primary" />

                  <Box>
                    <Typography
                      color="text.secondary"
                    >
                      Hours Worked
                    </Typography>

                    <Typography
                      variant="h6"
                    >
                      {today?.totalHours ||
                        '--'}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>

            <Stack
              direction="row"
              spacing={2}
              mt={4}
            >
              <Button
                variant="contained"
                color="success"
                onClick={
                  handleCheckIn
                }
                disabled={
                  loading
                }
              >
                Check In
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={
                  handleCheckOut
                }
                disabled={
                  loading
                }
              >
                Check Out
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* History */}

        <Card
          elevation={4}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              Attendance History
            </Typography>

            <TableContainer
              component={Paper}
              elevation={0}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Date
                    </TableCell>

                    <TableCell>
                      Check In
                    </TableCell>

                    <TableCell>
                      Check Out
                    </TableCell>

                    <TableCell>
                      Hours
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {attendance.map(
                    (
                      record,
                    ) => (
                      <TableRow
                        key={
                          record.id
                        }
                      >
                        <TableCell>
                          {
                            record.attendanceDate
                          }
                        </TableCell>

                        <TableCell>
                          {record.checkIn
                            ? new Date(
                                record.checkIn,
                              ).toLocaleTimeString()
                            : '--'}
                        </TableCell>

                        <TableCell>
                          {record.checkOut
                            ? new Date(
                                record.checkOut,
                              ).toLocaleTimeString()
                            : '--'}
                        </TableCell>

                        <TableCell>
                          {
                            record.totalHours
                          }
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </AppLayout>
  );
};

export default MyAttendance;