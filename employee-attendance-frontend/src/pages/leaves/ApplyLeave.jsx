import { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';

import {
  EventNote,
  Send,
} from '@mui/icons-material';

import AppLayout from '../../layout/AppLayout';

import {
  applyLeave,
} from '../../api/leaveService';
import { useSelector } from 'react-redux';

const ApplyLeave = () => {
  const user = useSelector(
    state => state.auth.user,
  );

  const [formData, setFormData] =
    useState({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await applyLeave(
          formData,
        );

        alert(
          'Leave applied successfully',
        );

        setFormData({
          leaveType: '',
          startDate: '',
          endDate: '',
          reason: '',
        });
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
          'Failed to apply leave',
        );
      } finally {
        setLoading(false);
      }
    };

  const getPageTitle =
    () => {
      switch (
      user?.role
      ) {
        case 'HR':
          return 'HR Leave Request';

        case 'MANAGER':
          return 'Manager Leave Request';

        default:
          return 'Employee Leave Request';
      }
    };

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
            margin:2
          }}
        >
          Apply Leave
        </Typography>

        <Card
          elevation={4}
          sx={{
            maxWidth: 900,
            borderRadius: 4,
            background:
                          'rgba(255,255,255,0.85)',
          }}
        >
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems:
                  'center',
                gap: 1,
                mb: 3,
              }}
            >
              <EventNote
                color="primary"
              />

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                {getPageTitle()}
              </Typography>
            </Box>

            <form
              onSubmit={
                handleSubmit
              }
            >
              <Grid
                container
                spacing={3}
              >
                <Grid
                  size={{
                    xs: 12,
                  }}
                >
                  <TextField
                    select
                    fullWidth
                    label="Leave Type"
                    name="leaveType"
                    value={
                      formData.leaveType
                    }
                    onChange={
                      handleChange
                    }
                    required
                  >
                    <MenuItem value="">
                      Select Leave Type
                    </MenuItem>

                    <MenuItem value="SICK">
                      Sick Leave
                    </MenuItem>

                    <MenuItem value="CASUAL">
                      Casual Leave
                    </MenuItem>

                    <MenuItem value="ANNUAL">
                      Annual Leave
                    </MenuItem>
                  </TextField>
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <TextField
                    fullWidth
                    type="date"
                    // label="Start Date"
                    name="startDate"
                    value={
                      formData.startDate
                    }
                    onChange={
                      handleChange
                    }
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <TextField
                    fullWidth
                    type="date"
                    // label="End Date"
                    name="endDate"
                    value={
                      formData.endDate
                    }
                    onChange={
                      handleChange
                    }
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Reason"
                    name="reason"
                    value={
                      formData.reason
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={
                      loading
                        ? (
                          <CircularProgress
                            size={18}
                            color="inherit"
                          />
                        )
                        : (
                          <Send />
                        )
                    }
                    disabled={
                      loading
                    }
                    sx={{
                      minWidth:
                        220,
                      py: 1.5,
                    }}
                  >
                    {loading
                      ? 'Submitting...'
                      : 'Submit Leave Request'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </AppLayout>
  );
};

export default ApplyLeave;