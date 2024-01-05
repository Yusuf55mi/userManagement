import React, { useState, useEffect } from 'react';
import AppBar from '../components/AppBar';
import TableComponent from '../components/Table';
import UserForm from '../components/UserForm';
import UserEditForm from '../components/UserEditForm';
import UserDeleteForm from '../components/UserDeleteForm';

const Home: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [isDeleteForm, setIsDeleteForm] = useState(false);

  // Fetch users from the server on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle the 'New' button click
  const handleNew = () => {
    setSelectedUser(null);
    setShowForm(true);
    setIsEditForm(false);
    setIsDeleteForm(false);
  };

  // Handle the 'Edit' button click
  const handleEdit = () => {
    setShowForm(true);
    setIsEditForm(true);
    setIsDeleteForm(false);
  };

  // Handle the 'Delete' button click
  const handleDelete = async () => {
    setShowForm(true);
    setIsEditForm(false);
    setIsDeleteForm(true);
  };

  // Handle form submissions for creating, updating, or deleting users
  const handleFormSubmit = async (id: number | null, name: string | null, surname: string | null, email: string | null) => {
    const user = { name, surname, email };

    try {
      // Check the form type and perform the corresponding action
      if (isDeleteForm && id !== null) {
        await fetch(`http://localhost:8080/api/users/${id}`, {
          method: 'DELETE',
        });
      } else {
        if (isEditForm && id !== null) {
          await fetch(`http://localhost:8080/api/users/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
        } else { // if its not edit|delete form, then it is create form
          await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
        }
      }

      // Fetch updated user data and reset form state
      fetchUsers();
      setShowForm(false);
      setIsEditForm(false);
    } catch (error) {
      console.error('Error performing action:', error);
    }
  };

  return (
    <div>
      {/* AppBar component with click handlers */}
      <AppBar onNewClick={handleNew} onEditClick={() => handleEdit()} onDeleteClick={() => handleDelete()} />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          {/* TableComponent for displaying user data */}
          <TableComponent data={users} onEditClick={handleEdit} />
        </div>
        {showForm && (
          <div style={{ flex: 0.5 }}>
            {/* Conditional rendering of different forms based on form type */}
            {isEditForm ? (
              <UserEditForm onFormSubmit={handleFormSubmit} selectedUser={selectedUser} />
            ) : isDeleteForm ? (
              <UserDeleteForm onFormSubmit={handleFormSubmit} />
            ) : (
              <UserForm onFormSubmit={handleFormSubmit} selectedUser={selectedUser} />
            )}
          </div>
        )}
      </div>
      {/* Global styles for the entire application */}
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
    </div>
  );
};

export default Home;
