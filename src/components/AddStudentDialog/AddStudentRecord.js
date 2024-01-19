import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, Snackbar } from '@mui/material';
import axios from 'axios';

const AddStudentRecord = ({isOpen, handleClose}) => {

    // State Variables of the form field
    const [studentId, setStudentId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [DOB, setDOB] = useState('');
    const [moduleOne, setModuleOne] = useState('');
    const [moduleTwo, setModuleTwo] = useState('');
    const [moduleThree, setModuleThree] = useState('');

    const [showSnackBar, setShowSnackBar] = useState(false);

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setShowSnackBar(false);
    };

    // Add data to the DB
    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentData = {studentId, firstName, lastName, DOB, moduleOne, moduleTwo, moduleThree};

        try {
            await axios.post('http://localhost:5000/studentData', studentData);
            setShowSnackBar(true);
            handleClose();
        } catch (err) {
            console.log('Error in Adding the data', err);
            setShowSnackBar(false);
        }
    };
    
    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle style={{textAlign: 'center'}}>
                Add New Student record
                </DialogTitle>
                <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth   
                            id="studentId"
                            label="Student Id"
                            type="text"
                            variant="standard"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="firstName"
                            label="First Name"
                            type="text"
                            variant="standard"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="lastName"
                            label="last Name"
                            type="text"
                            variant="standard"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            style={{marginTop: '16px'}}
                            fullWidth
                            id="DOB"
                            type="date"
                            variant="standard"
                            value={DOB}
                            onChange={(e) => setDOB(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                              }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth   
                            id="moduleOne"
                            label="module 1"
                            type="text"
                            variant="standard"
                            value={moduleOne}
                            onChange={(e) => setModuleOne(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="moduleTwo"
                            label="module 2"
                            type="text"
                            variant="standard"
                            value={moduleTwo}
                            onChange={(e) => setModuleTwo(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        id="moduleThree"
                        label="module 3"
                        type="text"
                        variant="standard"
                        value={moduleThree}
                        onChange={(e) => setModuleThree(e.target.value)}
                        />
                    </Grid>
                </Grid>   
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleSubmit}
                    > 
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={showSnackBar}
                autoHideDuration={2000}
                onClose={handleSnackBarClose}
                message="Student record Added"
            />
        </>
    )
}

export default AddStudentRecord;