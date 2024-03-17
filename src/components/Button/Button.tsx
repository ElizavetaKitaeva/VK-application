import { FC } from 'react';
import './Button.css';

interface ButtonProps {
  className: string;
  handleClick?: () => void;
  name: string;
}

const Button: FC<ButtonProps> = ({handleClick, className, name}) => {
  return (
    <button 
      className={className} 
      onClick={() => {
        handleClick && handleClick();
      }}>
      {name}
    </button>
  );
}

export default Button;