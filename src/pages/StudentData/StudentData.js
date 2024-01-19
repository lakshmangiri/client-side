import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Material UI components
import { Typography, Container, Button, Alert, Stack } from '@mui/material';
// Custom components
import StudentDataTable from '../../components/StudentDataTable/StudentDataTable';
import AddStudentRecord from '../../components/AddStudentDialog/AddStudentRecord';
// Configuration
import StudentColumns from '../../config/Columns/StudentTableColumns';

const StudentData = () => {
  const [rows, setRows] = useState([]);
  const [alert, setAlert] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    fetchStudents(); // Fetch students on component mount
  }, [])

  // Formats date string to DD/MM/YYYY format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Refreshes student data when a new student is added
  const handleStudentAdded = () => {
    fetchStudents();
  };

  // Fetches student data from the server
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/studentData');
      const students = response.data.posts.map(student => ({
        ...student,
        id: student.studentId,
        DOB: formatDate(student.DOB),
        m1: student.moduleOne,
        m2: student.moduleTwo,
        m3: student.moduleThree
      }));
      setRows(students);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  // Calculates average and grade for selected students
  const handleAverageCalculation = () => {
    const updatedRows = rows.map(row => {
      if (selectionModel.includes(row.id)) {
        setAlert(false);
        const average = (row.m1 + row.m2 + row.m3) / 3;
        const grade = average >= 70 ? 'Distinction' : average >= 60 ? 'Merit' : average >= 40 ? 'Pass' : 'Fail';
        return { ...row, average: average.toFixed(2), grade };
      }
      return row;
    });
    if (selectionModel.length === 0) setAlert(true);
    setRows(updatedRows);
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" style={{ textAlign: 'center', marginTop: '10px' }}>
        <Typography variant="h4">TDR Technical Assessment</Typography>
        <div style={{ textAlign: 'left', marginTop: '10px' }}>
          <Button variant="contained" color="primary" onClick={() => setIsOpenDialog(true)}>Add Student</Button>
        </div>
        <AddStudentRecord isOpen={isOpenDialog} handleClose={() => setIsOpenDialog(false)} onStudentAdded={handleStudentAdded} />
        <div className="studentList" style={{ marginTop: '20px' }}>
          <StudentDataTable rows={rows} columns={StudentColumns} onSelectionModelChange={setSelectionModel} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Button variant="contained" color="secondary" style={{ marginTop: '20px' }} onClick={handleAverageCalculation}>Calculate Average</Button>
        </div>
        {alert && (
          <div style={{ display: 'flex', margin: '20px auto', width: '50%' }}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity='warning'>Select a student row or group of student rows to get the Average</Alert>
            </Stack>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
}

export default StudentData;
