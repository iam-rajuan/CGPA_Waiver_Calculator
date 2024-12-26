import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Department, TuitionCalculation } from '../types';
import { departments } from '../utils/departmentData';
import { calculateScholarshipPercentage } from '../utils/scholarshipCalculator';

interface TuitionCalculatorProps {
  isDarkMode: boolean;
}

const TuitionCalculator: React.FC<TuitionCalculatorProps> = ({ isDarkMode }) => {
  const [sscGpa, setSscGpa] = useState<string>('');
  const [hscGpa, setHscGpa] = useState<string>('');
  const [calculations, setCalculations] = useState<TuitionCalculation[]>([]);

  const calculateTuition = () => {
    const sscGpaNum = parseFloat(sscGpa);
    const hscGpaNum = parseFloat(hscGpa);

    if (!sscGpaNum || !hscGpaNum || sscGpaNum > 5 || hscGpaNum > 5) {
      alert('Please enter valid GPA values (0-5)');
      return;
    }

    const scholarshipPercentage = calculateScholarshipPercentage(sscGpaNum, hscGpaNum);

    const newCalculations = departments.map(dept => {
      const totalTuition = dept.perCreditFee * dept.totalCredits;
      const discount = (totalTuition * scholarshipPercentage) / 100;
      const tuitionAfterDiscount = totalTuition - discount;
      
      const perSemesterCredits = dept.totalCredits / dept.totalSemesters;
      const perSemesterAmount = tuitionAfterDiscount / dept.totalSemesters;

      return {
        department: dept,
        scholarshipPercentage,
        totalFees: tuitionAfterDiscount + 
                  (dept.registrationFee * dept.totalSemesters) + 
                  dept.admissionFee + 
                  (dept.libraryFee * dept.totalSemesters) + 
                  (dept.otherFees * dept.totalSemesters) + 
                  dept.psdFee,
        semesterlyBreakdown: {
          beforeCourse: perSemesterAmount * 0.4,
          beforeMid: perSemesterAmount * 0.3,
          beforeFinal: perSemesterAmount * 0.3
        }
      };
    });

    setCalculations(newCalculations);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Tuition Fee Calculator
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              SSC GPA
            </label>
            <input
              type="number"
              value={sscGpa}
              onChange={(e) => setSscGpa(e.target.value)}
              step="0.01"
              min="0"
              max="5"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter SSC GPA (0-5)"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              HSC GPA
            </label>
            <input
              type="number"
              value={hscGpa}
              onChange={(e) => setHscGpa(e.target.value)}
              step="0.01"
              min="0"
              max="5"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter HSC GPA (0-5)"
            />
          </div>
        </div>

        <button
          onClick={calculateTuition}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Calculate Fees
        </button>
      </div>

      {calculations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Program</th>
                <th className="px-4 py-2 text-right">Credits</th>
                <th className="px-4 py-2 text-right">Per Credit</th>
                <th className="px-4 py-2 text-right">Scholarship</th>
                <th className="px-4 py-2 text-right">Total Fee</th>
                <th className="px-4 py-2 text-right">Per Semester</th>
              </tr>
            </thead>
            <tbody>
              {calculations.map((calc, index) => (
                <tr key={index} className="border-t dark:border-gray-600">
                  <td className="px-4 py-2">{calc.department.name}</td>
                  <td className="px-4 py-2 text-right">{calc.department.totalCredits}</td>
                  <td className="px-4 py-2 text-right">${calc.department.perCreditFee}</td>
                  <td className="px-4 py-2 text-right">{calc.scholarshipPercentage}%</td>
                  <td className="px-4 py-2 text-right">${calc.totalFees.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">
                    ${(calc.totalFees / calc.department.totalSemesters).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TuitionCalculator;