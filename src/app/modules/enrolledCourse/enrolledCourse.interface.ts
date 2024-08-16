import { Types } from 'mongoose'

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'NA'

export type TEnrollCourseMarks = {
  classTest1: number
  midTerm: number
  classTest2: number
  finalTerm: number
}

export type TEnrlledCourse = {
  semesterRegistration: Types.ObjectId
  academicSemester: Types.ObjectId
  academicDepartment: Types.ObjectId
  offeredCourse: Types.ObjectId
  course: Types.ObjectId
  student: Types.ObjectId
  faculty: Types.ObjectId
  isEnrolled: boolean
  courseMarks: TCourseMarks
  academicFaculty: Types.ObjectId,
  grade:TGrade;
  gradePoints:number;
  isCompleted:boolean;
  
}
