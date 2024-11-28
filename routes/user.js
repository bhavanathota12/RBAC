const express = require('express');
const fs = require('fs');
const router = express.Router();
const User = require('./models/User');

// Helper to read data
const readData = () => JSON.parse(fs.readFileSync(dataPath));

// Get All Users
router.get('/', (req, res) => {
    const users = readData();
    res.json(users);
});

// Add a User
router.post('/', (req, res) => {
    const users = readData();
    const newUser = { id: Date.now(), ...req.body };
    users.push(newUser);
    fs.writeFileSync(dataPath, JSON.stringify(users));
    res.json(newUser);
});

// Delete a User
router.delete('/:id', (req, res) => {
    let users = readData();
    users = users.filter((user) => user.id !== parseInt(req.params.id));
    fs.writeFileSync(dataPath, JSON.stringify(users));
    res.status(204).send();
});

// Create a user
app.post('/users', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newUser = new User({ name, email, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports=router;