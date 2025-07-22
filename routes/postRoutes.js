const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // 🔐 Import JWT middleware
const postController = require('../controllers/postController');

// 🔍 Get a post by ID (only for authenticated users)
router.get('/:id', auth, postController.getPostWithUser);

// 📝 Create a new post (only for authenticated users)
router.post('/', auth, postController.createPost);

module.exports = router;
