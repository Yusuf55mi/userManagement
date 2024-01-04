// components/AppBar.tsx
import React from 'react';
import StyledButton from './Buttons';
import styled from 'styled-components';

interface AppBarProps {
  onNewClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const Title = styled.h1`
  color: white;
  font-weight: bold;
  margin: 5px;
  float: left;
  margin-left: 3%;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-right: 20px;
  float: right;
  gap: 10px;
  width: 30%;
`;

const AppBar: React.FC<AppBarProps> = ({ onNewClick, onEditClick, onDeleteClick }) => {
  return (
    
    <div className="appBar" style={{ backgroundColor: '#001f3f', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '50px' }}>
    <Title>User Management</Title>
    <ButtonContainer>
      <StyledButton onClick={onNewClick} primary="new" as="button">
        New
      </StyledButton>
      <StyledButton onClick={onEditClick} primary="update" as="button">
        Edit
      </StyledButton>
      <StyledButton onClick={onDeleteClick} primary="delete" as="button">
        Delete
      </StyledButton>
      </ButtonContainer>
    </div>
  );
};

export default AppBar;
