
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";


function DashboardPage(): JSX.Element {
    return (
        <Box component="main" sx={{ flexGrow: 1, mt: 8, ml: 30 }}>           
            <Outlet />
        </Box>
        
    );
}

export default DashboardPage;