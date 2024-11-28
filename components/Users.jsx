import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, TextField } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = () => {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      setUsers([...users, formData]);
      setOpen(false);
    });
  };

  return (
    <div>
      <h2>Users</h2>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: 20, backgroundColor: '#fff', margin: '20px auto', width: '300px' }}>
          <TextField
            label="Name"
            fullWidth
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label="Role"
            fullWidth
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <Button variant="contained" onClick={handleAddUser}>
            Add
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
