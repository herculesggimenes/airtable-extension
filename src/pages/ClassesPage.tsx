import { Button, Grid, Box, Stack } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import ClassCard from '../components/ClassCard'
import {useEffect} from 'react'
import {selectStudent, useAppDispatch, useAppSelector, selectClasses, getClassesByIds, logout } from '../redux';

function ClassesPage () {
    const student = useAppSelector(selectStudent);
    const classes = useAppSelector(selectClasses)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(!student){
            navigate('/',{relative:'path'})
            return
        }
        dispatch(getClassesByIds(student.Classes))
    },[student])


    const handleLogout = () => {
        dispatch(logout())
        navigate('/',{relative:'path'})
    }
    
    return (
        <Grid>
            <Box sx={{display:"flex", justifyContent:'flex-end'}}>
                <Button 
                color="error" 
                variant="contained"
                onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
            <Stack>
            {classes?.map((studentClass) => (
                <ClassCard 
                    key={studentClass.Id}
                    Name={studentClass.Name}
                    Students={studentClass.StudentsNames}/>
            ))}
            </Stack>
        </Grid>
    )
}
export default ClassesPage