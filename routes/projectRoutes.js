const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // 🛡️ JWT middleware

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById
} = require('../controllers/projectController');

// 🛠️ Create a new project (authenticated)
router.post('/create', auth, createProject);

// 📦 Get all projects (authenticated)
router.get('/', auth, getAllProjects);

// 🔍 Get project by ID (authenticated)
router.get('/:id', auth, getProjectById);

// 🔄 Update project by ID (authenticated)
router.put('/:id', auth, updateProjectById);

// ❌ Delete project by ID (authenticated)
router.delete('/:id', auth, deleteProjectById);

module.exports = router;
