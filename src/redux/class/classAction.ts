import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClassesByIds, fetchStudentByName, fetchStudentsByIds } from "../../airtable-api";
import { parseClassInfo, parseStudentInfo, reduceClassesByStudentIds } from "../../airtable-api/helpers";
import { TStudent } from "../../types";



  
export const getClassesByIds = createAsyncThunk(
    'class/getClassesByIds',
    async (classesIds: string[], { rejectWithValue }) => {
      const response = await fetchClassesByIds(classesIds).then(
        async result => {
          const classes = parseClassInfo(result.data)

          if (!classes){
            return classes
          }

          const studentsIds = reduceClassesByStudentIds(classes)
          
          const students = await fetchStudentsByIds(Array.from(studentsIds))
          const parsedStudents: TStudent[] = []
          students.data.forEach(student => {
            let parsedStudent = parseStudentInfo(student)
            if (parsedStudent){
              parsedStudents.push(parsedStudent)
            }
          });

          const studentNameById = parsedStudents.reduce<Map<string,string>>((studentNameById,student) =>{
              studentNameById.set(student.Id,student.Name)
              return studentNameById
          },new Map())
          
          classes.forEach(studentClass => {
            const studentNames: string[] = []
            studentClass.Students.forEach(studentId => {
              let studentName = studentNameById.get(studentId)
              if (studentName){
                studentNames.push(studentName)
              } 
            })
            studentClass.StudentsNames = studentNames
          })
          return classes
        }
      ).catch(
        error =>{
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
              } else {
                return rejectWithValue(error.message)
              }
        }
      )
      return response;
    }
  );