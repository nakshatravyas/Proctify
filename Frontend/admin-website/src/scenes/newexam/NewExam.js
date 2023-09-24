import { Box, Button, TextField,Typography } from "@mui/material";
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
import { useNavigate } from "react-router-dom";


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
  const [error, setError] = useState('')
  const [examcode, setExamCode] = useState('')
  const navigate = useNavigate()
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
      //toast for success
    }
    catch (err) {
      console.log(err.response.data.msg)
      setError(err.response.data.msg)
      //toast for error
    }
  }
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

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem >
            <TimePicker views={['minutes']} format="mm" label="Duration" name="exam_duration" onChange={e => setValues({ ...values, duration: e.format() })} />
          </DemoItem>
        </LocalizationProvider> */}

        <TextField
          fullWidth
          type="number"
          label="Duration"
          name="duration"
          onChange={e => setValues({ ...values, duration: e.target.value })}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          fullWidth
          type="number"
          label="Negative Marking in %"
          name="negative_mark"
          onChange={e => setValues({ ...values, negative_marks: e.target.value })}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          fullWidth
          type="number"
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
          <FormLabel id="demo-controlled-radio-buttons-group">Would you like each student to have questions in a random format?</FormLabel>
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
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained" onClick={handleSubmit}>
          Create Exam
        </Button>
      </Box>
      <Typography component="h1" variant="h3" color="secondary" align="center">
        Exam Code : {examcode}
      </Typography>


    </Box>
  );
};




export default NewExam;
