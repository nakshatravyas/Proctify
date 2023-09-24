import React from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { Link, Outlet } from 'react-router-dom'; // Import Link from React Router
import Card from '@mui/material/Card';
import Header from "../../components/Header";
import CardContent from '@mui/material/CardContent';
import ExamDetailsPopup from './ExamDetailsPopup';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const dummyExams = [
    {
        id: 1,
        name: 'Exam 1',
        date: '2023-01-15',
        score: 85,
        details: [
            {
                id: 101,
                studentName: 'John Doe',
                cvBased: 'Yes',
                mobileDetected: 'No',
                suspiciousAct: 'No',
                noiseDetected: 'No',
                trustScore: 90,
            },
            {
                id: 102,
                studentName: 'Jane Smith',
                cvBased: 'No',
                mobileDetected: 'Yes',
                suspiciousAct: 'No',
                noiseDetected: 'Yes',
                trustScore: 75,
            },
        ],
    },
    {
        id: 2,
        name: 'Exam 2',
        date: '2023-02-20',
        score: 92,
        details: [
            {
                id: 201,
                studentName: 'Alice Johnson',
                cvBased: 'Yes',
                mobileDetected: 'No',
                suspiciousAct: 'Yes',
                noiseDetected: 'No',
                trustScore: 80,
            },
            {
                id: 202,
                studentName: 'Bob Wilson',
                cvBased: 'No',
                mobileDetected: 'Yes',
                suspiciousAct: 'No',
                noiseDetected: 'No',
                trustScore: 88,
            },
        ],
    },
    {
        id: 3,
        name: 'Exam 3',
        date: '2023-03-25',
        score: 78,
        details: [
            {
                id: 301,
                studentName: 'Eva Brown',
                cvBased: 'Yes',
                mobileDetected: 'Yes',
                suspiciousAct: 'No',
                noiseDetected: 'No',
                trustScore: 92,
            },
            {
                id: 302,
                studentName: 'Max Taylor',
                cvBased: 'No',
                mobileDetected: 'No',
                suspiciousAct: 'Yes',
                noiseDetected: 'Yes',
                trustScore: 70,
            },
        ],
    },
];

const PastExams = () => {
    const theme = useTheme();
    const navigate = useNavigate()
    const [exams, setExams] = useState([]);
    const [error, setError] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedExam, setSelectedExam] = useState([]);
    const token = localStorage.getItem('token')

    useEffect(() => {
        fetchdata()
    }, [])

    const fetchdata = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3002/api/v1/admin/getallexams', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data.data)
            setExams(response.data.data)

        }
        catch (err) {
            console.log(err.response.data.msg)
            setError(err.response.data.msg)
        }
    }

    const handleViewDetails = (exam) => {
        // navigate(`get_exam_detail/${exam}`)
        setSelectedExam(exam)
        console.log(exam);
        setPopupOpen(true);

    };
    return (
        <Box m="20px">
            {/* HEADER */}
            {/* <Outlet> */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Past Exams" subtitle="View logs of past exams" />
            </Box>
            <Outlet/>
            {exams.map((exam) => (
                <Card
                    key={exam.adminid}
                    style={{ backgroundColor: '#3e4396', marginBottom: '16px' }}
                >
                    <CardContent>
                        <Typography variant="h5" component="div" color="white">
                            {exam.exam_name}
                        </Typography>
                        <Typography color="white">
                            Date: {exam.startdate}
                        </Typography>

                        {/* Use Button component for the "View Details" link */}
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginTop: '16px' }}
                            onClick={() => handleViewDetails(exam.examcode)}
                        >
                            View Details
                        </Button>
                    </CardContent>
                </Card>
            ))}
            {/* </Outlet> */}
            {/* Render the ExamDetailsPopup component when the popupOpen state is true */}
            {popupOpen && selectedExam.length !== 0 && (
                <ExamDetailsPopup
                    open={popupOpen}
                    onClose={() => setPopupOpen(false)}
                    examDetail={selectedExam}
                />
            )}
        </Box>
    );
};

export default PastExams;
