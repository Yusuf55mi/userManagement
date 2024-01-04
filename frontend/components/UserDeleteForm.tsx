import React, { useState } from 'react';

interface UserDeleteFormProps {
  onFormSubmit: (id: number, name: string | null, surname: string | null, email: string | null) => void;
}

const UserDeleteForm: React.FC<UserDeleteFormProps> = ({ onFormSubmit }) => {
  const [id, setId] = useState<number | null>(null);

  const handleFormSubmit = () => {
    if (id !== null) {
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
