const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  obtained: {
    type: Number,
    required: true,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 1,
  },
});

const resultSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
    trim: true,
  },
  examDate: {
    type: Date,
    required: true,
  },
  subjects: [subjectSchema],

createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
},

createdAt: {
  type: Date,
  default: Date.now,
},
});

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    class: {
      type: String,
      required: [true, 'Class is required'],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    results: [resultSchema],

user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  unique: true,
  sparse: true,
},

// Track which user created this student
createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
},
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;


