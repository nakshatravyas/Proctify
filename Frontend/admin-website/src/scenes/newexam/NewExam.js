import { Box, Button, TextField, Typography, Divider, Grid, Paper, MenuItem, IconButton, } from "@mui/material";
import Header from "../../components/Header";
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
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


const NewExam = () => {
  const [values, setValues] = useState({
    exam_name: "",
    startdate: "",
    starttime: "",
    endtime: "",
    duration: "",
    negative_marks: "",
    question_weightage: "",
    mode: "",
    isRandom: "",
  })
  const [formData, setFormData] = useState([{ field1: '', fieldType: 'text' },]);
  const [examcode, setExamCode] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values)
    const startdate = values.startdate.split("T")[0]
    const starttime = values.starttime.split("T")[1].split("+")[0]
    const endtime = values.endtime.split("T")[1].split("+")[0]
    const negative_marks = (Number(values.question_weightage) * Number(values.negative_marks)) / 100
    values['startdate'] = startdate
    values['starttime'] = starttime
    values['endtime'] = endtime
    values['negative_marks'] = negative_marks
    console.log(values)
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post('http://127.0.0.1:3002/api/v1/admin/createnewexam', values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data.examcode)
      setExamCode(response.data.examcode)
      toast.success("New exam created")
    }
    catch (err) {
      console.log(err.response.data.msg)
      toast.error(err.response.data.msg)
    }
  }

  const handleAddFieldSet = () => {
    setFormData([...formData, { field1: '', fieldType: 'text' }]);
  };

  const handleInputChange = (index, fieldName, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][fieldName] = value;
    setFormData(updatedFormData);
  };
  const handleFieldTypeChange = (index, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index].fieldType = value;
    setFormData(updatedFormData);
  };
  const handleDeleteFieldSet = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };
  const handleSubmitt = () => {
    console.log(formData)
    // Send formData to the backend API using axios or fetch
    // Example: axios.post('/api/your-endpoint', formData)
  };
  return (
    <Box m="20px">
      <Header title="New Exam" subtitle="Create a New Exam" />

      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"


      >
        <TextField
          fullWidth
          required
          type="text"
          label="Exam Name"
          name="exam_name"
          onChange={e => setValues({ ...values, exam_name: e.target.value })}
          sx={{ gridColumn: "span 4" }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DemoContainer components={['DatePicker']} sx={{ gridColumn: "span 2" }}>
            <DatePicker label="Select Date" name="exam_date" sx={{ width: "100%" }}
              onChange={e => setValues({ ...values, startdate: e.format() })} />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker label="Start Time" name="start_time" sx={{ width: "100%" }} onChange={e => setValues({ ...values, starttime: e.format() })} />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker label="End Time" name="end_time" sx={{ width: "100%" }} onChange={e => setValues({ ...values, endtime: e.format() })} />
          </DemoContainer>
        </LocalizationProvider>

        <TextField
          fullWidth
          type="number"
          label="Duration"
          name="duration"
          required
          onChange={e => setValues({ ...values, duration: e.target.value })}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          fullWidth
          type="number"
          required
          label="Negative Marking in %"
          name="negative_mark"
          onChange={e => setValues({ ...values, negative_marks: e.target.value })}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          fullWidth
          type="number"
          required
          label="Question Weightage"
          name="que_weightage"
          onChange={e => setValues({ ...values, question_weightage: e.target.value })}
          sx={{ gridColumn: "span 2" }}
        />

        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Exam Mode</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled_radio_buttons_group"
            onChange={e => setValues({ ...values, mode: e.target.value })}
          >
            <FormControlLabel value="AUTO" control={<Radio />} label="Auto" name="auto" />
            <FormControlLabel value="LIVE" control={<Radio />} label="Live" name="manual" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Randomized student question formats?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled_radio_buttons_group"
            onChange={e => setValues({ ...values, isRandom: e.target.value })}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" name="yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" name="no" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Header title="Student Details" subtitle="Enter the details you want from student" />
      {formData.map((fieldSet, index) => (
        <Paper key={index} elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ justifyContent: "space-evenly" }}>
            <Grid item xs={6}>
              <TextField
                label={`Requirement`}
                fullWidth
                value={fieldSet.field1}
                onChange={(e) => handleInputChange(index, 'field1', e.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Format"
                select
                fullWidth
                value={fieldSet.fieldType}
                onChange={(e) => handleFieldTypeChange(index, e.target.value)}
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="email">Email</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={0} style={{ display: 'flex', }}>
              <IconButton
                onClick={() => handleDeleteFieldSet(index)}
                size="small"
                style={{ marginLeft: 'auto', color: 'red' }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Box display="flex" justifyContent="end" mt="20px" sx={{ pl: "6px", pr: "6px", pt: "2px", pb: "2px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddFieldSet}
        >
          <AddIcon />
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="center" mt="20px" >
        <Button type="submit" color="secondary" variant="contained" onClick={handleSubmit} sx={{ pl: "16px", pr: "16px", pt: "10px", pb: "10px", width: "15rem" }}>
          Create Exam
        </Button>
      </Box>
      {examcode ? <Typography component="h1" variant="h3" color="secondary" align="center">
        Exam Code : {examcode}
      </Typography> : ""}

    </Box>
  );
};




export default NewExam;
