import { Card, Chip, Typography } from '@mui/material';
import React, { ReactElement } from 'react'
import { TClass } from '../types';

interface ClassCardProps {
    Name: string
    Students: string[]
}


export default function ClassCard ({
    Name,
    Students
}: ClassCardProps) 
{    
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