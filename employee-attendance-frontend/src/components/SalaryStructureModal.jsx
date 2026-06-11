import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';

import api from '../api/axios';

import {
  createSalaryStructure,
  updateSalaryStructure,
} from '../api/payrollService';

const SalaryStructureModal = ({
  open,
  onClose,
  onSuccess,
  salaryData = null,
  isEdit = false,
}) => {
  const [users, setUsers] =
    useState([]);

  const [formData, setFormData] =
    useState({
      employeeId: '',
      basicSalary: '',
      hra: '',
      da: '',
      specialAllowance: '',
      bonus: '',
      pfDeduction: '',
      professionalTax: '',
      tds: '',
    });

  const fetchUsers =
    async () => {
      try {
        const response =
          await api.get('/users');

        const filteredUsers =
          response.data.filter(
            user =>
              user.role?.name !==
              'ADMIN',
          );

        setUsers(
          filteredUsers,
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    if (open) {
      fetchUsers();
    }
  }, [open]);
  
  useEffect(() => {
  if (salaryData) {
    setFormData({
      employeeId:
        salaryData.employeeId,
      basicSalary:
        salaryData.basicSalary,
      hra: salaryData.hra,
      da: salaryData.da,
      specialAllowance:
        salaryData.specialAllowance,
      bonus: salaryData.bonus,
      pfDeduction:
        salaryData.pfDeduction,
      professionalTax:
        salaryData.professionalTax,
      tds: salaryData.tds,
    });
  }
}, [salaryData]);

  const handleChange =
    event => {
      setFormData(prev => ({
        ...prev,
        [event.target.name]:
          event.target.value,
      }));
    };

  const handleSubmit = async () => {
  try {
    const payload = {
      ...formData,
      basicSalary: Number(
        formData.basicSalary,
      ),
      hra: Number(
        formData.hra || 0,
      ),
      da: Number(
        formData.da || 0,
      ),
      specialAllowance: Number(
        formData.specialAllowance || 0,
      ),
      bonus: Number(
        formData.bonus || 0,
      ),
      pfDeduction: Number(
        formData.pfDeduction || 0,
      ),
      professionalTax: Number(
        formData.professionalTax || 0,
      ),
      tds: Number(
        formData.tds || 0,
      ),
    };

    if (isEdit) {
      await updateSalaryStructure(
        formData.employeeId,
        payload,
      );
    } else {
      await createSalaryStructure(
        payload,
      );
    }

    onSuccess();

    onClose();

    setFormData({
      employeeId: '',
      basicSalary: '',
      hra: '',
      da: '',
      specialAllowance: '',
      bonus: '',
      pfDeduction: '',
      professionalTax: '',
      tds: '',
    });
  } catch (error) {
    alert(
      error?.response?.data
        ?.message ||
        'Failed to save salary structure',
    );
  }
};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Add Salary Structure
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ mt: 1,
            display:'flex',
            flexDirection:'column',
            
           }}

        >
          <Grid
            item
            xs={12}
            
          >
            <TextField
              select
              fullWidth
              label="Employee"
              name="employeeId"
              value={
                formData.employeeId
              }
              onChange={
                handleChange
              }
            >
              {users.map(
                user => (
                  <MenuItem
                    key={user.id}
                    value={user.id}
                  >
                    {
                      user.firstName
                    }{' '}
                    {
                      user.lastName
                    }
                  </MenuItem>
                ),
              )}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Basic Salary"
              name="basicSalary"
              value={
                formData.basicSalary
              }
              onChange={
                handleChange
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="HRA"
              name="hra"
              value={
                formData.hra
              }
              onChange={
                handleChange
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="DA"
              name="da"
              value={
                formData.da
              }
              onChange={
                handleChange
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Special Allowance"
              name="specialAllowance"
              value={
                formData.specialAllowance
              }
              onChange={
                handleChange
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Bonus"
              name="bonus"
              value={
                formData.bonus
              }
              onChange={
                handleChange
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="PF Deduction"
              name="pfDeduction"
              value={
                formData.pfDeduction
              }
              onChange={
                handleChange
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Professional Tax"
              name="professionalTax"
              value={
                formData.professionalTax
              }
              onChange={
                handleChange
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="TDS"
              name="tds"
              value={
                formData.tds
              }
              onChange={
                handleChange
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={
            handleSubmit
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SalaryStructureModal;