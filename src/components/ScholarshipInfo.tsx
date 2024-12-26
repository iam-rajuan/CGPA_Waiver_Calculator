import React from 'react';
import { Award } from 'lucide-react';

interface ScholarshipInfoProps {
  cgpa: number;
}

const ScholarshipInfo: React.FC<ScholarshipInfoProps> = ({ cgpa }) => {
  const getScholarshipInfo = () => {
    if (cgpa >= 3.75) {
      return {
        title: "Full Merit Scholarship",
        description: "Congratulations! You qualify for a 100% tuition waiver.",
        color: "text-green-600 dark:text-green-400",
      };
    } else if (cgpa >= 3.50) {
      return {
        title: "Partial Merit Scholarship",
        description: "You're eligible for a 50% tuition waiver.",
        color: "text-blue-600 dark:text-blue-400",
      };
    } else if (cgpa >= 3.00) {
      return {
        title: "Need-Based Financial Aid",
        description: "You can apply for need-based financial assistance.",
        color: "text-yellow-600 dark:text-yellow-400",
      };
    }
    return {
      title: "Keep Working",
      description: "Maintain a CGPA of 3.00 or higher to qualify for scholarships.",
      color: "text-gray-600 dark:text-gray-400",
    };
  };

  const info = getScholarshipInfo();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Award className={`w-6 h-6 ${info.color}`} />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {info.title}
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{info.description}</p>
    </div>
  );
};

export default ScholarshipInfo;