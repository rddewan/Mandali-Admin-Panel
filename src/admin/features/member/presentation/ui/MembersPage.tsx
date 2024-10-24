import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MembersPage = () => {
    return (
        <Box>
            <Outlet />
        </Box>
    );
};

export default MembersPage;