const Student = require('../models/student');
const User = require('../models/user');

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single student
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new student
const createStudent = async (req, res) => {
  try {
    const {
  name,
  class: studentClass,
  rollNumber,
  email,
  username,
  password,
} = req.body;

    if (!name || !studentClass || !rollNumber || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, class, roll number, username, and password',
      });
    }

   const existingUser = await User.findOne({
  username: username.toLowerCase(),
});

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: 'Username already exists',
  });
}

const user = await User.create({
  name,
  username: username.toLowerCase(),
  password,
  role: 'student',
});

const student = await Student.create({
  name,
  class: studentClass,
  rollNumber,
  email: email || '',
  results: [],
  user: user._id,
  createdBy: req.user._id,
});

    res.status(201).json({
      success: true,
      message: 'Student and login account created successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { name, class: studentClass, rollNumber, email } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, class: studentClass, rollNumber, email },
      { new: true }
    );

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: 'Student not found' });
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete student
const deleteResult = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: 'Student not found' });
    }

    const result = student.results.id(req.params.resultId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found',
      });
    }

    if (
      req.user.role !== 'admin' &&
      result.createdBy?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete results you added',
      });
    }

    student.results = student.results.filter(
      (r) => r._id.toString() !== req.params.resultId
    );

    await student.save();

    res.json({
      success: true,
      message: 'Result deleted successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add result
const addResult = async (req, res) => {
  try {
    const { examName, examDate, subjects } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: 'Student not found' });
    }

    student.results.push({
  examName,
  examDate,
  subjects,
  createdBy: req.user._id,
});
    await student.save();

    res.status(201).json({
      success: true,
      message: 'Result added successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateResult = async (req, res) => {
  try {
    const { examName, examDate, subjects } = req.body;

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    const result = student.results.id(req.params.resultId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found',
      });
    }

    if (
      req.user.role !== 'admin' &&
      result.createdBy?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit results you added',
      });
    }

    result.examName = examName;
    result.examDate = examDate;
    result.subjects = subjects;

    await student.save();

    res.json({
      success: true,
      message: 'Result updated successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 
// Delete student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: 'Student not found' });
    }

    res.json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getMyResults = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id })
  .populate('results.createdBy', 'name username');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found',
      });
    }

    res.json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  addResult,
  updateResult,
  deleteResult,
  getMyResults,
};
