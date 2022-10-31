import { parseStudentInfo } from "../../airtable-api/helpers";
import { TStudent } from "../../types";
import { RootState } from "../store";

export const selectStudent = (state: RootState) => {
    return state.student.studentInfo
};
export const selectStudentRequestResult = (state: RootState) => ({
    loading: state.student.loading,
    error: state.student.error,
    success: state.student.success
})
