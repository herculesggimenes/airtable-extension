import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStudentByName } from "../../airtable-api";
import { parseStudentInfo } from "../../airtable-api/helpers";

  
export const authenticateStudent = createAsyncThunk(
    'student/authenticateStudent',
    async (studentName: string, { rejectWithValue }) => {
      const response = await fetchStudentByName(studentName).then(
        result => {
            if (result.data.length === 0){
              return rejectWithValue("Student not found")
            }
            if (result.data.length > 1){
              return rejectWithValue("Multiple student with same names")
            } 
            return parseStudentInfo(result.data[0])
            
        }
      ).catch(
        error =>{
          console.log(error)
          return rejectWithValue(error.error.message)
        }
      )
      return response;
    }
  );



