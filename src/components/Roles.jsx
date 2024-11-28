import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, TextField } from '@mui/material';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', permissions: '' });

  useEffect(() => {
    fetch('http://localhost:3001/roles')
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  const handleAddRole = () => {
    fetch('http://localhost:3001/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      setRoles([...roles, formData]);
      setOpen(false);
    });
  };

  return (
    <div>
      <h2>Roles</h2>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Role
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role Name</TableCell>
            <TableCell>Permissions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: 20, backgroundColor: '#fff', margin: '20px auto', width: '300px' }}>
          <TextField
            label="Role Name"
            fullWidth
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Permissions"
            fullWidth
            onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
          />
          <Button variant="contained" onClick={handleAddRole}>
            Add
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Roles;
