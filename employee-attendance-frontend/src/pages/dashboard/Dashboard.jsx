import { useEffect, useState, } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Stack, } from '@mui/material';
import { Groups, SupervisorAccount, Badge, CheckCircle, Cancel, EventNote, Download, } from '@mui/icons-material';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts';
import AppLayout from '../../layout/AppLayout';
import PermissionPage from '../../components/PermissionPage';
import { getEmployeeDashboard, } from '../../api/dashboardService';
import { getAdminDashboard, getHRDashboard, getManagerDashboard, } from '../../api/dashboardService';
import { downloadAttendanceReport, downloadLeaveReport, } from '../../api/reportService';
import DashboardSkeleton from '../../components/common/DashboardSkeleton';
import { useDispatch, useSelector, } from 'react-redux';
import { fetchDashboard, } from '../../redux/slices/dashboardSlice';
import { getMyLeaveBalance, getMyLeaves, } from '../../api/leaveService';
import { Sick, } from '@mui/icons-material';

const Dashboard = () => {

  const dispatch =
    useDispatch();

  const stats =
    useSelector(
      state =>
        state.dashboard.stats,
    );

  const loading =
    useSelector(
      state =>
        state.dashboard.loading,
    );

  const user =
    useSelector(
      state =>
        state.auth.user,
    );

  const [
    leaveBalance,
    setLeaveBalance,
  ] = useState(null);

  const [
    leaveStats,
    setLeaveStats,
  ] = useState({
    pending: 0,
    approved: 0,
  });


  useEffect(() => {
    if (user?.role) {
      dispatch(
        fetchDashboard(
          user.role,
        ),
      );
    }
  }, [
    dispatch,
    user,
  ]);

  useEffect(() => {
    loadLeaveData();
  }, []);

  const loadDashboard =
    async () => {
      try {
        let data;

        switch (
        user?.role
        ) {
          case 'ADMIN':
            data =
              await getAdminDashboard();
            break;

          case 'HR':
            data =
              await getHRDashboard();
            break;

          case 'MANAGER':
            data =
              await getManagerDashboard();
            break;

          case 'EMPLOYEE':
            data =
              await getEmployeeDashboard();
            break;

          default:
            return;
        }

        setStats(data);

        //      await new Promise((resolve) =>
        //   setTimeout(resolve, 2000),
        // );

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const loadLeaveData =
    async () => {
      try {
        const balance =
          await getMyLeaveBalance();

        const leaves =
          await getMyLeaves();

        setLeaveBalance(
          balance,
        );

        setLeaveStats({
          pending:
            leaves.filter(
              l =>
                l.status ===
                'PENDING',
            ).length,

          approved:
            leaves.filter(
              l =>
                l.status ===
                'APPROVED',
            ).length,
        });
      } catch (error) {
        console.error(error);
      }
    };

  const getCards = () => {
    switch (
    user?.role
    ) {
      case 'ADMIN':
        return [
          {
            title:
              'Total Employees',
            value:
              stats?.totalEmployees || 0,
            icon:
              <Groups />,
            color:
              '#2563eb',
          },
          {
            title:
              'Total Managers',
            value:
              stats?.totalManagers || 0,
            icon:
              <SupervisorAccount />,
            color:
              '#7c3aed',
          },
          {
            title:
              'Total HR',
            value:
              stats?.totalHR || 0,
            icon:
              <Badge />,
            color:
              '#0891b2',
          },
          {
            title:
              'Present Today',
            value:
              stats?.todayPresent || 0,
            icon:
              <CheckCircle />,
            color:
              '#16a34a',
          },
          {
            title:
              'Absent Today',
            value:
              stats?.todayAbsent || 0,
            icon:
              <Cancel />,
            color:
              '#dc2626',
          },
          {
            title:
              'Pending Leaves',
            value:
              stats?.pendingLeaves || 0,
            icon:
              <EventNote />,
            color:
              '#f59e0b',
          },
        ];

      case 'HR':
        return [
          {
            title:
              'Employees',
            value:
              stats?.totalEmployees || 0,
            icon:
              <Groups />,
            color:
              '#2563eb',
          },
          {
            title:
              'Present Today',
            value:
              stats?.todayPresent || 0,
            icon:
              <CheckCircle />,
            color:
              '#16a34a',
          },
          {
            title:
              'Absent Today',
            value:
              stats?.todayAbsent || 0,
            icon:
              <Cancel />,
            color:
              '#dc2626',
          },
          {
            title:
              'Pending Leaves',
            value:
              stats?.pendingLeaves || 0,
            icon:
              <EventNote />,
            color:
              '#f59e0b',
          },
        ];

      case 'MANAGER':
        return [
          {
            title:
              'Team Members',
            value:
              stats?.teamMembers || 0,
            icon:
              <Groups />,
            color:
              '#2563eb',
          },
          {
            title:
              'Present Today',
            value:
              stats?.todayPresent || 0,
            icon:
              <CheckCircle />,
            color:
              '#16a34a',
          },
          {
            title:
              'Absent Today',
            value:
              stats?.todayAbsent || 0,
            icon:
              <Cancel />,
            color:
              '#dc2626',
          },
          {
            title:
              'Pending Leaves',
            value:
              stats?.pendingLeaves || 0,
            icon:
              <EventNote />,
            color:
              '#f59e0b',
          },
        ];

      default:
      case 'EMPLOYEE':
        return [
          {
            title:
              'Attendance Records',
            value:
              stats?.totalAttendance ||
              0,
            icon:
              <CheckCircle />,
            color:
              '#16a34a',
          },

          {
            title:
              'Leave Requests',
            value:
              stats?.totalLeaves ||
              0,
            icon:
              <EventNote />,
            color:
              '#f59e0b',
          },
        ];
        return [];
    }
  };

  const cards =
    getCards();

  // const attendanceTrend = [
  //   {
  //     day: 'Mon',
  //     present: 42,
  //   },
  //   {
  //     day: 'Tue',
  //     present: 45,
  //   },
  //   {
  //     day: 'Wed',
  //     present: 38,
  //   },
  //   {
  //     day: 'Thu',
  //     present: 48,
  //   },
  //   {
  //     day: 'Fri',
  //     present: 44,
  //   },
  //   {
  //     day: 'Sat',
  //     present: 30,
  //   },
  // ];

  return (
    <AppLayout>
      <PermissionPage permission="DASHBOARD_VIEW">

        {loading ? (
          <Box
            sx={{
              p: 1,
            }}
          >
            <DashboardSkeleton />
          </Box>
        ) : (
          <Box
            sx={{
              p: 4,
              // backgroundColor:
              //   '#f8fafc',
              background:
                '0%,#0f172a 50%,#1e1b4b 100%)',
              minHeight:
                '100vh',
            }}
          >

            <Grid
              container
              spacing={2}
            >
              {cards.map(
                (
                  card,
                ) => (
                  <Grid
                    key={
                      card.title
                    }
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                      lg:
                        user?.role ===
                          'ADMIN'
                          ? 2
                          : 3,
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',

                        borderRadius: 6,

                        background:
                          'rgba(255,255,255,0.05)',

                        backdropFilter:
                          'blur(20px)',

                        border:
                          '1px solid rgba(255,255,255,0.08)',

                        color: '#fff',

                        transition: '0.3s',

                        '&:hover': {
                          transform:
                            'translateY(-6px)',
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display:
                              'flex',
                            justifyContent:
                              'space-between',
                            alignItems:
                              'center',
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                color:
                                  'rgba(255,255,255,0.6)',
                              }}
                            >


                              {
                                card.title
                              }
                            </Typography>

                            <Typography
                              variant="h4"
                              fontWeight="bold"
                              mt={1}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              {
                                card.value
                              }
                            </Typography>
                          </Box>

                          <Box

                            sx={{
                              width: 60,
                              height: 60,

                              borderRadius: '18px',

                              background:
                                `${card.color}20`,

                              color:
                                card.color,

                              display: 'flex',

                              justifyContent:
                                'center',

                              alignItems:
                                'center',
                            }}
                          >
                            {
                              card.icon
                            }
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ),
              )}
            </Grid>

            <Card
              elevation={0}
              sx={{
                mt: 4,
                borderRadius: 5,
                boxShadow:
                  '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >



              {/* ADMIN DASHBOARD CHART */}
              {user?.role === 'ADMIN' && (
                <Card
                  elevation={0}
                  sx={{
                    mt: 4,
                    borderRadius: 5,
                    boxShadow:
                      '0 10px 30px rgba(0,0,0,0.08)',

                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      mb={3}
                    >
                      Attendance Trend
                    </Typography>

                    <ResponsiveContainer
                      width="100%"
                      height={300}
                    >
                      <LineChart
                        data={
                          stats?.attendanceTrend ||
                          []
                        }
                      >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="day" />

                        <YAxis />

                        <Tooltip />

                        <Line
                          type="monotone"
                          dataKey="present"
                          stroke="#2563eb"
                          strokeWidth={3}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* HR DASHBOARD */}
              {user?.role === 'HR' && (
                <Grid
                  container
                  spacing={3}
                  sx={{
                    padding: 1,
                    mt: 0,
                    background:
                      'linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)',
                  }}
                >
                  {/* Recent Leave Requests */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 8,
                    }}

                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',

                        borderRadius: 6,
                        margin: 1,
                        background:
                          'rgba(255,255,255,0.05)',

                        backdropFilter:
                          'blur(20px)',

                        border:
                          '1px solid rgba(255,255,255,0.08)',

                        color: '#fff',

                        transition: '0.3s',

                        '&:hover': {
                          transform:
                            'translateY(-6px)',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Recent Leave Requests
                        </Typography>

                        {stats?.recentLeaves?.length > 0 ? (
                          stats.recentLeaves.map(
                            leave => (
                              <Box
                                key={leave.id}
                                sx={{
                                  py: 1.5,
                                  borderBottom:
                                    '1px solid #eee',

                                }}
                              >
                                <Typography
                                  fontWeight={600}
                                >
                                  {leave.user?.firstName}{' '}
                                  {leave.user?.lastName}
                                </Typography>

                                <Typography
                                  sx={{
                                    color:
                                      'rgba(255,255,255,0.6)',
                                  }}
                                >
                                  {leave.leaveType}
                                  {' • '}
                                  {leave.status}
                                </Typography>
                              </Box>
                            ),
                          )
                        ) : (
                          <Typography>
                            No leave requests found
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Leave Balance */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',

                        borderRadius: 6,
                        margin: 1,
                        background:
                          'rgba(255,255,255,0.05)',

                        backdropFilter:
                          'blur(20px)',

                        border:
                          '1px solid rgba(255,255,255,0.08)',

                        color: '#fff',

                        transition: '0.3s',

                        '&:hover': {
                          transform:
                            'translateY(-6px)',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Leave Balance
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          Sick Leave:
                          {' '}
                          {leaveBalance?.sickLeave || 0}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          Casual Leave:
                          {' '}
                          {leaveBalance?.casualLeave || 0}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          Earned Leave:
                          {' '}
                          {leaveBalance?.earnedLeave || 0}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                          Pending Leaves:
                          {' '}
                          {leaveStats?.pending || 0}
                        </Typography>

                        <Typography>
                          Approved Leaves:
                          {' '}
                          {leaveStats?.approved || 0}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {/* EMPLOYEE DASHBOARD */}
              {user?.role === 'EMPLOYEE' && (
                <Grid
                  container
                  spacing={3}
                  sx={{
                    mt: 0,
                    background:
                      '0%,#0f172a 50%,#1e1b4b 100%)',
                  }}
                >
                  {/* Recent Attendance */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 8,
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 5,
                        height: '100%',
                        boxShadow:
                          '0 10px 30px rgba(0,0,0,0.08)',
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Recent Attendance
                        </Typography>

                        {stats?.recentAttendance?.length > 0 ? (
                          stats.recentAttendance.map(
                            attendance => (
                              <Box
                                key={attendance.id}
                                sx={{
                                  py: 1.5,
                                  borderBottom:
                                    '1px solid #eee',
                                }}
                              >
                                <Typography
                                  fontWeight={600}
                                >
                                  {attendance.attendanceDate}
                                </Typography>
                              </Box>
                            ),
                          )
                        ) : (
                          <Typography>
                            No attendance records found
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Leave Balance */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 5,
                        height: '100%',
                        boxShadow:
                          '0 10px 30px rgba(0,0,0,0.08)',
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Leave Balance
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          Sick Leave:{' '}
                          {leaveBalance?.sickLeave || 0}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          Casual Leave:{' '}
                          {leaveBalance?.casualLeave || 0}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          Earned Leave:{' '}
                          {leaveBalance?.earnedLeave || 0}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                          Pending Leaves:{' '}
                          {leaveStats?.pending || 0}
                        </Typography>

                        <Typography>
                          Approved Leaves:{' '}
                          {leaveStats?.approved || 0}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {/* MANAGER DASHBOARD */}
              {user?.role === 'MANAGER' && (
                <Grid
                  container
                  spacing={3}
                  sx={{
                    mt: 0,
                    background:
                      '0%,#0f172a 50%,#1e1b4b 100%)',
                  }}
                >
                  {/* My Team */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 8,
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 5,
                        height: '100%',
                        boxShadow:
                          '0 10px 30px rgba(0,0,0,0.08)',
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          gutterBottom
                        >
                          My Team
                        </Typography>

                        {stats?.teamList?.length > 0 ? (
                          stats.teamList.map(
                            member => (
                              <Box
                                key={member.id}
                                sx={{
                                  py: 1.5,
                                  borderBottom:
                                    '1px solid #eee',
                                }}
                              >
                                <Typography
                                  fontWeight={600}
                                >
                                  {member.firstName}{' '}
                                  {member.lastName}
                                </Typography>

                                <Typography
                                  sx={{
                                    color:
                                      'rgba(255,255,255,0.6)',
                                  }}
                                >
                                  {member.email}
                                </Typography>
                              </Box>
                            ),
                          )
                        ) : (
                          <Typography>
                            No team members found
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Leave Balance */}

                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 5,
                        height: '100%',
                        boxShadow:
                          '0 10px 30px rgba(0,0,0,0.08)',
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Leave Balance
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          Sick Leave:{' '}
                          {leaveBalance?.sickLeave || 0}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          Casual Leave:{' '}
                          {leaveBalance?.casualLeave || 0}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          Earned Leave:{' '}
                          {leaveBalance?.earnedLeave || 0}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                          Pending Leaves:{' '}
                          {leaveStats?.pending || 0}
                        </Typography>

                        <Typography>
                          Approved Leaves:{' '}
                          {leaveStats?.approved || 0}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

            </Card>

            {user?.role ===
              'HR' && (
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',

                    borderRadius: 6,
                    marginTop: 4,

                    background:
                      'rgba(255,255,255,0.05)',

                    backdropFilter:
                      'blur(20px)',

                    border:
                      '1px solid rgba(255,255,255,0.08)',

                    color: '#fff',

                    transition: '0.3s',

                    '&:hover': {
                      transform:
                        'translateY(-6px)',
                    },
                  }}
                >
                  <CardContent

                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Reports
                    </Typography>

                    <Stack
                      direction={{
                        xs: 'column',
                        md: 'row',
                      }}
                      spacing={2}
                    >
                      <Button
                        variant="contained"
                        startIcon={
                          <Download />
                        }
                        onClick={
                          downloadAttendanceReport
                        }
                      >
                        Attendance Report
                      </Button>

                      <Button
                        variant="contained"
                        startIcon={
                          <Download />
                        }
                        onClick={
                          downloadLeaveReport
                        }
                      >
                        Leave Report
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              )}

          </Box>
        )}

      </PermissionPage>
    </AppLayout>
  );
};

export default Dashboard;