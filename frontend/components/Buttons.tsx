// components/Buttons.tsx
import styled from 'styled-components';

interface ButtonProps {
  primary?: string;
}

const shouldForwardProp = (prop: string) => prop !== 'primary';

const buttonWidthPercentage = 30;

const StyledButton = styled.button<ButtonProps>`
  width: ${buttonWidthPercentage}%;
  padding: 10px;
  margin-right: 1%;
  cursor: pointer;
  background-color: ${(props) => (props.primary === 'delete' ? 'red' : props.primary === 'update' ? 'blue' : 'green')};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
` as React.ComponentType<ButtonProps & React.HTMLProps<HTMLButtonElement>>;

export default StyledButton;
