// features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { TClass } from '../../types'
import { getClassesByIds } from './classAction'


export type TClassState = {
  loading:boolean
  classesInfo?: TClass[]
  error?: any
  success: boolean
}


const initialState : TClassState = {
  loading: false,
  classesInfo: undefined,
  error: undefined,
  success: false
} 




const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
  },
  extraReducers:(builder) =>{
    builder.addCase(
      getClassesByIds.pending,(state) =>{
        state.error = null
        state.loading = true
      }
      ).addCase(
        getClassesByIds.fulfilled,(state, {payload}) =>{
          state.loading = false
          state.success = true 
          state.classesInfo = payload
        }
      ).addCase(
        getClassesByIds.rejected,(state, {payload}) =>{
          state.loading = false
          state.error = payload
        }
      )
    },
  }
)
      
export default classSlice.reducer