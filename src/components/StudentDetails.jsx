import React from 'react';
import {
  X,
  Calendar,
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  Pencil,
} from 'lucide-react';
import { calculatePercentage, calculateGrade, getGradeColor, formatDate } from '../utils/helpers';

const StudentDetails = ({ student, onClose, onEditResult }) => {
  const getResultStats = (result) => {
    let totalObtained = 0;
    let totalMax = 0;
    result.subjects.forEach((subject) => {
      totalObtained += subject.obtained;
      totalMax += subject.total;
    });
    const percentage = calculatePercentage(totalObtained, totalMax);
    const grade = calculateGrade(percentage);
    return { percentage, grade, totalObtained, totalMax };
  };

  const getOverallStats = () => {
    if (!student.results || student.results.length === 0) return null;
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
    return { percentage, grade, totalObtained, totalMax };
  };

  const overallStats = getOverallStats();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
      <div className="card max-w-4xl w-full p-6 my-8 animate-slide-up max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-start mb-6 sticky top-0 bg-slate-900/95 backdrop-blur-sm pb-4 -mt-6 -mx-6 px-6 pt-6 z-10">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">{student.name}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {student.class}
              </span>
              <span>Roll: {student.rollNumber}</span>
              {student.email && <span>{student.email}</span>}
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Overall Stats */}
        {overallStats && (
          <div className="bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-display font-bold">Overall Performance</h3>
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
                <div className={`grade-badge inline-block ${getGradeColor(overallStats.grade)} mt-1`}>
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

          {!student.results || student.results.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No results added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {student.results.map((result) => {
                const stats = getResultStats(result);
                return (
                  // Use result._id from MongoDB
                  <div key={result._id} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-display font-bold text-slate-100 mb-1">
                          {result.examName}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Calendar className="w-4 h-4" />
                          {formatDate(result.examDate)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`grade-badge ${getGradeColor(stats.grade)} mb-2`}>
                          {stats.grade}
                        </div>
                        <p className="text-2xl font-display font-bold text-blue-400">
                          {stats.percentage}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {result.subjects.map((subject, subIndex) => {
                        const subjectPercentage = calculatePercentage(subject.obtained, subject.total);
                        return (
                          <div key={subIndex} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                            <span className="font-medium text-slate-200">{subject.name}</span>
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
  <div className="flex items-center gap-3">
    <span className="text-sm text-slate-400">Total</span>
<button
  type="button"
  onClick={() => onEditResult(student, result)}
  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
>
  <Pencil className="w-4 h-4" />
  Edit
</button>
  </div>

  <span className="font-display font-bold text-lg text-slate-200">
    {stats.totalObtained}/{stats.totalMax}
  </span>
</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
