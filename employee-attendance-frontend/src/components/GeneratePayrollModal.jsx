import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
    Grid,
    Paper,
    Avatar,
    Divider,
    Chip,
    Typography,
} from '@mui/material';
import {
    Person,
    Payments,
} from '@mui/icons-material';

import { useEffect, useState } from 'react';

import {
    getPayrolls,
    generatePayroll,
    downloadPayslip,
} from '../api/payrollService';
import api from '../api/axios';

const GeneratePayrollModal = ({
    open,
    onClose,
    onSuccess,
}) => {
    const [users, setUsers] = useState([]);

    const [employeeId, setEmployeeId] =
        useState('');

    const [month, setMonth] =
        useState(new Date().getMonth() + 1);

    const [year, setYear] =
        useState(new Date().getFullYear());

    const fetchUsers = async () => {
        try {
            const response =
                await api.get('/users');

            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchUsers();
        }
    }, [open]);

    const handleGenerate = async () => {
        try {
            await api.post(
                '/payroll/generate',
                {
                    employeeId,
                    month,
                    year,
                },
            );

            onSuccess();

            onClose();
        } catch (error) {
            console.error(error);
            alert(
                error?.response?.data?.message ||
                'Failed to generate payroll',
            );
        }
    };

    const selectedUser =
        users.find(
            user =>
                user.id === employeeId,
        );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Generate Payroll
            </DialogTitle>

            <DialogContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ mt: 1,
                        display:"flex",
                        flexDirection:"column",
                     }}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <FormControl fullWidth>
                            <InputLabel>
                                Select Employee
                            </InputLabel>

                            <Select
                                value={employeeId}
                                label="Select Employee"
                                onChange={(e) =>
                                    setEmployeeId(
                                        e.target.value,
                                    )
                                }
                            >
                                {users
                                    .filter(
                                        user =>
                                            user.role?.name !==
                                            'ADMIN',
                                    )
                                    .map(user => (
                                        <MenuItem
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.firstName}{' '}
                                            {user.lastName}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid
                        item
                        xs={6}
                    >
                        <FormControl fullWidth>
                            <InputLabel>
                                Month
                            </InputLabel>

                            <Select
                                value={month}
                                label="Month"
                                onChange={(e) =>
                                    setMonth(
                                        e.target.value,
                                    )
                                }
                            >
                                {[
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                    'August',
                                    'September',
                                    'October',
                                    'November',
                                    'December',
                                ].map(
                                    (
                                        monthName,
                                        index,
                                    ) => (
                                        <MenuItem
                                            key={index + 1}
                                            value={
                                                index + 1
                                            }
                                        >
                                            {monthName}
                                        </MenuItem>
                                    ),
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid
                        item
                        xs={6}
                    >
                        <TextField
                            label="Year"
                            type="number"
                            fullWidth
                            value={year}
                            onChange={(e) =>
                                setYear(
                                    Number(
                                        e.target.value,
                                    ),
                                )
                            }
                        />
                    </Grid>

                    {selectedUser && (
                        <Grid
                            item
                            xs={12}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    border:
                                        '1px solid #e5e7eb',
                                    borderRadius: 3,
                                    p: 3,
                                    mt: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems:
                                            'center',
                                        gap: 2,
                                    }}
                                >
                                    <Avatar>
                                        <Person />
                                    </Avatar>

                                    <Box>
                                        <Typography
                                            fontWeight={600}
                                        >
                                            {
                                                selectedUser.firstName
                                            }{' '}
                                            {
                                                selectedUser.lastName
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                selectedUser.email
                                            }
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            ml: 'auto',
                                        }}
                                    >
                                        <Chip
                                            label={
                                                selectedUser
                                                    .role
                                                    ?.name
                                            }
                                            color="primary"
                                        />
                                    </Box>
                                </Box>

                                <Divider
                                    sx={{ my: 2 }}
                                />

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Payroll will be
                                    generated using the
                                    employee salary
                                    structure and
                                    attendance records.
                                </Typography>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 3,
                }}
            >
                <Button
                    onClick={onClose}
                    variant="outlined"
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    size="large"
                    disabled={!employeeId}
                    onClick={handleGenerate}
                >
                    Generate Payroll
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GeneratePayrollModal;