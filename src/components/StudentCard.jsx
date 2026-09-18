import React from 'react';
import { User, GraduationCap, Mail, FileText, Trash2, TrendingUp } from 'lucide-react';
import { calculatePercentage, calculateGrade, getGradeColor } from '../utils/helpers';

const StudentCard = ({ student, onAddResult, onDelete, onViewDetails }) => {
  const latestResult = student.results?.[student.results.length - 1];
  
  const getOverallStats = () => {
    if (!student.results || student.results.length === 0) return null;
    
    let totalObtained = 0;
    let totalMax = 0;
    
    student.results.forEach(result => {
      result.subjects.forEach(subject => {
        totalObtained += subject.obtained;
        totalMax += subject.total;
      });
    });
    
    const percentage = calculatePercentage(totalObtained, totalMax);
    const grade = calculateGrade(percentage);
    
    return { percentage, grade };
  };
  
  const stats = getOverallStats();

  return (
    <div className="card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-slide-in">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl p-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-slate-100 mb-1">
              {student.name}
            </h3>
            <div className="flex flex-col gap-1 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>{student.class}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Roll:</span>
                <span>{student.rollNumber}</span>
              </div>
              {student.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{student.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(student._id)}
          className="text-slate-400 hover:text-red-400 transition-colors p-2"
          title="Delete student"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {stats && (
        <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-300">Overall Performance</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-display font-bold text-blue-400">
                {stats.percentage}%
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {student.results.length} exam{student.results.length !== 1 ? 's' : ''} recorded
              </p>
            </div>
            <div className={`grade-badge ${getGradeColor(stats.grade)}`}>
              {stats.grade}
            </div>
          </div>
        </div>
      )}

      {latestResult && (
        <div className="bg-slate-800/30 rounded-xl p-3 mb-4 border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-2">Latest Exam</p>
          <p className="font-medium text-slate-200">{latestResult.examName}</p>
          <p className="text-xs text-slate-400 mt-1">
            {new Date(latestResult.examDate).toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onAddResult(student)}
          className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm"
        >
          <FileText className="w-4 h-4" />
          Add Result
        </button>
        <button
          onClick={() => onViewDetails(student)}
          className="btn-secondary flex-1 text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
