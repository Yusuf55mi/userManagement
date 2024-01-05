import React, { useState, useEffect } from 'react';

// Define interface for UserEditForm
interface UserEditFormProps {
  onFormSubmit: (id: number, name: string, surname: string, email: string) => void;
  selectedUser: { id: number; name: string; surname: string; email: string } | null;
}

// UserEditForm component for editing user details
const UserEditForm: React.FC<UserEditFormProps> = ({ onFormSubmit, selectedUser }) => {
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  // useEffect to update form inputs when selectedUser changes
  useEffect(() => {
    // If selectedUser is provided, populate form inputs with its values
    if (selectedUser) {
      setId(selectedUser.id);
      setName(selectedUser.name);
      setSurname(selectedUser.surname);
      setEmail(selectedUser.email);
    } else {
      // If selectedUser is null, reset form inputs
      setId(null);
      setName('');
      setSurname('');
      setEmail('');
    }
  }, [selectedUser]);

  // Function to handle form submission
  const handleFormSubmit = () => {
    // Call the onFormSubmit function with the form input values
    onFormSubmit(id!, name, surname, email); // Using non-null assertion, assuming id is not null

    // Reset form inputs after submission
    setId(null);
    setName('');
    setSurname('');
    setEmail('');
  };

  return (
    <div style={{ border: '3px solid #ccc', padding: '10px', borderRadius: '8px', margin: '10%', display: 'list-item' }}>
      <label>
        <input type="number" placeholder='ID' value={id} onChange={(e) => setId(parseInt(e.target.value, 10) || null)} />
      </label>
      <br />
      <br />
      <label>
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <br />
      <label>
        <input type="text" placeholder='Surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
      </label>
      <br />
      <br />
      <label>
        <input type="text" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <br />
      <button onClick={handleFormSubmit}>Save</button>
    </div>
  );
};

export default UserEditForm;
