const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  const { userId, title, content } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        user: { connect: { id: userId } } // assuming userId refers to existing user
      }
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get Post with User (Many-to-One)
exports.getPostWithUser = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { user: true }
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
