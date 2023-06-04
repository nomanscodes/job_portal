import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';


const defaultTheme = createTheme();

export default function Registration() {

    const router = useRouter();
    const [loading, setLoding] = useState(false);
    const [error, setError] = useState("");

    console.log("error", error);

    const [user, setUser] = useState({
        first_name: "",
        username: "",
        password: ""
    });
    const updateUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    async function sendRegistration(user) {
        var formdata = new FormData();
        formdata.append("first_name", user.first_name);
        formdata.append("username", user.username);
        formdata.append("password", user.password);

        var requestOptions = {
            method: 'POST',
            body: formdata
        };

        const registration = await fetch(`https://nomanhasan.pythonanywhere.com/api/register/`, requestOptions)

        const result = await registration.json();
        if (result.error) {
            setError(result.errors.username[0]);
            setLoding(false);
        }
        if (result.msg == "user has been register  successfully") {
            toast.success(result.message);
            setTimeout(() => {
                router.push("/login");
            }, 1500);
            setLoding(false);
        }
    }

    function SubmitHandler(e) {
        e.preventDefault();
        const { first_name, username, password } = user;
        setLoding(true);
        if (
            first_name == "" ||
            username == "" ||
            password == ""
        ) {
            toast.error(`All field are required`);
        } else {
            sendRegistration({ ...user })
        }
    }

    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                    <Grid
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        item xs={12} sm={10} md={8} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Registration
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="Full Name"
                                    name="first_name"
                                    autoComplete="first_name"
                                    autoFocus
                                    value={user.first_name}
                                    onChange={updateUser}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    type='username'
                                    label="User Name"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={user.username}
                                    onChange={updateUser}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={user.password}
                                    onChange={updateUser}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    onClick={SubmitHandler}
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            {"You have allready an account? Sign in"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider></>
    );
}