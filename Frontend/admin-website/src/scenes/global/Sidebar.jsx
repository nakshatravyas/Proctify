import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  // Item,
  SubMenu,
} from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CreateIcon from "@mui/icons-material/Create";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "white",
        fontSize:30
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      
    >
      <h2 style={{fontSize:17,fontWeight:'bold'}}>{title}</h2>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isSticky }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{

        position: isSticky ? "sticky" : "relative", // Make it sticky
        minWidth: "270px",
        top: "0", // Adjust as needed
        height: "100vh", // Limit height
        "& .pro-sidebar": {
          zIndex: "100", // Adjust as needed
          overflowY: "auto", // Enable scrolling
        },
        "& .pro-sidebar-inner": {
          background: `${colors.primary[200]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#0159ED !important",
        },
        "& .pro-menu-item.active": {
          color: "#0159ED !important",
        },
      }}
    >
      <ProSidebar collapsed={false}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          {/* <Box mb="25px" mt="50px"> */}
            {/* <Box textAlign="center"> */}
              {/* <Typography
                variant="h2"
                color="white"
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                Admin
              </Typography> */}
              <div style={{display:'flex',justifyContent:'center'}}>

              <h1 style={{color:'white',fontSize:30,fontFamily:'monospace'}}>
                Admin
              </h1>
              </div>

            {/* </Box> */}
          {/* </Box> */}


          <Box paddingLeft="10%">
            <Item
              title="Ongoing Exams"
              to=""
              icon={<HomeOutlinedIcon style={{fontSize:25}}/>}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu title="Create Exam" icon={<AppRegistrationIcon style={{fontSize:25}}/>} style={{
              color: "white",fontSize:17,fontWeight:'bold'
            }}>
              <Item
                title="Create New Exam"
                to="new_exam"
                icon={<CreateIcon style={{fontSize:25}}/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Existing Exam"
                to="existing_exam"
                icon={<EventRepeatOutlinedIcon style={{fontSize:25}}/>}
                selected={selected}
                setSelected={setSelected}
              />

            </SubMenu>
            <Item
              title="Generate Question"
              to="generate_question"
              icon={<PostAddOutlinedIcon style={{fontSize:25}}/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Past Exams"
              to="past_exams"
              icon={<HistoryOutlinedIcon style={{fontSize:25}}/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="View Questions"
              to="view_questions"
              icon={<NoteAltOutlinedIcon style={{fontSize:25}}/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Publish Result"
              to="publish_results"
              icon={<UploadFileOutlinedIcon style={{fontSize:25}}/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Edit Profile"
              to="edit_profile"
              icon={<AccountCircleOutlinedIcon style={{fontSize:25}}/>}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
