/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'
import Paper from '@mui/material/Paper';
import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useRouter } from 'next/router';
import Link from 'next/link';

const defaultTheme = createTheme();

const Joblist = () => {

    const cookies = parseCookies();
    const token = cookies?.access;

    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const userCookies = cookies?.user;
        if (userCookies) {
            setUserData(JSON.parse(userCookies));
        } else {
            setUserData("");
        }

    }, [cookies?.user]);



    const [jobPost, setJobPost] = useState([]);
    const [singleJob, setSingleJob] = useState([]);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const getJobData = async () => {
        const job = await fetch(
            `https://nomanhasan.pythonanywhere.com/api/view/`,
            requestOptions
        );
        const jobData = await job.json();
        setJobPost(jobData.data);
    };

    useEffect(() => {
        getJobData();
    }, []);

    const deleteItem = async (id) => {
        if (confirm("Are you Sure?")) {
            var requestOptions1 = {
                method: "DELETE",
                headers: myHeaders,
                redirect: "follow",
            };
            await fetch(
                `https://nomanhasan.pythonanywhere.com/api/remove/${id}/`,
                requestOptions1
            );
            getJobData();
        } else {
            return false;
        }
    }

    const newData = jobPost.filter((post) => {
        return post.posted_by.id == userData.id
    })
    const router = useRouter()
    const goEditPage = (id) => {
        router.push("edit")
    }

    return (
        <>
            <Head>
                <title>Create Job</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={defaultTheme}>

                <Grid container component="main" sx={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', position: "absoulate" }}>




                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 650 }} aria-label="customized table">

                            <TableHead>
                                <TableRow sx={{ backgroundColor: "black" }}>
                                    <TableCell align="left" sx={{ color: "white", fontWeight: "bold" }}>Serial No.</TableCell>
                                    <TableCell align="left" sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                                    <TableCell align="left" sx={{ color: "white", fontWeight: "bold" }}>Posted Date</TableCell>
                                    <TableCell align="left" sx={{ color: "white", fontWeight: "bold" }}>Update</TableCell>
                                    <TableCell align="left" sx={{ color: "white", fontWeight: "bold" }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {newData.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {index}
                                        </TableCell>
                                        <TableCell align="left">{row.title}</TableCell>
                                        <TableCell align="left">{row.created_at}</TableCell>
                                        <TableCell align="left">
                                            <Link href={`/edit/${row.id}`}>
                                                <Button>
                                                    <BorderColorIcon sx={{ color: "green" }} />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button onClick={() => deleteItem(row.id)}>
                                                <DeleteForeverIcon sx={{ color: "red" }} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </Grid>
            </ThemeProvider >
        </>
    )
}

export default Joblist