import React, { useEffect, useState } from 'react';
import { FileText, X, Plus, Trash2 } from 'lucide-react';

const ResultForm = ({
  student,
  onAddResult,
  onUpdateResult,
  onClose,
  editingResult = null,
}) => {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [subjects, setSubjects] = useState([
    { name: '', obtained: '', total: '' }
  ]);

  useEffect(() => {
  if (editingResult) {
    setExamName(editingResult.examName || '');

    setExamDate(
      editingResult.examDate
        ? editingResult.examDate.split('T')[0]
        : ''
    );

    setSubjects(
      editingResult.subjects?.length
        ? editingResult.subjects.map((subject) => ({
            name: subject.name,
            obtained: subject.obtained,
            total: subject.total,
          }))
        : [{ name: '', obtained: '', total: '' }]
    );
  }
}, [editingResult]);

  const addSubject = () => {
    setSubjects([...subjects, { name: '', obtained: '', total: '' }]);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validSubjects = subjects.filter(
      (s) => s.name && s.obtained && s.total
    );

    if (validSubjects.length === 0) {
      alert('Please add at least one subject with marks');
      return;
    }

    const resultData = {
  examName,
  examDate: new Date(examDate).toISOString(),  // ← ADD THIS LINE
  subjects: validSubjects.map((s) => ({
    name: s.name,
    obtained: parseFloat(s.obtained),
    total: parseFloat(s.total),
  })),
};
    if (editingResult) {
  onUpdateResult(student._id, editingResult._id, resultData);
} else {
  onAddResult(student._id, resultData);
}
    setExamName('');
    setExamDate('');
    setSubjects([{ name: '', obtained: '', total: '' }]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
      <div className="card max-w-2xl w-full p-6 my-8 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold">
  {editingResult ? 'Edit Exam Result' : 'Add Exam Result'}
</h2>
              <p className="text-sm text-slate-400">for {student.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Exam Name *
              </label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="input-field"
                placeholder="e.g., Mid-term, Final Exam"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Exam Date *
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-slate-300">
                Subjects & Marks *
              </label>
              <button
                type="button"
                onClick={addSubject}
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Subject
              </button>
            </div>

            <div className="space-y-3">
              {subjects.map((subject, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) =>
                      updateSubject(index, 'name', e.target.value)
                    }
                    className="input-field flex-1"
                    placeholder="Subject name"
                  />
                  <input
                    type="number"
                    value={subject.obtained}
                    onChange={(e) =>
                      updateSubject(index, 'obtained', e.target.value)
                    }
                    className="input-field w-24"
                    placeholder="Marks"
                    min="0"
                  />
                  <input
                    type="number"
                    value={subject.total}
                    onChange={(e) =>
                      updateSubject(index, 'total', e.target.value)
                    }
                    className="input-field w-24"
                    placeholder="Total"
                    min="1"
                  />
                  {subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="text-red-400 hover:text-red-300 p-2 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
  {editingResult ? 'Save Changes' : 'Add Result'}
</button>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultForm;
