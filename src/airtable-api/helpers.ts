import {Records, FieldSet} from 'airtable'
import { TStudent, TAirtableQueryResults, TClass } from '../types';

export const returnSuccess = (output: any): TAirtableQueryResults => {
   return {
        success: true,
        data: output,
        error: '',
    }
};

export const returnError = (error: any): TAirtableQueryResults => ({
    success: false,
    data: [],
    error,
});

export const parseStudentInfo = (studentInfo: any) : TStudent | undefined => {
    if (!studentInfo){
        return undefined
    }
    if (!studentInfo.Name || !studentInfo.Classes) {
        throw new Error("Missing Student Keys");
    }
    const student: TStudent = {
        Id: studentInfo.Id,
        Name: studentInfo.Name,
        Classes: studentInfo.Classes
    }
    return student
}

export const parseClassInfo = (classesInfo: any[]) : TClass[] | undefined => {
    if (!classesInfo){
        return undefined
    }
    let classes: TClass[] = []
    classesInfo.map((classInfo) =>{
        if (!classInfo.Name){
            classInfo.Name = ""
        }
        if (!classInfo.Students){
            classInfo.Students = []
        }
        classes.push(
            {
                Id: classInfo.Id,
                Name:classInfo.Name,
                Students:classInfo.Students,
                StudentsNames: []
            }
        )
    })
    return classes
}


export const reduceClassesByStudentIds= (classes: TClass[]) : Set<string> =>{
    
    return classes.reduce<Set<string>>((studentsIdsSet,studenClass)=>{
        studenClass.Students.forEach(studentId =>{
        studentsIdsSet.add(studentId)
        })
        return studentsIdsSet
    },new Set()) 
}


