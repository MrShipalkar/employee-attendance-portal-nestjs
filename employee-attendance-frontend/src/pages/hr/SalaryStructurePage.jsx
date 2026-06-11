import {
    useEffect,
    useState,
} from 'react';

import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import {
  Search,
  AccountBalanceWallet,
} from '@mui/icons-material';

import AppLayout from '../../layout/AppLayout';

import {
    getSalaryStructures,
    deleteSalaryStructure,

} from '../../api/payrollService';
import SalaryStructureModal from '../../components/SalaryStructureModal';
import DashboardHeader from '../../components/DashboardHeader';

const SalaryStructurePage = () => {
    const [salaryStructures,
        setSalaryStructures] =
        useState([]);

    const handleDelete = async (
        employeeId,
    ) => {
        const confirmed =
            window.confirm(
                'Are you sure you want to delete this salary structure?',
            );

        if (!confirmed) {
            return;
        }

        try {
            await deleteSalaryStructure(
                employeeId,
            );

            fetchSalaryStructures();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSalaryStructures =
        async () => {
            try {
                const response =
                    await getSalaryStructures();

                setSalaryStructures(
                    response.data,
                );
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        fetchSalaryStructures();
    }, []);

    const [openModal, setOpenModal] =
        useState(false);

    const [selectedSalary, setSelectedSalary] =
        useState(null);

    const [isEdit, setIsEdit] =
        useState(false);

        const [search, setSearch] =
  useState('');

  const filteredSalaryStructures =
  salaryStructures.filter(
    salary =>
      `${salary.employee?.firstName || ''} ${
        salary.employee?.lastName || ''
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
        Salary Structure Management
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
              <AccountBalanceWallet
                color="primary"
              />

              <Box>
                <Typography
                  color="text.secondary"
                >
                  Salary Structures
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                >
                  {
                    salaryStructures.length
                  }
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
          onClick={() => {
            setSelectedSalary(
              null,
            );

            setIsEdit(
              false,
            );

            setOpenModal(
              true,
            );
          }}
        >
          Add Salary Structure
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
                    Basic
                  </TableCell>

                  <TableCell>
                    HRA
                  </TableCell>

                  <TableCell>
                    DA
                  </TableCell>

                  <TableCell>
                    Bonus
                  </TableCell>

                  <TableCell>
                    PF
                  </TableCell>

                  <TableCell>
                    TDS
                  </TableCell>

                  <TableCell>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredSalaryStructures.map(
                  (
                    salary,
                  ) => (
                    <TableRow
                      key={
                        salary.id
                      }
                    >
                      <TableCell>
                        {
                          salary
                            .employee
                            ?.firstName
                        }{' '}
                        {
                          salary
                            .employee
                            ?.lastName
                        }
                      </TableCell>

                      <TableCell>
                        ₹
                        {
                          salary.basicSalary
                        }
                      </TableCell>

                      <TableCell>
                        ₹
                        {
                          salary.hra
                        }
                      </TableCell>

                      <TableCell>
                        ₹
                        {
                          salary.da
                        }
                      </TableCell>

                      <TableCell>
                        ₹
                        {
                          salary.bonus
                        }
                      </TableCell>

                      <TableCell>
                        ₹
                        {
                          salary.pfDeduction
                        }
                      </TableCell>

                      <TableCell>
                        ₹
                        {
                          salary.tds
                        }
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            mr: 1,
                          }}
                          onClick={() => {
                            setSelectedSalary(
                              salary,
                            );

                            setIsEdit(
                              true,
                            );

                            setOpenModal(
                              true,
                            );
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() =>
                            handleDelete(
                              salary.employeeId,
                            )
                          }
                        >
                          Delete
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

      <SalaryStructureModal
        open={openModal}
        onClose={() =>
          setOpenModal(
            false,
          )
        }
        onSuccess={() =>
          fetchSalaryStructures()
        }
        salaryData={
          selectedSalary
        }
        isEdit={isEdit}
      />
    </Box>
  </AppLayout>
);

};

export default SalaryStructurePage;