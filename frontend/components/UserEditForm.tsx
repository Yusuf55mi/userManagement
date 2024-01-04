import React, { useState, useEffect } from 'react';

interface UserEditFormProps {
  onFormSubmit: (id: number, name: string, surname: string, email: string) => void;
  selectedUser: { id: number; name: string; surname: string; email: string } | null;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ onFormSubmit, selectedUser }) => {
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setId(selectedUser.id);
      setName(selectedUser.name);
      setSurname(selectedUser.surname);
      setEmail(selectedUser.email);
    } else {
      setId(null);
      setName('');
      setSurname('');
      setEmail('');
    }
  }, [selectedUser]);

  const handleFormSubmit = () => {
    onFormSubmit(id!, name, surname, email); // Using non-null assertion, assuming id is not null
    setId(null);
    setName('');
    setSurname('');
    setEmail('');
  };

  return (
    <div style={{ border: '3px solid #ccc', padding: '10px', borderRadius: '8px', margin: '10%', display: 'list-item' }}>
      <label>
        <input type="number"  placeholder='ID' value={id} onChange={(e) => setId(parseInt(e.target.value, 10) || null)} />
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
