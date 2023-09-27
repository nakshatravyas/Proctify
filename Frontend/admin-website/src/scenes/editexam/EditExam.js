import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/Header';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const EditExam = () => {
  // Initial state for exams
  const [exams, setExams] = useState([
    {
      id: 1,
      exam_name: 'Exam 1',
      exam_date: '2023-10-10',
      start_time: '09:00',
      end_time: '12:00',
      duration: 120,
      negative_mark: 10,
      que_weightage: 5,
      mode: 'AUTO',
      isRandom: true,
      student_details: [
        { field1: 'Field 1', fieldType: 'date' },
        { field1: 'Field 2', fieldType: 'number' },
      ],
    },
    {
      id: 1,
      exam_name: 'Exam 1',
      exam_date: '2023-10-10',
      start_time: '09:00',
      end_time: '12:00',
      duration: 120,
      negative_mark: 10,
      que_weightage: 5,
      mode: 'AUTO',
      isRandom: true,
      student_details: [
        { field1: 'Field 1', fieldType: 'date' },
        { field1: 'Field 2', fieldType: 'number' },
      ],
    },
    {
      id: 1,
      exam_name: 'Exam 1',
      exam_date: '2023-10-10',
      start_time: '09:00',
      end_time: '12:00',
      duration: 120,
      negative_mark: 10,
      que_weightage: 5,
      mode: 'AUTO',
      isRandom: true,
      student_details: [
        { field1: 'Field 1', fieldType: 'date' },
        { field1: 'Field 2', fieldType: 'number' },
      ],
    },
    // Add more exam data here
  ]);

  // State for edited exam, new exam, and dialog visibility
  const [editedExam, setEditedExam] = useState({});
  const [newExam, setNewExam] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isNewExamDialogOpen, setNewExamDialogOpen] = useState(false);

  // Function to handle clicking the "Edit" button
  const handleEditClick = (exam) => {
    setEditedExam(exam);
    setEditDialogOpen(true);
  };

  // Function to add a new field set to the edited exam
  const handleAddFieldSet = () => {
    // Add a new field set to the editedExam's student_details
    setEditedExam((prevExam) => ({
      ...prevExam,
      student_details: [
        ...(prevExam.student_details || []),
        { field1: '', fieldType: 'date' },
      ],
    }));
  };

  // Function to delete a field set from the edited exam
  const handleDeleteFieldSet = (index) => {
    // Remove a field set from the editedExam's student_details
    setEditedExam((prevExam) => ({
      ...prevExam,
      student_details: prevExam.student_details.filter((_, i) => i !== index),
    }));
  };

  // Function to update an exam
  const handleUpdateExam = () => {
    // Update the exam with editedExam data
    // Make an API call to update the exam with editedExam data
    // Then, update the exams state with the updated exam data
    // For demonstration purposes, we'll just update the state directly

    setExams((prevExams) =>
      prevExams.map((exam) =>
        exam.id === editedExam.id ? { ...exam, ...editedExam } : exam
      )
    );

    setEditDialogOpen(false);

    // Console log the updated exam data
    console.log("Updated Exam Data:", editedExam);
  };

  return (
    <Box m="20px">
      {/* Header */}
      <Header title="Edit Exams" subtitle="Manage exams and student details" />

      {/* List of Exams */}
      {exams.map((exam) => (
        <Paper key={exam.id} elevation={4} style={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            {exam.exam_name}
          </Typography>
          <Typography sx={{ marginBottom: '16px' }}>
            Exam Date: {exam.exam_date}
            <br />
            Start Time: {exam.start_time}
            <br />
            End Time: {exam.end_time}
            <br />
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="end">
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleEditClick(exam)}
              sx={{ marginRight: '16px' }}
            >
              Edit
            </Button>
            <Button color="error" variant="contained">
              Delete
            </Button>
          </Box>
        </Paper>
      ))}

      {/* Edit Exam Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullScreen TransitionComponent={Transition}>
        <DialogTitle sx={{fontSize:"25px",fontWeight:"bold"}}>Edit Exam</DialogTitle>
        <DialogContent>
          {/* Exam Details */}
          <Header
            subtitle="Edit exam details:"
          />
          <TextField
            fullWidth
            required
            type="text"
            label="Exam Name"
            name="exam_name"
            value={editedExam.exam_name || ''}
            onChange={(e) =>
              setEditedExam({ ...editedExam, exam_name: e.target.value })
            }
            sx={{ marginBottom: 2 }} 
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ marginBottom: 2 }}>
              <DatePicker
                label="Select Date"
                name="exam_date"
                sx={{ width: '100%' }}
                value={editedExam.exam_date ? dayjs(editedExam.exam_date) : null}
                onChange={(e) =>
                  setEditedExam({ ...editedExam, exam_date: e ? e.format() : null })
                }
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']} sx={{ marginBottom: 2 }}>
              <TimePicker
                label="Start Time"
                name="start_time"
                sx={{ width: '100%' }}
                value={editedExam.start_time ? dayjs(editedExam.start_time) : null}
                onChange={(e) =>
                  setEditedExam({ ...editedExam, start_time: e ? e.format() : null })
                }
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']} sx={{ marginBottom: 2 }}>
              <TimePicker
                label="End Time"
                name="end_time"
                sx={{ width: '100%' }}
                value={editedExam.end_time ? dayjs(editedExam.end_time) : null}
                onChange={(e) =>
                  setEditedExam({ ...editedExam, end_time: e ? e.format() : null })
                }
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            fullWidth
            type="number"
            label="Duration (minutes)"
            name="duration"
            required
            value={editedExam.duration || ''}
            onChange={(e) =>
              setEditedExam({ ...editedExam, duration: e.target.value })
            }
            sx={{ marginBottom: 2 }} 
          />

          <TextField
            fullWidth
            type="number"
            required
            label="Negative Marking (%)"
            name="negative_mark"
            value={editedExam.negative_mark || ''}
            onChange={(e) =>
              setEditedExam({ ...editedExam, negative_mark: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            type="number"
            required
            label="Question Weightage"
            name="que_weightage"
            value={editedExam.que_weightage || ''}
            onChange={(e) =>
              setEditedExam({ ...editedExam, que_weightage: e.target.value })
            }
            sx={{ marginBottom: 2 }} 
          />

          <FormControl sx={{ marginBottom: 2 }} >
            <FormLabel id="demo-controlled-radio-buttons-group">Exam Mode</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="mode"
              value={editedExam.mode || 'AUTO'}
              onChange={(e) => setEditedExam({ ...editedExam, mode: e.target.value })}
            >
              <FormControlLabel value="AUTO" control={<Radio />} label="Auto" />
              <FormControlLabel value="LIVE" control={<Radio />} label="Live" />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ marginBottom: 2 }} >
            <FormLabel id="demo-controlled-radio-buttons-group">
              Randomized student question formats?
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="isRandom"
              value={editedExam.isRandom || true}
              onChange={(e) =>
                setEditedExam({ ...editedExam, isRandom: e.target.value })
              }
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          {/* Student Details */}
          <Header
            subtitle="Edit student details:"
          />
          {editedExam.student_details &&
            editedExam.student_details.map((fieldSet, index) => (
              <Paper
                key={index}
                elevation={3}
                style={{ padding: '16px', marginBottom: '16px' }}
              >
                <Grid container spacing={2} style={{ justifyContent: 'space-evenly' }}>
                  <Grid item xs={6}>
                    <TextField
                      label={`Requirement`}
                      fullWidth
                      value={fieldSet.field1 || ''}
                      onChange={(e) =>
                        setEditedExam({
                          ...editedExam,
                          student_details: editedExam.student_details.map(
                            (item, i) =>
                              i === index
                                ? { ...item, field1: e.target.value }
                                : item
                          ),
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="Format"
                      select
                      fullWidth
                      value={fieldSet.fieldType || 'date'}
                      onChange={(e) =>
                        setEditedExam({
                          ...editedExam,
                          student_details: editedExam.student_details.map(
                            (item, i) =>
                              i === index
                                ? { ...item, fieldType: e.target.value }
                                : item
                          ),
                        })
                      }
                    >
                      <MenuItem value="date">Date</MenuItem>
                      <MenuItem value="number">Number</MenuItem>
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      onClick={() => handleDeleteFieldSet(index)}
                      size="small"
                      style={{ marginLeft: 'auto', color: 'red' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          <Box
            display="flex"
            justifyContent="end"
            mt="20px"
            sx={{ pl: '6px', pr: '6px', pt: '2px', pb: '2px' }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddFieldSet}
            >
              <AddIcon />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="error" variant='contained'>
            Cancel
          </Button>
          <Button onClick={handleUpdateExam} color="secondary" variant='contained'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditExam;
