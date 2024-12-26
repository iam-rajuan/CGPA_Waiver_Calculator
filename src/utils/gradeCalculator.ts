import { Course } from '../types';

export const getGradePoint = (grade: string): number => {
  switch (grade) {
    case 'A+': return 4.00;
    case 'A': return 3.75;
    case 'A-': return 3.50;
    case 'B+': return 3.25;
    case 'B': return 3.00;
    case 'B-': return 2.75;
    case 'C+': return 2.50;
    case 'C': return 2.25;
    case 'D': return 2.00;
    case 'F': return 0.00;
    default: return 0.00;
  }
};

export const calculateGPA = (courses: Course[]): number => {
  const validCourses = courses.filter(
    (course) => course.grade && course.credits && course.name
  );

  if (validCourses.length === 0) return 0;

  const totalCredits = validCourses.reduce(
    (sum, course) => sum + Number(course.credits),
    0
  );

  const totalGradePoints = validCourses.reduce(
    (sum, course) => sum + getGradePoint(course.grade) * Number(course.credits),
    0
  );

  return Number((totalGradePoints / totalCredits).toFixed(2));
};

export const calculateCGPA = (semesters: Course[][]): number => {
  const allCourses = semesters.flat();
  return calculateGPA(allCourses);
};

export const calculateTotalCredits = (semesters: Course[][]): number => {
  return semesters.flat().reduce((sum, course) => {
    if (course.credits && course.grade && course.name) {
      return sum + Number(course.credits);
    }
    return sum;
  }, 0);
};