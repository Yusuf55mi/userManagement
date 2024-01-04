import React from 'react';

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
}

interface TableComponentProps {
  data: User[];
  onEditClick: (id: number) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({ data, onEditClick }) => {
    const columns = ['ID', 'Name', 'Surname', 'Email'];

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
