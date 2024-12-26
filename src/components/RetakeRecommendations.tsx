import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Course } from '../types';
import { getRetakeCourses } from '../utils/courseAnalyzer';

interface RetakeRecommendationsProps {
  courses: Course[];
  isDarkMode: boolean;
}

const RetakeRecommendations: React.FC<RetakeRecommendationsProps> = ({ 
  courses,
  isDarkMode 
}) => {
  const retakeCourses = getRetakeCourses(courses);

  if (retakeCourses.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <RefreshCw className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Recommended Retake Courses
        </h2>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Consider retaking these courses to improve your CGPA (current grade below B-):
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-4 py-2 text-left">Course Name</th>
              <th className="px-4 py-2 text-center">Current Grade</th>
              <th className="px-4 py-2 text-right">Credits</th>
            </tr>
          </thead>
          <tbody>
            {retakeCourses.map((course, index) => (
              <tr 
                key={index} 
                className="border-t dark:border-gray-600"
              >
                <td className="px-4 py-2">{course.name}</td>
                <td className="px-4 py-2 text-center">
                  <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">
                    {course.grade}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">{course.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        * Improving these courses could significantly boost your overall CGPA
      </p>
    </div>
  );
};

export default RetakeRecommendations;