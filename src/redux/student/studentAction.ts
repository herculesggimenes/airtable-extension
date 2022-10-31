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
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
              } else {
                console.log(error)
                return rejectWithValue(error.message)
              }
        }
      )
      return response;
    }
  );



