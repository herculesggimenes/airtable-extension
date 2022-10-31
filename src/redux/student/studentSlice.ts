// features/user/userSlice.js
import { CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { TStudent } from '../../types'
import { authenticateStudent } from './studentAction'


export type TStudentState = {
  loading:boolean
  studentInfo?: TStudent
  error?: any
  success: boolean
}


const initialState : TStudentState = {
  loading: false,
  studentInfo: undefined,
  error: undefined,
  success: false
} 




const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    logout: (state) => {
      state.studentInfo = undefined
      state.error = undefined
      state.loading = false
      state.success = false
    }
  },
  extraReducers:(builder) =>{
    builder.addCase(
      authenticateStudent.pending,(state) =>{
        state.error = undefined
        state.loading = true
      }
      ).addCase(
        authenticateStudent.fulfilled,(state, {payload}) =>{
          state.loading = false
          state.success = true
          state.studentInfo = payload
        }
      ).addCase(
        authenticateStudent.rejected,(state, {payload}) =>{
          state.loading = false
          state.error = payload
        }
      )
    },
  }
)

export const {logout} = studentSlice.actions
      
export default studentSlice.reducer