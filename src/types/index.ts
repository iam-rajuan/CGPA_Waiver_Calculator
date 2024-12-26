export interface Course {
  name: string;
  grade: string;
  credits: string;
}

export interface Semester {
  id: number;
  courses: Course[];
}

export type Grades = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'F';

export interface Department {
  name: string;
  totalSemesters: number;
  totalCredits: number;
  perCreditFee: number;
  registrationFee: number;
  admissionFee: number;
  libraryFee: number;
  otherFees: number;
  psdFee: number;
}

export interface TuitionCalculation {
  department: Department;
  scholarshipPercentage: number;
  totalFees: number;
  semesterlyBreakdown: {
    beforeCourse: number;
    beforeMid: number;
    beforeFinal: number;
  };
}