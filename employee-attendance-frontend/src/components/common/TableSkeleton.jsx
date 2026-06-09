import {
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

const TableSkeleton = () => {
    return (
        <TableContainer
            component={Paper}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Skeleton />
                        </TableCell>

                        <TableCell>
                            <Skeleton />
                        </TableCell>

                        <TableCell>
                            <Skeleton />
                        </TableCell>

                        <TableCell>
                            <Skeleton />
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {[1, 2, 3, 4, 5].map(
                        (row) => (
                            <TableRow
                                key={row}
                            >
                                <TableCell>
                                    <Skeleton />
                                </TableCell>

                                <TableCell>
                                    <Skeleton />
                                </TableCell>

                                <TableCell>
                                    <Skeleton />
                                </TableCell>

                                <TableCell>
                                    <Skeleton />
                                </TableCell>
                            </TableRow>
                        ),
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableSkeleton;