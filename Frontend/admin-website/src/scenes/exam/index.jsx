import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Exam = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      field: "id", headerName: "ID", headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Student Name",
      flex: 1,
      cellClassName: "name-column--cell",

    },
    {
      field: "cv_based",
      headerName: "CV Based",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mobile_detected",
      headerName: "Mobile Detected",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sus_sys_act",
      headerName: "Suspicious Act",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "noise_detected",
      headerName: "Noise Detected",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "trust_score",
      headerName: "Trust Score",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "web_cam",
      headerName: "Web Cam",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { web_cam } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              colors.greenAccent[600]
            }
            borderRadius="4px"
            sx={{
              cursor:"pointer",
            }}
            onClick={handleClickOpen}
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px", }}>
              Webcam
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "screen_share",
      headerName: "Screen Share",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { scree_share } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              colors.greenAccent[600]
            }
            borderRadius="4px"
            sx={{
              cursor:"pointer",
            }}
            onClick={handleClickOpen}
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Screen
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "remove_user",
      headerName: "Remove User",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { remove_user } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              colors.greenAccent[600]
            }
            borderRadius="4px"
            sx={{
              cursor:"pointer",
            }}
            onClick={handleClickOpen}
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Remove
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
      <Header title="Exam" subtitle="Live exam monitoring" />
      <Box
        m="-10px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Exam;
