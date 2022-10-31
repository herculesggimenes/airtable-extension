import { FieldSet, Records } from "airtable";
import { TAirtableQueryResults } from "../types";
import { airtableSettings } from "../airtableSettings";
import { airtableBase } from "./base";
import { returnError, returnSuccess } from "./helpers";

const classClient = airtableBase(airtableSettings.CLASSES_TABLE_ID)
const studentClient = airtableBase(airtableSettings.STUDENTS_TABLE_ID)



export function fetchClassesByIds(classIds: string[]): Promise<TAirtableQueryResults> {
    let classExpressions:string[] = []
    classIds.map(classId =>{
        classExpressions.push(`RECORD_ID() = '${classId}'`)
    })
    const output: any[] = []
    const formula = `OR(${classExpressions.join(',')})`
    return new Promise((resolve, reject) =>{
      classClient.select({
      filterByFormula:formula
      }).eachPage(
          function page(records, fetchNextPage) {
              records.map((record) => output.push({...record.fields, Id:record.id}));
              fetchNextPage();
            },
            function done(err) {
              return resolve(returnSuccess(output));
            }
      )
  })
}


export function fetchStudentsByIds(studentIds: string[]): Promise<TAirtableQueryResults> {
    let studentExpressions:string[] = []
    const output: any[] = [];
    studentIds.map(studentId =>{
        studentExpressions.push(`RECORD_ID() = '${studentId}'`)
    })
    const formula = `OR(${studentExpressions.join(',')})`
    return new Promise((resolve, reject) =>{
        studentClient.select({
        filterByFormula:formula
        }).eachPage(
            function page(records, fetchNextPage) {
                records.map((record) => output.push({...record.fields, Id:record.id}));
                fetchNextPage();
              },
              function done(err) {
                if (err) {
                  resolve(returnError(err));
                }
                resolve(returnSuccess(output));
              }
        )
    })
}



export function fetchStudentByName(studentName: string): Promise<TAirtableQueryResults> {
    const formula = `{Name}='${studentName}'`
    const output: any[] = []
    return new Promise((resolve, reject) =>{
        studentClient.select({
        filterByFormula:formula
        }).eachPage(
            function page(records, fetchNextPage) {
                records.map((record) => output.push({...record.fields, Id:record.id}));
                fetchNextPage();
              },
              function done(err) {
                if (err || output.length == 0) {
                  return reject(returnError(err || "Student Not Found"));
                }
                return resolve(returnSuccess(output));
              }
        )
    })
}


