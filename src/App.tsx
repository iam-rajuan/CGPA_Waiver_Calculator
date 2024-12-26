import React, { useState, useEffect } from 'react';
import { GraduationCap, PlusCircle, FileDown, Moon, Sun } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { Course, Semester } from './types';
import Navigation from './components/Navigation';
import SemesterCard from './components/SemesterCard';
import GradeTable from './components/GradeTable';
import PDFMarksheet from './components/PDFMarksheet';
import ProgressChart from './components/ProgressChart';
import ScholarshipInfo from './components/ScholarshipInfo';
import RetakeRecommendations from './components/RetakeRecommendations';
import WaiverCalculator from './components/WaiverCalculator';
import TuitionCalculator from './components/TuitionCalculator';
import CGPAPredictor from './components/CGPAPredictor';
import { calculateCGPA, calculateTotalCredits } from './utils/gradeCalculator';
import { getFeedbackMessage } from './utils/feedback';

const EMPTY_COURSE: Course = { name: '', grade: '', credits: '' };

function App() {
  const [activeTab, setActiveTab] = useState<'cgpa' | 'waiver' | 'tuition'>('cgpa');
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, courses: [{ ...EMPTY_COURSE }] },
  ]);
  const [showTable, setShowTable] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const addSemester = () => {
    setSemesters([
      ...semesters,
      { id: semesters.length + 1, courses: [{ ...EMPTY_COURSE }] },
    ]);
    toast.success('New semester added!');
  };

  const deleteSemester = (semesterId: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((sem) => sem.id !== semesterId));
      toast.success('Semester deleted');
    }
  };

  const addCourse = (semesterId: number) => {
    setSemesters(
      semesters.map((sem) =>
        sem.id === semesterId
          ? { ...sem, courses: [...sem.courses, { ...EMPTY_COURSE }] }
          : sem
      )
    );
  };

  const updateCourse = (
    semesterId: number,
    courseIndex: number,
    field: keyof Course,
    value: string
  ) => {
    setSemesters(
      semesters.map((sem) =>
        sem.id === semesterId
          ? {
              ...sem,
              courses: sem.courses.map((course, i) =>
                i === courseIndex ? { ...course, [field]: value } : course
              ),
            }
          : sem
      )
    );
  };

  const deleteCourse = (semesterId: number, courseIndex: number) => {
    setSemesters(
      semesters.map((sem) =>
        sem.id === semesterId
          ? {
              ...sem,
              courses:
                sem.courses.length > 1
                  ? sem.courses.filter((_, i) => i !== courseIndex)
                  : sem.courses,
            }
          : sem
      )
    );
  };

  const cgpa = calculateCGPA(semesters.map((sem) => sem.courses));
  const totalCredits = calculateTotalCredits(semesters.map((sem) => sem.courses));
  const hasValidCourses = semesters.some(semester => 
    semester.courses.some(course => course.name && course.grade && course.credits)
  );
  const allCourses = semesters.flatMap(sem => sem.courses);
  const feedback = getFeedbackMessage(cgpa);

  const renderContent = () => {
    switch (activeTab) {
      case 'waiver':
        return <WaiverCalculator isDarkMode={isDarkMode} />;
      case 'tuition':
        return <TuitionCalculator isDarkMode={isDarkMode} />;
      default:
        return (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Bangladeshi CGPA Calculator
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Calculate your CGPA semester by semester
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setShowTable(!showTable)}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
                >
                  {showTable ? 'Hide' : 'Show'} Grade Table
                </button>
                {hasValidCourses && (
                  <button
                    onClick={() => setShowPDF(!showPDF)}
                    className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
                  >
                    <FileDown size={16} />
                    {showPDF ? 'Hide' : 'Generate'} Marksheet
                  </button>
                )}
              </div>
            </div>

            {showTable && <GradeTable />}
            {showPDF && <PDFMarksheet semesters={semesters} />}

            {semesters.map((semester) => (
              <SemesterCard
                key={semester.id}
                semester={semester}
                onAddCourse={addCourse}
                onUpdateCourse={updateCourse}
                onDeleteCourse={deleteCourse}
                onDeleteSemester={deleteSemester}
                isDarkMode={isDarkMode}
              />
            ))}

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 mb-8">
              <button
                onClick={addSemester}
                className="flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition-colors w-full md:w-auto"
              >
                <PlusCircle size={20} />
                <span>Add Next Semester</span>
              </button>
              <div className="text-center md:text-right">
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Overall CGPA:{' '}
                  <span className="text-indigo-600 dark:text-indigo-400">{cgpa}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feedback}</p>
              </div>
            </div>

            {hasValidCourses && (
              <>
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Performance Analytics
                  </h2>
                  <ProgressChart semesters={semesters} isDarkMode={isDarkMode} />
                  <ScholarshipInfo cgpa={cgpa} />
                </div>

                <RetakeRecommendations 
                  courses={allCourses}
                  isDarkMode={isDarkMode}
                />

                <div className="mt-12">
                  <CGPAPredictor 
                    currentCGPA={cgpa} 
                    totalCredits={totalCredits}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </>
            )}
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-indigo-100 to-purple-100'
    }`}>
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        <Navigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          isDarkMode={isDarkMode} 
        />

        {renderContent()}
      </div>
    </div>
  );
}

export default App;