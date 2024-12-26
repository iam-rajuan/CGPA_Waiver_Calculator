import React from 'react';

const GradeTable = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4 mb-10">
      <table className="min-w-full text-gray-600">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Marks Range</th>
            <th className="px-4 py-2 text-left">Grade</th>
            <th className="px-4 py-2 text-left">Grade Point</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="px-4 py-2">80-100</td>
            <td className="px-4 py-2">A+</td>
            <td className="px-4 py-2">4.00</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">75-79</td>
            <td className="px-4 py-2">A</td>
            <td className="px-4 py-2">3.75</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">70-74</td>
            <td className="px-4 py-2">A-</td>
            <td className="px-4 py-2">3.50</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">65-69</td>
            <td className="px-4 py-2">B+</td>
            <td className="px-4 py-2">3.25</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">60-64</td>
            <td className="px-4 py-2">B</td>
            <td className="px-4 py-2">3.00</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">55-59</td>
            <td className="px-4 py-2">B-</td>
            <td className="px-4 py-2">2.75</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">50-54</td>
            <td className="px-4 py-2">C+</td>
            <td className="px-4 py-2">2.50</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">45-49</td>
            <td className="px-4 py-2">C</td>
            <td className="px-4 py-2">2.25</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">40-44</td>
            <td className="px-4 py-2">D</td>
            <td className="px-4 py-2">2.00</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">&lt; 40</td>
            <td className="px-4 py-2">F</td>
            <td className="px-4 py-2">0.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GradeTable;