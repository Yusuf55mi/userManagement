import React from 'react';

// User interface
interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
}

// Define interface for TableComponent
interface TableComponentProps {
  data: User[]; // Array of User objects
  onEditClick: (id: number) => void; // Callback function for edit button click
}

const TableComponent: React.FC<TableComponentProps> = ({ data, onEditClick }) => {
  // Define the columns for the table
  const columns = ['ID', 'Name', 'Surname', 'Email'];

  // Define inline styles
  const cellStyle: React.CSSProperties = {
    textAlign: 'center',
    border: '1px solid black',
    padding: '20px',
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    background: '#f2f2f2',
  };

  const tableStyle: React.CSSProperties = {
    width: '97%',
    height: '90%',
    borderCollapse: 'collapse',
    margin: '20px',
  };

  return (
    <table style={tableStyle}>
      <tbody>
        <tr>
          {columns.map((column, index) => (
            <th key={index} style={headerStyle}>
              {column}
            </th>
          ))}
        </tr>
        {data.map((user) => (
          <tr key={user.id}>
            <td style={cellStyle}>{user.id}</td>
            <td style={cellStyle}>{user.name}</td>
            <td style={cellStyle}>{user.surname}</td>
            <td style={cellStyle}>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
