
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Link from 'next/link'
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import { green, red, black, darkslategray } from '@mui/material/colors';
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


const pages = [];

function Header() {
    const router = useRouter();
    const cookies = parseCookies();
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const userCookies = cookies?.user;
        if (userCookies) {
            setUserData(JSON.parse(userCookies));
        } else {
            setUserData("");
        }

    }, [cookies?.user]);


    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        setAnchorEl(null);
        if (e == "logout") {
            Logout()
        }
    };


    const Logout = () => {
        cookie.remove("access")
        cookie.remove("refresh")
        cookie.remove("user")
        router.push("/");
    }

    return (

        <AppBar sx={{ bgcolor: "#fff",height:"60px" }} position='absolute'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link href="/" variant="body2">
                        <h1>LOGO</h1>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Menu
                            id="menu-appbar"
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}

                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {userData && (
                        <Box sx={{}}>
                            <Button
                                onClick={handleClick}
                                sx={{ fontSize: 16, color: "" }}

                            >
                                <h3>{userData.first_name}</h3>
                            </Button>
                            <Menu
                                sx={{ mt: 2, }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <Link sx={{ color: "black", }} underline="none" href={"/createjob"}>
                                    <MenuItem onClick={handleClose}>Add Job</MenuItem>
                                </Link>
                                <Link sx={{ color: "black", }} underline="none" href={"/joblist"}>
                                    <MenuItem onClick={handleClose}>Your Job List</MenuItem>
                                </Link>

                                <MenuItem onClick={() => handleClose("logout")}>Logout</MenuItem>

                            </Menu>
                        </Box>
                    )

                    }

                </Toolbar>
            </Container>
        </AppBar>

    );
}
export default Header;

