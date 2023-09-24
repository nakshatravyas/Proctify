import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";

const ExistingExam = () => {
  const token = localStorage.getItem('token');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);
  const [optionchange, setOptionChange] = useState('');

  const handleSubmit = async () => {
    // console.log(values)

    try {
      const response = await axios.get(`http://127.0.0.1:3002/api/v1/admin/publishresult/${optionchange}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Set the fetched options in state
      // setOptions(response.data.data);
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data.msg);
      setError(err.response.data.msg);
    }
  }

  const dataa = [
    "Java",
    "JavaScript",
    "React js",
    "Python",
    "C",
    "C++",
  ]
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
      setError(err.response.data.msg);
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
        <Typography component="h1" variant="h3">
          Enter Exam Code :
        </Typography>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          width="20rem"
        >
          <input
            style={{
              backgroundColor: '#1F2A40',
              color: "white",
              borderRadius: "3px",
              width: "20rem",
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

      <Box display="flex" justifyContent="center" mt="50px">
        <Button type="submit" color="secondary" variant="contained" onClick={handleSubmit}>
          Publish Result
        </Button>
      </Box>
    </Box>
  );
};

export default ExistingExam;
