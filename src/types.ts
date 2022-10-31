import { FieldSet, Record } from "airtable"

export type TStudent = {
    Id:string
    Name: string
    Classes: string[]
}

export type TClass = {
    Id:string
    Name: string
    Students: string[]
    StudentsNames:string[]
}

export type TAirtableQueryResults= {
    success: boolean;
    data: Record<any>[];
    error: string;
  };



export interface AirtableSettings {
    API_KEY: string
    BASE_ID:string
    CLASSES_TABLE_ID:string
    CLASSES_NAME_FIELD_ID:string
    CLASSES_STUDENTS_FIELD_ID:string
    STUDENTS_TABLE_ID:string
    STUDENTS_NAME_FIELD_ID:string
    STUDENTS_CLASSES_FIELD_ID:string
}
