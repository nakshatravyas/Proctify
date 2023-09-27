import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const StudentDetails = () => {
    const data = [
        { name: 'John', email: 'john@example.com', phone: '123-456-7890', age: 25 },
        { name: 'Alice', email: 'alice@example.com', phone: '987-654-3210', age: 30 },
        // Add more data rows here
    ];
    const tableHeadColumns = Object.keys(data[0]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const token = localStorage.getItem('token');
    const [options, setOptions] = useState([]);
    const [optionchange, setOptionChange] = useState('');

    useEffect(() => {
        fetchdata();
    }, [optionchange]);
    const fetchdata = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3002/api/v1/admin/getexams?examcode=${optionchange}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Set the fetched options in state
            setOptions(response.data.data);
        } catch (err) {
            console.log(err.response.data.msg);
            toast.error(err.response.data.msg)
        }
    };
    const change = (e) => {
        console.log(e.target.value)
        setOptionChange(e.target.value);
    };
    return (
        <Box m="20px">

            <Header title="Publish Result" subtitle="Publish result for exam" />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="10px"
                pt="10px"
            >
                <Typography component="h1" variant="h3" fontWeight="bold">
                    Exam Code :
                </Typography>
                <Box
                    display="flex"
                    backgroundColor={colors.primary[400]}
                    borderRadius="3px"
                    width="20rem"
                >
                    <input
                        style={{
                            backgroundColor: '#e0e0e0',
                            color: "black",
                            borderRadius: "3px",
                            width: "20rem",
                            height: "3.2rem",
                            padding: "10px",
                            border: "none",
                        }}
                        list="dataa"
                        onChange={change}
                        placeholder="Search"
                    />
                    <datalist id="dataa">
                        {options.map((op) => <option key={op}>{op}</option>)}
                    </datalist>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {tableHeadColumns.map((column, index) => (
                                <TableCell key={index}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {tableHeadColumns.map((column, colIndex) => (
                                    <TableCell key={colIndex}>{row[column]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StudentDetails;