import {
    Box,
    Grid,
    Card,
    CardContent,
    Skeleton,
} from '@mui/material';

const DashboardSkeleton = () => {
    return (
        <Box>
            <Grid
                container
                spacing={3}
            >
                {[1, 2, 3, 4].map(
                    (item) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            key={item}
                        >
                            <Card>
                                <CardContent>
                                    <Skeleton
                                        variant="text"
                                        width="60%"
                                        height={30}
                                    />

                                    <Skeleton
                                        variant="text"
                                        width="40%"
                                        height={50}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ),
                )}
            </Grid>

            <Box mt={4}>
                <Skeleton
                    variant="rectangular"
                    height={300}
                    sx={{
                        borderRadius: 2,
                    }}
                />
            </Box>
        </Box>
    );
};

export default DashboardSkeleton;