import React, { useState, useEffect } from "react";
import axios from "axios";

const Permission = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([
    "Read",
    "Write",
    "Update",
    "Delete",
  ]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [rolePermissions, setRolePermissions] = useState([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:3001/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setRolePermissions(role.permissions || []);
  };

  
  const handleTogglePermission = (permission) => {
    if (rolePermissions.includes(permission)) {
      setRolePermissions((prev) => prev.filter((perm) => perm !== permission));
    } else {
      setRolePermissions((prev) => [...prev, permission]);
    }
  };

  
  const handleSavePermissions = () => {
    if (selectedRole) {
      axios
        .put(`http://localhost:3001/roles/${selectedRole._id}`, {
          ...selectedRole,
          permissions: rolePermissions,
        })
        .then((response) => {
          alert("Permissions updated successfully!");
          
          setRoles((prev) =>
            prev.map((role) =>
              role._id === response.data._id ? response.data : role
            )
          );
        })
        .catch((error) => console.error("Error saving permissions:", error));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Role-Based Permissions</h2>
      <div style={{ display: "flex", gap: "20px" }}>
    
        <div>
          <h3>Roles</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {roles.map((role) => (
              <li
                key={role._id}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  background: selectedRole?._id === role._id ? "#ddd" : "#f5f5f5",
                  marginBottom: "5px",
                  borderRadius: "5px",
                }}
                onClick={() => handleRoleSelect(role)}
              >
                {role.name}
              </li>
            ))}
          </ul>
        </div>

  
        <div>
          <h3>Permissions</h3>
          {selectedRole ? (
            <div>
              <p>
                Managing permissions for role: <strong>{selectedRole.name}</strong>
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {permissions.map((permission) => (
                  <li key={permission} style={{ marginBottom: "5px" }}>
                    <label>
                      <input
                        type="checkbox"
                        checked={rolePermissions.includes(permission)}
                        onChange={() => handleTogglePermission(permission)}
                      />
                      {` ${permission}`}
                    </label>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleSavePermissions}
                style={{
                  padding: "10px 20px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Save Permissions
              </button>
            </div>
          ) : (
            <p>Please select a role to manage permissions.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Permission;
