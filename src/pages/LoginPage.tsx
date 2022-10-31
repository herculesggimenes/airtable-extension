import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import {useNavigate} from 'react-router-dom'
import React, {useEffect} from 'react'
import * as yup from 'yup'
import { selectStudent, useAppDispatch, useAppSelector, authenticateStudent, selectClassesRequestResult } from '../redux';


function LoginPage () {
    const student = useAppSelector(selectStudent);
    const navigate = useNavigate();
    const requestStatus = useAppSelector(selectClassesRequestResult);
    const dispatch = useAppDispatch();
    
    const submitLogin = ({student}: {student:string}) => {
        dispatch(authenticateStudent(student))
        .then(
            res => {
                if(res.meta.requestStatus === 'rejected'){
                    alert(res.payload)
                }
            }
        )
    } 
    
    const validationSchema = yup.object({
        student: yup
        .string()
        .required('Student is Required')
    });

    const formik = useFormik({
        initialValues: {
            student: 'Joe'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitLogin(values)
        },
    });
    
    useEffect(()=>{
        if(student){
            navigate('/classes',{relative:'path'})
        }
    },[student])
    
    
    
    if (requestStatus.loading){
        return (<Typography>Loading...</Typography>)
    }
    
    
    return (
        <Box sx={{height:'100vh',display:'flex' ,alignItems:"center", justifyContent:'center'}}>
            <Paper sx={{margin:3, padding:3}}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                    fullWidth
                    id="student"
                    name="student"
                    label="Student"
                    value={formik.values.student}
                    onChange={formik.handleChange}
                    error={formik.touched.student && Boolean(formik.errors.student)}
                    helperText={formik.touched.student && formik.errors.student}
                    />
                    <Button 
                    color="primary" 
                    variant="contained"
                    style={{marginTop:10}}
                    fullWidth 
                    type="submit"
                    >
                    Submit
                    </Button>
                </form>
            </Paper>
        </Box>
        )
    }
    export default LoginPage