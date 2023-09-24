import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    id: null,
    imageQuestion: false,
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    imageFile: null,
  });

  const data = [
    {
      id: 1,
      imageQuestion: false,
      question: 'Question 1',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
    },
    {
      id: 2,
      imageQuestion: true,
      question: '', // Leave empty for now, as it's an image question
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option B',
      image: 'https://example.com/image1.png',
    },
    {
      id: 3,
      imageQuestion: false,
      question: 'Question 3',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option C',
    },
    // Add more data as needed
  ];

  const handleEditClick = (item) => {
    setEditedData(item);
    setEditDialogOpen(true);
  };

  const handleUpdate = () => {
    // Log the updated values
    console.log(editedData);

    // Make an API call to update the values
    // axios
    //   .put(`your_api_endpoint/${editedData.id}`, editedData)
    //   .then((response) => {
    //     console.log('Data updated successfully:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error updating data:', error);
    //   });

    setEditDialogOpen(false);
  };

  const handleImageUpload = (e) => {
    // Handle image upload here
    const file = e.target.files[0];

    // You can perform any necessary operations with the uploaded file here
    // For example, you can display a preview of the image:
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageSrc = event.target.result;
      setEditedData({ ...editedData, imageFile: file, image: imageSrc });
    };
    reader.readAsDataURL(file);
  };

  const renderForm = () => {
    if (editedData.imageQuestion) {
      return (
        <div>
          {/* Actual image upload component */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {editedData.imageFile && (
            <img
              src={editedData.image}
              alt="Question"
              style={{ maxWidth: '100%', marginTop: '16px' }}
            />
          )}

          {/* Options for image questions */}
          {editedData.options.map((option, index) => (
            <div key={index}>
              <TextField
                label={`Option ${String.fromCharCode(65 + index)}`}
                fullWidth
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...editedData.options];
                  updatedOptions[index] = e.target.value;
                  setEditedData({ ...editedData, options: updatedOptions });
                }}
                style={{ marginBottom: '16px' }}
              />
            </div>
          ))}

          <TextField
            label="Correct Answer"
            fullWidth
            value={editedData.correctAnswer}
            onChange={(e) =>
              setEditedData({ ...editedData, correctAnswer: e.target.value })
            }
            style={{ marginTop: '16px' }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <TextField
            label="Question"
            fullWidth
            value={editedData.question}
            onChange={(e) => setEditedData({ ...editedData, question: e.target.value })}
            style={{ marginBottom: '16px' }}
          />
          {editedData.options.map((option, index) => (
            <div key={index}>
              <TextField
                label={`Option ${String.fromCharCode(65 + index)}`}
                fullWidth
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...editedData.options];
                  updatedOptions[index] = e.target.value;
                  setEditedData({ ...editedData, options: updatedOptions });
                }}
                style={{ marginBottom: '16px' }}
              />
            </div>
          ))}
          <TextField
            label="Correct Answer"
            fullWidth
            value={editedData.correctAnswer}
            onChange={(e) =>
              setEditedData({ ...editedData, correctAnswer: e.target.value })
            }
            style={{ marginTop: '16px' }}
          />
        </div>
      );
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="View Questions" subtitle="Update or Delete questions" />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Questions</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.question || 'Image Question'}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="Edit"
                    color="secondary"
                    onClick={() => handleEditClick(item)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="Delete" color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          {renderForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="secondary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
