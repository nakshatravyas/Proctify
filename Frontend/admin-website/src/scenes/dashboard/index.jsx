import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()
  const [examCode,setexamCode]=useState()

  return (
    <Box m="20px">
      {/* HEADER */}
      {/* <Box display="flex" justifyContent="space-between" alignItems="center"> */}
        {/* <Header title="Ongoing Exams" subtitle="Search for a particular exam" />
         */}
      <h1 style={{ marginBottom: -10 }}>Ongoing Exams</h1>
      <h3 style={{ color: "#1774D4",fontWeight:'medium',fontSize:19 }}>Search for a particular exam</h3>
      {/* </Box> */}

      {/* GRID & CHARTS */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="10px"
        pt="50px"
      >
        {/* <Typography component="h1" variant="h3">
          Exam Code :
        </Typography> */}
        <h3 style={{ color: "#000000",fontSize:19,fontWeight:'lighter' }}>Exam Code :</h3>
        
        <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        width="20rem"
        >
        <InputBase style={{backgroundColor:'#f2f2f2',borderRadius:20}} sx={{ flex: 1,p:"10px" }} onChange={e => setexamCode( e.target.value)} placeholder="Exam Code"/>
        <IconButton type="button" sx={{ p: "15px",backgroundColor:"#0159ED",color:"white"}} onClick={e => navigate("exam")}>
          <SearchIcon />
        </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
