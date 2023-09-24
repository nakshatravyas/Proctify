import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";

const EditProfile = () => {
    const [values, setValues] = useState({
        name: "",
        phoneno: "",
        email: "",
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:3002/api/v1/admin/getdetails', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // console.log(response.data.data[0]);
                const userData = response.data.data[0];
                setValues({
                    name: userData.name || "",
                    phoneno: userData.phoneno || "",
                    email: userData.email || "",
                });
            } catch (err) {
                console.log(err.response.data.msg);
                setError(err.response.data.msg);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://127.0.0.1:3002/api/v1/admin/updatedetails', values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response.data);
            //toast for success
        } catch (err) {
            console.log(err.response.data.msg);
            setError(err.response.data.msg);
            //toast for error
        }
    };

    return (
        <Box m="20px">
            <Header title="Edit Profile" subtitle="Update your profile" />
            <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
                    <TextField
                        fullWidth
                        required
                        type="text"
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        required
                        type="text"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        required
                        type="number"
                        label="Phone Number"
                        name="phoneno"
                        value={values.phoneno}
                        onChange={(e) => setValues({ ...values, phoneno: e.target.value })}
                        sx={{ gridColumn: "span 4" }}
                    />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                        Update
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default EditProfile;
