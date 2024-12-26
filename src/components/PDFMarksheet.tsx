import React, { useEffect, useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { Semester } from '../types';
import { calculateGPA, calculateCGPA } from '../utils/gradeCalculator';
import { getFeedbackMessage } from '../utils/feedback';
import { getRetakeCourses } from '../utils/courseAnalyzer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#1e40af',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#4b5563',
  },
  semesterTitle: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 15,
    color: '#1e40af',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  col1: {
    width: '50%',
  },
  col2: {
    width: '25%',
    textAlign: 'center',
  },
  col3: {
    width: '25%',
    textAlign: 'center',
  },
  gpaText: {
    marginTop: 10,
    textAlign: 'right',
    fontSize: 14,
    color: '#1e40af',
  },
  feedback: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    color: '#1e40af',
    fontSize: 12,
  },
  retakeSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fef2f2',
    borderRadius: 4,
  },
  retakeTitle: {
    fontSize: 14,
    color: '#991b1b',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  retakeRow: {
    flexDirection: 'row',
    marginTop: 5,
    fontSize: 10,
    color: '#991b1b',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 10,
  },
});

interface PDFMarksheetProps {
  semesters: Semester[];
}

const MarksheetDocument: React.FC<{ semesters: Semester[] }> = ({ semesters }) => {
  const cgpa = calculateCGPA(semesters.map((sem) => sem.courses));
  const feedback = getFeedbackMessage(cgpa);
  const allCourses = semesters.flatMap(sem => sem.courses);
  const retakeCourses = getRetakeCourses(allCourses);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Academic Transcript</Text>
          <Text style={styles.subtitle}>
            Generated on {new Date().toLocaleDateString()}
          </Text>
        </View>

        {semesters.map((semester) => {
          const semesterGPA = calculateGPA(semester.courses);
          const validCourses = semester.courses.filter(
            (course) => course.name && course.grade && course.credits
          );

          if (validCourses.length === 0) return null;

          return (
            <View key={semester.id}>
              <Text style={styles.semesterTitle}>
                Semester {semester.id}
              </Text>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.col1}>Subject</Text>
                  <Text style={styles.col2}>Grade</Text>
                  <Text style={styles.col3}>Credits</Text>
                </View>
                {validCourses.map((course, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.col1}>{course.name}</Text>
                    <Text style={styles.col2}>{course.grade}</Text>
                    <Text style={styles.col3}>{course.credits}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.gpaText}>
                Semester GPA: {semesterGPA}
              </Text>
            </View>
          );
        })}

        <View style={{ marginTop: 30 }}>
          <Text style={[styles.gpaText, { fontSize: 16, fontWeight: 'bold' }]}>
            Cumulative GPA (CGPA): {cgpa}
          </Text>
        </View>

        {retakeCourses.length > 0 && (
          <View style={styles.retakeSection}>
            <Text style={styles.retakeTitle}>Recommended Retake Courses:</Text>
            {retakeCourses.map((course, index) => (
              <View key={index} style={styles.retakeRow}>
                <Text style={styles.col1}>{course.name}</Text>
                <Text style={styles.col2}>{course.grade}</Text>
                <Text style={styles.col3}>{course.credits} credits</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.feedback}>{feedback}</Text>

        <Text style={styles.footer}>
          This is a computer-generated document. No signature is required.
        </Text>
      </Page>
    </Document>
  );
};

const PDFMarksheet: React.FC<PDFMarksheetProps> = ({ semesters }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <PDFDownloadLink
          document={<MarksheetDocument semesters={semesters} />}
          fileName="academic-transcript.pdf"
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          {({ loading }) =>
            loading ? 'Preparing document...' : 'Download Academic Transcript'
          }
        </PDFDownloadLink>
      </div>
    );
  }

  return (
    <PDFViewer style={{ width: '100%', height: '500px' }}>
      <MarksheetDocument semesters={semesters} />
    </PDFViewer>
  );
};

export default PDFMarksheet;