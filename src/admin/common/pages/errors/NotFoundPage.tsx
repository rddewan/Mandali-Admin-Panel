import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";


const NotFoundPage = () => {
    return (
        <Box>
            <Typography variant="h1">
                Page not found
            </Typography>
            <Link to="/">Go to Home</Link>
        </Box>
    )
}

export default NotFoundPage;