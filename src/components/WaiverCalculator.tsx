import React, { useState } from 'react';
import { RefreshCcw } from 'lucide-react';

const REGISTRATION_FEE = 16500;
const LIBRARY_IT_FEE = 1000;

const WaiverCalculator: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [creditFee, setCreditFee] = useState('');
  const [numberOfCredits, setNumberOfCredits] = useState('');
  const [waiverPercentage, setWaiverPercentage] = useState<number | 'custom'>(0);
  const [customWaiver, setCustomWaiver] = useState('');

  const calculateFees = () => {
    const creditFeeNum = parseFloat(creditFee) || 0;
    const creditsNum = parseFloat(numberOfCredits) || 0;
    const waiverPercent = waiverPercentage === 'custom' 
      ? parseFloat(customWaiver) || 0 
      : waiverPercentage;

    const totalTuition = creditFeeNum * creditsNum;
    const discount = (totalTuition * waiverPercent) / 100;
    const tuitionAfterDiscount = totalTuition - discount;
    const installment = tuitionAfterDiscount / 2;
    const semesterFee = tuitionAfterDiscount + REGISTRATION_FEE + LIBRARY_IT_FEE;

    return {
      tuitionAfterDiscount,
      installment,
      semesterFee,
    };
  };

  const fees = calculateFees();

  const reset = () => {
    setCreditFee('');
    setNumberOfCredits('');
    setWaiverPercentage(0);
    setCustomWaiver('');
  };

  const waiverOptions = [10, 20, 30, 40, 60];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Waiver Calculator
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Credit Fee
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={creditFee}
                onChange={(e) => setCreditFee(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Number of Credits
            </label>
            <input
              type="number"
              value={numberOfCredits}
              onChange={(e) => setNumberOfCredits(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Waiver Percentage
            </label>
            <div className="grid grid-cols-3 gap-2">
              {waiverOptions.map((percent) => (
                <button
                  key={percent}
                  onClick={() => setWaiverPercentage(percent)}
                  className={`py-2 rounded-lg transition-colors ${
                    waiverPercentage === percent
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {percent}%
                </button>
              ))}
              <button
                onClick={() => setWaiverPercentage('custom')}
                className={`py-2 rounded-lg transition-colors ${
                  waiverPercentage === 'custom'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Custom
              </button>
            </div>
            {waiverPercentage === 'custom' && (
              <input
                type="number"
                value={customWaiver}
                onChange={(e) => setCustomWaiver(e.target.value)}
                className="mt-2 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter custom percentage"
              />
            )}
          </div>
        </div>

        <div className="bg-gray-900 dark:bg-gray-700 rounded-xl p-6 space-y-6">
          <div>
            <p className="text-gray-400 text-sm">Tuition Fees</p>
            <p className="text-2xl text-green-400">
              ${fees.tuitionAfterDiscount.toFixed(2)}
            </p>
            <p className="text-gray-400 text-sm">after discount</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Before Mid</p>
            <p className="text-2xl text-green-400">
              ${fees.installment.toFixed(2)}
            </p>
            <p className="text-gray-400 text-sm">after discount</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Before Final</p>
            <p className="text-2xl text-green-400">
              ${fees.installment.toFixed(2)}
            </p>
            <p className="text-gray-400 text-sm">after discount</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Semester Fee</p>
            <p className="text-2xl text-green-400">
              ${fees.semesterFee.toFixed(2)}
            </p>
            <p className="text-gray-400 text-sm">inc reg & it fee</p>
          </div>

          <button
            onClick={reset}
            className="w-full mt-4 py-3 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCcw size={18} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaiverCalculator;