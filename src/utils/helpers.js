// Calculate grade based on percentage
export const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
};

// Get grade color classes
export const getGradeColor = (grade) => {
  const colors = {
    'A+': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    'A': 'bg-green-500/20 text-green-400 border border-green-500/30',
    'B+': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'B': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    'C': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    'D': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    'F': 'bg-red-500/20 text-red-400 border border-red-500/30',
  };
  return colors[grade] || colors['F'];
};

// Calculate percentage
export const calculatePercentage = (obtained, total) => {
  if (total === 0) return 0;
  return ((obtained / total) * 100).toFixed(2);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Generate student ID
export const generateStudentId = () => {
  return 'STU' + Date.now().toString().slice(-8);
};
