import React, { useState } from 'react';

// Define interface for UserDeleteForm
interface UserDeleteFormProps {
  onFormSubmit: (id: number, name: string | null, surname: string | null, email: string | null) => void;
}

// UserDeleteForm component for deleting a user
const UserDeleteForm: React.FC<UserDeleteFormProps> = ({ onFormSubmit }) => {
  // State hook to manage the ID of the user to be deleted
  const [id, setId] = useState<number | null>(null);

  // Function to handle form submission for user deletion
  const handleFormSubmit = () => {
    // Check if ID is not null before triggering the delete action
    if (id !== null) {
      // Call the onFormSubmit function with the ID and null values for other fields
      onFormSubmit(id, null, null, null);
    }
  };

  return (
    <div style={{ border: '3px solid #ccc', padding: '10px', borderRadius: '8px', margin: '10%', display: 'list-item' }}>
      <label>
        <input type="number" placeholder="ID" value={id} onChange={(e) => setId(parseInt(e.target.value, 10) || null)} />
      </label>
      <br />
      <br />
      <button onClick={handleFormSubmit}>Delete</button>
    </div>
  );
};

export default UserDeleteForm;
