import { useEffect, useState } from 'react';

import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  Payments,
} from '@mui/icons-material';
import AppLayout from '../../layout/AppLayout';

import DownloadIcon from '@mui/icons-material/Download';
import PaymentsIcon from '@mui/icons-material/Payments';

import GeneratePayrollModal from '../../components/GeneratePayrollModal';
import DashboardHeader from '../../components/DashboardHeader';

import api from '../../api/axios';

const PayrollManagementPage = () => {
  const [payrolls, setPayrolls] =
    useState([]);

  const [search, setSearch] =
    useState('');

  const [openModal, setOpenModal] =
    useState(false);

  const fetchPayrolls =
    async () => {
      try {
        const response =
          await api.get('/payroll');

        setPayrolls(
          response.data,
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const handleDownloadPayslip =
    async (id) => {
      try {
        const response =
          await api.get(
            `/payroll/${id}/payslip`,
            {
              responseType:
                'blob',
            },
          );

        const url =
          window.URL.createObjectURL(
            new Blob([
              response.data,
            ]),
          );

        const link =
          document.createElement(
            'a',
          );

        link.href = url;

        link.setAttribute(
          'download',
          `payslip-${id}.pdf`,
        );

        document.body.appendChild(
          link,
        );

        link.click();

        link.remove();
      } catch (error) {
        console.error(error);
      }
    };

  const filteredPayrolls =
    payrolls.filter(
      (payroll) =>
        `${payroll.employee?.firstName || ''} ${
          payroll.employee?.lastName || ''
        }`
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ),
    );

  return (
  <AppLayout>
    <Box
      sx={{
        p: 4,
        background:
          'linear-gradient(135deg,#020617 0%,#0f172a 50%,#1e1b4b 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Header */}

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          color: '#fff',
          mb: 2,
        }}
      >
        Payroll Management
      </Typography>

      {/* Search + Stats + Button */}

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
          alignItems: 'center',
        }}
      >
        <TextField
          placeholder="Search Employee..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value,
            )
          }
          sx={{
            width: 350,
            background: '#fff',
            borderRadius: 4,
          }}
          InputProps={{
            startAdornment: (
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
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Payments color="primary" />

              <Box>
                <Typography
                  color="text.secondary"
                >
                  Payroll Records
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  {payrolls.length}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          size="large"
          sx={{
            ml: 'auto',
            height: 56,
            borderRadius: 3,
          }}
          onClick={() =>
            setOpenModal(true)
          }
        >
          Generate Payroll
        </Button>
      </Box>

      {/* Table */}

      <Card
        elevation={4}
        sx={{
          borderRadius: 4,
        }}
      >
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Employee
                  </TableCell>

                  <TableCell>
                    Month
                  </TableCell>

                  <TableCell>
                    Year
                  </TableCell>

                  <TableCell>
                    Gross Salary
                  </TableCell>

                  <TableCell>
                    Deductions
                  </TableCell>

                  <TableCell>
                    Net Salary
                  </TableCell>

                  <TableCell>
                    Status
                  </TableCell>

                  <TableCell>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredPayrolls.map(
                  (
                    payroll,
                  ) => (
                    <TableRow
                      key={
                        payroll.id
                      }
                    >
                      <TableCell>
                        {
                          payroll
                            .employee
                            ?.firstName
                        }{' '}
                        {
                          payroll
                            .employee
                            ?.lastName
                        }
                      </TableCell>

                      <TableCell>
                        {
                          payroll.month
                        }
                      </TableCell>

                      <TableCell>
                        {
                          payroll.year
                        }
                      </TableCell>

                      <TableCell>
                        ₹
                        {
                          payroll.grossSalary
                        }
                      </TableCell>

                      <TableCell>
                        ₹
                        {
                          payroll.deductions
                        }
                      </TableCell>

                      <TableCell>
                        ₹
                        {
                          payroll.netSalary
                        }
                      </TableCell>

                      <TableCell>
                        {payroll.status}
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={
                            <DownloadIcon />
                          }
                          onClick={() =>
                            handleDownloadPayslip(
                              payroll.id,
                            )
                          }
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <GeneratePayrollModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onSuccess={() =>
          fetchPayrolls()
        }
      />
    </Box>
  </AppLayout>
);
};

export default PayrollManagementPage;