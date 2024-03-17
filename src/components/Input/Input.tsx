import { FC } from 'react';
import { Path, UseFormRegister } from "react-hook-form"
import './Input.css';

interface IFormValues {
  "name": string;
}

type InputProps = {
  setValue: (e: string) => void;
  onChange: (e: string) => void;
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  className: string;
  placeholder: string;
  clearOutput: () => void;
  value: string;
}

let timer = 0;

const Input: FC<InputProps> = ({register, label, className, placeholder, clearOutput, setValue, value, onChange}) => {



  return (
    <input 
      {...register(label)}
      value={value}
      className={className}
      placeholder={placeholder} 
      onChange={(event) => 
        { clearOutput();
          setValue(event.target.value);
          clearTimeout(timer);
          timer = setTimeout(() => {
            if (event.target.value.length > 0) {
              onChange(event.target.value);
            }
          }, 1000);
        }
      }
      autoComplete="off"
    />
  );
}
 
export default Input;