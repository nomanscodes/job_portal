import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { useRouter } from 'next/router';

const defaultTheme = createTheme();

export default function Login() {

    const cookies = parseCookies();
    const token = cookies?.token;

    const router = useRouter();

    const [loading, setLoding] = useState(false)

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const updateUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    async function sendLogin(user) {
        var formdata = new FormData();
        formdata.append("username", user.username);
        formdata.append("password", user.password);

        var requestOptions = {
            method: 'POST',
            body: formdata
        };

        const login = await fetch(`https://nomanhasan.pythonanywhere.com/api/login/`, requestOptions);

        const result = await login.json();

        // console.log("result", result);

        if (result.status == false) {
            toast.error(result.error);
            setLoding(false);
        }

        if (result.access) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${result?.access}`);

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            const user = await fetch(`https://nomanhasan.pythonanywhere.com/api/profile/`, requestOptions);

            const userData = await user.json();

            // console.log("userData", userData);

            cookie.set("access", result.access);
            cookie.set("refresh", result.refresh);
            cookie.set("user", JSON.stringify(userData?.data));

            toast.success(result.message);
            setTimeout(() => {
                router.push("/");
            }, 1000);
            setLoding(false);
        }
    }

    
    function SubmitHandler(e) {
        e.preventDefault();
        const { username, password } = user;
        setLoding(true);
        if (password == "" || username == "") {
            toast.error(`All field are required`);
        } else {
            sendLogin({ ...user })
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer />
            <Grid container component="main" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <Grid
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}
                    item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
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
                            Login
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
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
                                type="submit"
                                fullWidth
                                onClick={SubmitHandler}
                                variant="contained"
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
                                    <Link href="/registration" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}