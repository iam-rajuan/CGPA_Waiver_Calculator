import { Course } from '../types';

export const getRetakeCourses = (courses: Course[]): Course[] => {
  const RETAKE_THRESHOLD = 2.75;
  
  const getGradePoint = (grade: string): number => {
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

  return courses.filter(course => 
    course.name && 
    course.grade && 
    getGradePoint(course.grade) < RETAKE_THRESHOLD
  );
};