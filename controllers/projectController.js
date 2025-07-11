const db = require('../models/db');

// 1. Create project
exports.createProject = (req, res) => {
  const { user_id, title, description, budget, status = "open" } = req.body;

  const sql = `
    INSERT INTO project (userId, title, description, budget, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, title, description, budget, status], (err, result) => {
    if (err) {
      console.error('❌ Error creating project:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: '✅ Project created', projectId: result.insertId });
  });
};

// 2. Get all projects
exports.getAllProjects = (req, res) => {
  const sql = 'SELECT * FROM project';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching projects:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
};

// 3. Get project by ID
exports.getProjectById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM project WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('❌ Error fetching project:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(results[0]);
  });
};

// 4. Update project by ID
exports.updateProjectById = (req, res) => {
  const { id } = req.params;
  const { title, description, budget, status } = req.body;

  const sql = `
    UPDATE project
    SET title = ?, description = ?, budget = ?, status = ?
    WHERE id = ?
  `;

  db.query(sql, [title, description, budget, status, id], (err, result) => {
    if (err) {
      console.error('❌ Error updating project:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: '✅ Project updated successfully' });
  });
};

// 5. Delete project by ID
exports.deleteProjectById = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM project WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting project:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: '✅ Project deleted successfully' });
  });
};
