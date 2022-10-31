import { Card, Chip, Typography } from '@mui/material';
import React from 'react'
import { TClass } from '../types';


export default function ClassCard ({
    Name,
    Students
}: {
    Name: string,
    Students: string[]
}){    
    return (
        <Card sx={{margin:2,padding:1.5}}>
            <Typography>Name: {Name}</Typography>
            <Typography>Students:</Typography>
            {Students.map((student,key) => (
                <Chip key={key} label={student} sx={{marginX:1}}/>
            ))
            }
        </Card>
    )
}