import { Alert, Box, Slide, Snackbar, SnackbarCloseReason, TextField } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import PasswordFieldComponent from "./components/PasswordFieldComponent";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { LoginForm, loginSchema } from "../../../../common/types";
//import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useAuthStore } from "../index";


function LoginPage(): JSX.Element {
    const [open, setOpen] = useState(false);
    const errorMessage = useAuthStore((state) => state.error);
    const login = useAuthStore.use.login();
    const form = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(loginSchema),
    });

    const { handleSubmit, formState, control } = form;
    // destructure formState
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
        await login(data);
    }

    const handleSnackbarClick = () => {
        setOpen(true);
    };

    const handleSnackbarClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        // do not close the snackbar if the reason is 'clickaway'   
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // observe error state and display error message
    useEffect(() => {
        if (errorMessage) {
            handleSnackbarClick();
        }
    }, [errorMessage]);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100vw',
                    gap: 2,
                    backgroundColor: (theme) => theme.palette.background.default,
                }
            }>
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        required={true}
                        autoComplete="email"
                        error={!!errors.email} // Set error state
                        helperText={errors.email ? errors.email.message : null} // Display error message
                        sx={{ width: '100%', maxWidth: 400 }}
                    />
                )}
            />


            <PasswordFieldComponent control={control} errors={errors} />

            <LoadingButton
                variant="contained"
                endIcon={<LoginIcon />}
                type="submit"
                loading={isSubmitting}
                loadingPosition="center"
                disabled={!isValid || isSubmitting}
                sx={
                    {
                        width: '100%',
                        maxWidth: 180,
                        marginTop: 2,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'secondary.main',
                        }
                    }
                }>
                Login
            </LoadingButton>

            {/* Display global error */}
            {errorMessage && (
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    TransitionComponent={Slide}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleSnackbarClose}>
                    <Alert
                        onClose={handleSnackbarClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>

            )}


            {/* <DevTool control={control} /> */}
        </Box>
    );
}

export default LoginPage;