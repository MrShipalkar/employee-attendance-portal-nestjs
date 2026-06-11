import api from './axios';

export const getPayrolls = () =>
  api.get('/payroll');

export const generatePayroll = (
  payload,
) =>
  api.post(
    '/payroll/generate',
    payload,
  );

export const downloadPayslip = (
  id,
) =>
  api.get(
    `/payroll/${id}/payslip`,
    {
      responseType: 'blob',
    },
  );


export const getSalaryStructures = () =>
  api.get('/payroll/salary-structures');

export const createSalaryStructure = (data) =>
  api.post('/payroll/salary-structure', data);

export const updateSalaryStructure = (
  employeeId,
  data,
) =>
  api.put(
    `/payroll/salary-structure/${employeeId}`,
    data,
  );

export const deleteSalaryStructure = (
  employeeId,
) =>
  api.delete(
    `/payroll/salary-structure/${employeeId}`,
  );

