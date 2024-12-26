import React from 'react';
import { X } from 'lucide-react';
import { Course, Grades } from '../types';

interface CourseInputProps {
  course: Course;
  onChange: (field: keyof Course, value: string) => void;
  onDelete: () => void;
}

const GRADES: Grades[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'];

const CourseInput: React.FC<CourseInputProps> = ({ course, onChange, onDelete }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="w-full sm:flex-1">
        <input
          type="text"
          value={course.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Subject Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 outline outline-indigo-300 dark:text-gray-600"
        />
      </div>
      <div className="w-full sm:w-32">
        <select
          value={course.grade}
          onChange={(e) => onChange('grade', e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white text-gray-600 outline outline-indigo-300"
        >
          <option value="">Grade</option>
          {GRADES.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full sm:w-32">
        <input
          type="number"
          value={course.credits}
          onChange={(e) => onChange('credits', e.target.value)}
          placeholder="Credits"
          min="0"
          max="5"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 outline outline-indigo-300 dark:text-gray-600"
        />
      </div>
      <button
        onClick={onDelete}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default CourseInput;