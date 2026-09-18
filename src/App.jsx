import React, { useState, useEffect } from 'react';
import { GraduationCap, UserPlus, Search, BarChart3 } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { studentsAPI } from './services/api';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import ResultForm from './components/ResultForm';
import StudentCard from './components/StudentCard';
import StudentDetails from './components/StudentDetails';
import StudentDashboard from './components/StudentDashboard';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showResultForm, setShowResultForm] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingResult, setEditingResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [error, setError] = useState('');

  // Fetch students from backend
  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);
      const data = await studentsAPI.getAll();
      setStudents(data.students);
    } catch (err) {
      setError('Failed to load students. Is the backend running?');
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (studentData) => {
    try {
      const data = await studentsAPI.create(studentData);
      setStudents([...students, data.student]);
      setShowStudentForm(false);
    } catch (err) {
      alert('Failed to add student: ' + err.message);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await studentsAPI.delete(studentId);
      setStudents(students.filter((s) => s._id !== studentId));
    } catch (err) {
      alert('Failed to delete student: ' + err.message);
    }
  };

  const handleAddResult = async (studentId, resultData) => {
    try {
      const data = await studentsAPI.addResult(studentId, resultData);
      setStudents(students.map((s) => (s._id === studentId ? data.student : s)));
      setShowResultForm(false);
      setSelectedStudent(null);
    } catch (err) {
      alert('Failed to add result: ' + err.message);
    }
  };

  const handleUpdateResult = async (studentId, resultId, resultData) => {
  try {
    const data = await studentsAPI.updateResult(
      studentId,
      resultId,
      resultData
    );

    setStudents(
      students.map((s) =>
        s._id === studentId ? data.student : s
      )
    );

    setShowResultForm(false);
    setEditingResult(null);
    setSelectedStudent(null);
  } catch (err) {
    alert('Failed to update result: ' + err.message);
  }
};

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };

  const openResultForm = (student) => {
    setSelectedStudent(student);
    setShowResultForm(true);
  };

  const handleEditResult = (student, result) => {
  setSelectedStudent(student);
  setEditingResult(result);
  setShowStudentDetails(false);
  setShowResultForm(true);
};

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalStudents: students.length,
    studentsWithResults: students.filter((s) => s.results?.length > 0).length,
    totalExams: students.reduce((sum, s) => sum + (s.results?.length || 0), 0),
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pb-8">

        {/* Page Title */}
        <div className="text-center mb-10 animate-slide-up">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-4 rounded-2xl shadow-2xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            School Result Tracker
          </h1>
          <p className="text-slate-400 text-lg">
            Manage student information and track academic performance
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Students', value: stats.totalStudents, color: 'blue', icon: GraduationCap },
            { label: 'With Results', value: stats.studentsWithResults, color: 'violet', icon: BarChart3 },
            { label: 'Total Exams', value: stats.totalExams, color: 'purple', icon: BarChart3 },
          ].map((stat, i) => (
            <div key={i} className="card p-6 animate-slide-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                  <p className={`text-3xl font-display font-bold text-${stat.color}-400`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`bg-${stat.color}-500/20 p-3 rounded-xl`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Add */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, class, or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <button
            onClick={() => setShowStudentForm(true)}
            className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <UserPlus className="w-5 h-5" />
            Add Student
          </button>
        </div>

        {/* Students Grid */}
        {loadingStudents ? (
          <div className="card p-12 text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-400 animate-pulse" />
            <p className="text-slate-400">Loading students...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="card p-12 text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-display font-bold text-slate-300 mb-2">
              {searchQuery ? 'No students found' : 'No students yet'}
            </h3>
            <p className="text-slate-400 mb-6">
              {searchQuery ? 'Try a different search' : 'Get started by adding your first student'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowStudentForm(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Add Your First Student
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, i) => (
              <div key={student._id} style={{ animationDelay: `${i * 0.1}s` }}>
                <StudentCard
                  student={student}
                  onAddResult={openResultForm}
                  onDelete={handleDeleteStudent}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showStudentForm && (
        <StudentForm
          onAddStudent={handleAddStudent}
          onClose={() => setShowStudentForm(false)}
        />
      )}
      
        {showResultForm && selectedStudent && (
  <ResultForm
    student={selectedStudent}
    onAddResult={handleAddResult}
    onUpdateResult={handleUpdateResult}
    editingResult={editingResult}
    onClose={() => {
      setShowResultForm(false);
      setEditingResult(null);
      setSelectedStudent(null);
    }}
  />
)}
{showStudentDetails && selectedStudent && (
  <StudentDetails
    student={selectedStudent}
    onEditResult={handleEditResult}
    onClose={() => {
      setShowStudentDetails(false);
      setSelectedStudent(null);
    }}
  />
)}
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, currentUser, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-400 animate-pulse" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return showLogin
      ? <Login onSwitchToRegister={() => setShowLogin(false)} />
      : <Register onSwitchToLogin={() => setShowLogin(true)} />;
  }

  if (currentUser?.role === 'student') {
  return <StudentDashboard />;
}

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
