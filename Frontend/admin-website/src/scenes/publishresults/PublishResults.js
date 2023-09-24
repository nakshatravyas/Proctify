import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import toast from "react-hot-toast";

const PublishResults = () => {
  const token = localStorage.getItem('token');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [options, setOptions] = useState([]);
  const [optionchange, setOptionChange] = useState('');

  useEffect(() => {
    fetchdata();
  }, [optionchange]);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3002/api/v1/admin/publishresult/${optionchange}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      toast.success("Results Published")
    } catch (err) {
      console.log(err.response.data.msg);
      toast.error(err.response.data.msg)
    }
  }



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

      <Box display="flex" justifyContent="center" mt="50px">
        <Button type="submit" color="secondary" variant="contained" onClick={handleSubmit} sx={{pl:"16px",pr:"16px",pt:"10px",pb:"10px"}}>
          Publish Result
        </Button>
      </Box>
    </Box>
  );
};

export default PublishResults;
