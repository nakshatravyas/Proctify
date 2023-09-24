import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const defaultTheme = createTheme();

export default function Register() {

    const [values, setValues] = useState({
        name: "",
        email: '',
        phoneno: "",
        password: ''
    })
    const navigate = useNavigate()
    // axios.defaults.withCredentials = true;
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(values)
        try {
            const response = await axios.post('http://127.0.0.1:3002/api/v1/admin/register', values)
            console.log(response)
            localStorage.setItem('token', response.data.token)
            navigate("/global")
        }
        catch (err) {
            console.log(err.response.data.msg)
            setError(err.response.data.msg)
        }
        setValues({
            name: "",
            email: '',
            phoneno: "",
            password: ''
        })

    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{
                display: 'flex',
                height: "100%",
                alignItems: 'center',
            }}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoFocus
                            onChange={e => setValues({ ...values, name: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email"
                            name="username"
                            type='email'
                            onChange={e => setValues({ ...values, email: e.target.value.toLowerCase() })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phoneno"
                            label="Phone No"
                            name="phoneno"
                            type='number'
                            onChange={e => setValues({ ...values, phoneno: e.target.value })}
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
                            onChange={e => setValues({ ...values, password: e.target.value })}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        
                    </Box>
                    <Typography component="h1" variant="h5" color="red">
                        {error}
                    </Typography>
                </Box>

            </Container>
        </ThemeProvider>
    );
}