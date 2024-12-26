import React, { useState } from 'react';
import { Target } from 'lucide-react';

interface CGPAPredictorProps {
  currentCGPA: number;
  totalCredits: number;
  isDarkMode: boolean;
}

const CGPAPredictor: React.FC<CGPAPredictorProps> = ({ 
  currentCGPA, 
  totalCredits,
  isDarkMode 
}) => {
  const [targetCGPA, setTargetCGPA] = useState<string>('');
  const [nextCredits, setNextCredits] = useState<string>('');
  const [prediction, setPrediction] = useState<string>('');

  const calculateRequiredGPA = () => {
    const targetCGPANum = parseFloat(targetCGPA);
    const nextCreditsNum = parseFloat(nextCredits);

    if (!targetCGPANum || !nextCreditsNum || targetCGPANum > 4.0) {
      setPrediction('Please enter valid values (CGPA ≤ 4.0)');
      return;
    }

    const requiredGPA = (
      (targetCGPANum * (totalCredits + nextCreditsNum) - currentCGPA * totalCredits) /
      nextCreditsNum
    );

    if (requiredGPA > 4.0) {
      setPrediction(
        `It's not possible to achieve ${targetCGPA} CGPA with the given credits. The required GPA would be ${requiredGPA.toFixed(2)}, which exceeds 4.0.`
      );
    } else if (requiredGPA < 0) {
      setPrediction(
        `Your current CGPA is already higher than your target CGPA.`
      );
    } else {
      setPrediction(
        `To achieve a CGPA of ${targetCGPA}, you need to maintain a GPA of ${requiredGPA.toFixed(2)} in your next semester.`
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          CGPA Predictor
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Target CGPA
            </label>
            <input
              type="number"
              value={targetCGPA}
              onChange={(e) => setTargetCGPA(e.target.value)}
              step="0.01"
              min="0"
              max="4"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter target CGPA (e.g., 3.75)"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Next Semester Credits
            </label>
            <input
              type="number"
              value={nextCredits}
              onChange={(e) => setNextCredits(e.target.value)}
              min="1"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter credits for next semester"
            />
          </div>

          <button
            onClick={calculateRequiredGPA}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Calculate Required GPA
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Current Status
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>Current CGPA: {currentCGPA}</p>
            <p>Total Credits Completed: {totalCredits}</p>
          </div>

          {prediction && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Prediction
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{prediction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CGPAPredictor;