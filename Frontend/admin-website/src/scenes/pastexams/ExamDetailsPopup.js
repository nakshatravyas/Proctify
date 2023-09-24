import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ExamDetailsPopup = ({ open, onClose, examDetail }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogContent>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <h2>Exam Details</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>CV Based</TableCell>
                <TableCell>Mobile Detected</TableCell>
                <TableCell>Suspicious Act</TableCell>
                <TableCell>Noise Detected</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examDetail.map((row) => (
                <TableRow key={row.sid}>
                  <TableCell>{row.sid}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.cv_based_warnings}</TableCell>
                  <TableCell>{row.mobile_detected}</TableCell>
                  <TableCell>{row.system_warnings}</TableCell>
                  <TableCell>{row.noise_warnings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default ExamDetailsPopup;
