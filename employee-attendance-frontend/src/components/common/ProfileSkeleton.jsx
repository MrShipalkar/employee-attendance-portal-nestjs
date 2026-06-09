import {
    Box,
    Avatar,
    Skeleton,
} from '@mui/material';

const ProfileSkeleton = () => {
    return (
        <Box>
            <Skeleton
                variant="circular"
                width={100}
                height={100}
            />

            <Skeleton
                width={250}
                height={40}
            />

            <Skeleton
                width={200}
                height={30}
            />

            <Skeleton
                width="100%"
                height={200}
            />
        </Box>
    );
};

export default ProfileSkeleton;