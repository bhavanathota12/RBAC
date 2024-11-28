
const express = require('express');
const fs = require('fs');
const router = express.Router();

const dataPath = './data/roles.json';

// Helper to read data
const readData = () => JSON.parse(fs.readFileSync(dataPath));

// Get All Roles
router.get('/', (req, res) => {
    const roles = readData();
    res.json(roles);
});

// Add a Role
router.post('/', (req, res) => {
    const roles = readData();
    const newRole = { id: Date.now(), ...req.body };
    roles.push(newRole);
    fs.writeFileSync(dataPath, JSON.stringify(roles));
    res.json(newRole);
});

// Update Role Permissions
router.put('/:id', (req, res) => {
    const roles = readData();
    const index = roles.findIndex((role) => role.id === parseInt(req.params.id));
    if (index !== -1) {
        roles[index] = { ...roles[index], ...req.body };
        fs.writeFileSync(dataPath, JSON.stringify(roles));
        res.json(roles[index]);
    } else {
        res.status(404).json({ error: 'Role not found' });
    }
});

module.exports = router;
