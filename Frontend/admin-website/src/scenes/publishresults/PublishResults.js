import React, { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const ExistingExam = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubmit = () => {
    // console.log(values)
  }

  const dataa = [
    "Java",
    "JavaScript",
    "React js",
    "Python",
    "C",
    "C++",
]
const change = (e) => {
        console.log(e.target.value)
    //     // axios.get('your_api_endpoint'+e.target.value)
    //     //       .then((response) => {
    //     //         setques(response.data);
    //     //       })
    //     //       .catch((error) => {
    //     //         console.error('Error fetching options:', error);
    //     //       });
    }
  return (
    <Box m="20px">
      <Header title="Existing Exam" subtitle="Create from Existing Exam" />
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
          <input style={{
                    backgroundColor: '#1F2A40',
                    color: "white",
                    borderRadius: "3px",
                    width: "20rem",
                    padding: "10px",
                    border: "none",
                }} list="dataa" onChange={change} placeholder="Search" />
                <datalist id="dataa">
                    {dataa.map((op) => <option key={op}>{op}</option>)}
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
