import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, TrendingUp, Award, BookOpen, FileText } from 'lucide-react';
import { studentAPI } from '../services/api';
import {
  calculatePercentage,
  calculateGrade,
  getGradeColor,
  formatDate,
} from '../utils/helpers';

const StudentDashboard = () => {
  const { logout } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await studentAPI.getMyResults();
        setStudent(data.student);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <div>Loading your results...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getOverallStats = () => {
    if (!student?.results || student.results.length === 0) return null;

    let totalObtained = 0;
    let totalMax = 0;

    student.results.forEach((result) => {
      result.subjects.forEach((subject) => {
        totalObtained += subject.obtained;
        totalMax += subject.total;
      });
    });

    const percentage = calculatePercentage(totalObtained, totalMax);
    const grade = calculateGrade(percentage);

    return {
      percentage,
      grade,
      totalObtained,
      totalMax,
    };
  };

  const overallStats = getOverallStats();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Student Header */}
      <div className="mb-6 flex justify-between items-start">
        <h1 className="text-3xl font-display font-bold">
          Welcome, {student?.name}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-slate-400 mt-2">
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {student?.class}
          </span>

          <span>Roll: {student?.rollNumber}</span>

          {student?.email && <span>{student.email}</span>}
        </div>
      </div>

      <button
  onClick={logout}
  className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
>
  Logout
</button>

      {/* Overall Performance */}
      {overallStats && (
        <div className="bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-display font-bold">
              Overall Performance
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-slate-400 mb-1">Percentage</p>
              <p className="text-3xl font-display font-bold text-blue-400">
                {overallStats.percentage}%
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-1">Grade</p>
              <div
                className={`grade-badge inline-block ${getGradeColor(
                  overallStats.grade
                )} mt-1`}
              >
                {overallStats.grade}
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-1">Total Marks</p>
              <p className="text-2xl font-display font-bold text-slate-200">
                {overallStats.totalObtained}/{overallStats.totalMax}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-1">Exams</p>
              <p className="text-2xl font-display font-bold text-slate-200">
                {student.results.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Exam Results */}
      <div>
        <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Exam Results
        </h3>

        {student?.results?.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No results added yet</p>
          </div>
        ) : (
          <div>
            {student.results.map((result) => (
  <div
    key={result._id}
    className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 mb-4"
  >
    {(() => {
  let totalObtained = 0;
  let totalMax = 0;

  result.subjects.forEach((subject) => {
    totalObtained += subject.obtained;
    totalMax += subject.total;
  });

  const percentage = calculatePercentage(totalObtained, totalMax);
  const grade = calculateGrade(percentage);

  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-lg font-display font-bold text-slate-100 mb-1">
          {result.examName}
        </h4>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Calendar className="w-4 h-4" />
          {formatDate(result.examDate)}
        </div>
        {result.createdBy?.name && (
  <div className="text-sm text-slate-400 mt-1">
    Added by: {result.createdBy.name}
  </div>
)}
      </div>

      <div className="text-right">
        <div className={`grade-badge ${getGradeColor(grade)} mb-2`}>
          {grade}
        </div>

        <p className="text-2xl font-display font-bold text-blue-400">
          {percentage}%
        </p>
      </div>
    </div>
  );
})()}
    

    <div className="space-y-2">
      {result.subjects.map((subject, subIndex) => {
        const subjectPercentage = calculatePercentage(
          subject.obtained,
          subject.total
        );

        return (
          <div
            key={subIndex}
            className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3"
          >
            <span className="font-medium text-slate-200">
              {subject.name}
            </span>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-sm">
                {subject.obtained}/{subject.total}
              </span>

              <span className="font-bold text-blue-400 min-w-[60px] text-right">
                {subjectPercentage}%
              </span>
            </div>
          </div>
        );
      })}
    </div>

    <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
  <span className="text-sm text-slate-400">Total</span>

  <span className="font-display font-bold text-lg text-slate-200">
    {result.subjects.reduce(
      (sum, subject) => sum + subject.obtained,
      0
    )}
    /
    {result.subjects.reduce(
      (sum, subject) => sum + subject.total,
      0
    )}
  </span>
</div>
  </div>
))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;