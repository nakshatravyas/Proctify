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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Ongoing Exams" subtitle="Search for a particular exam" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="10px"
        pt="50px"
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
        <InputBase sx={{ flex: 1 }} onChange={e => setexamCode( e.target.value)} />
        <IconButton type="button" sx={{ p: 1 }} onClick={e => navigate("exam")}>
          <SearchIcon />
        </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
