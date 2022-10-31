import { parseStudentInfo } from "../../airtable-api/helpers";
import { TStudent } from "../../types";
import { RootState } from "../store";

export const selectClasses = (state: RootState) => {
    return state.class.classesInfo
};
export const selectClassesRequestResult = (state: RootState) => ({
    loading: state.class.loading,
    error: state.class.error,
    success: state.class.success
})
