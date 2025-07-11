const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/:id', postController.getPostWithUser);
router.post('/', postController.createPost);


module.exports = router;
