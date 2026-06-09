import {
  useState,
} from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Avatar,
} from '@mui/material';

import {
  SupervisorAccount,
} from '@mui/icons-material';

import {
  assignManager,
} from '../api/userService';

const AssignManagerModal = ({
  employee,
  users,
  onClose,
  onSuccess,
}) => {
  const managers =
    users.filter(
      user =>
        user.role?.name ===
        'MANAGER',
    );

  const [
    managerId,
    setManagerId,
  ] = useState(
    employee.managerId || '',
  );

  const handleAssign =
    async () => {
      if (!managerId) {
        alert(
          'Please select a manager',
        );
        return;
      }

      try {
        await assignManager(
          employee.id,
          managerId,
        );

        onSuccess();
        onClose();
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            'Failed to assign manager',
        );
      }
    };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Assign Manager
      </DialogTitle>

      <DialogContent>

        <Box
          sx={{
            display: 'flex',
            flexDirection:
              'column',
            alignItems:
              'center',
            mb: 3,
            mt: 1,
          }}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
              bgcolor:
                'primary.main',
              mb: 2,
            }}
          >
            <SupervisorAccount />
          </Avatar>

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            {
              employee.firstName
            }{' '}
            {
              employee.lastName
            }
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Assign a manager to
            this employee
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Employee"
          value={`${employee.firstName} ${employee.lastName}`}
          disabled
          sx={{
            mb: 3,
          }}
        />

        <TextField
          select
          fullWidth
          label="Select Manager"
          value={
            managerId
          }
          onChange={e =>
            setManagerId(
              e.target.value,
            )
          }
        >
          {managers.map(
            manager => (
              <MenuItem
                key={
                  manager.id
                }
                value={
                  manager.id
                }
              >
                {
                  manager.firstName
                }{' '}
                {
                  manager.lastName
                }
              </MenuItem>
            ),
          )}
        </TextField>

      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
        }}
      >
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={
            handleAssign
          }
        >
          Assign Manager
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignManagerModal;