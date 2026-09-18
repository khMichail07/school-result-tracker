const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  addResult,
  updateResult,
  deleteResult,
  getMyResults,
} = require('../controllers/studentController');
const { protect, staffOnly } = require('../middleware/authMiddleware');

// All student routes require authentication
router.use(protect);

// Student CRUD
router.route('/')
  .get(staffOnly, getStudents)
  .post(staffOnly, createStudent);
  router.get('/my-results', getMyResults);

router.route('/:id')
  .get(staffOnly, getStudent)
  .put(staffOnly, updateStudent)
  .delete(staffOnly, deleteStudent);

// Result management
router.route('/:id/results')
  .post(staffOnly, addResult);

router.route('/:id/results/:resultId')
  .put(staffOnly, updateResult)
  .delete(staffOnly, deleteResult);

module.exports = router;