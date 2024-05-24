import { ChangeEvent } from "react";

type InputProps = {
  placeHolder: string;
  onChnage?: (e: ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "input" | "email" | "password";
  value: string | number;
  classes?: string;
};

const Input = ({ placeHolder, type, value, onChnage, classes }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      onChange={onChnage}
      value={value}
      className={`border-none py-1 px-2 text-bunker rounded-md  ${classes}`}
    />
  );
};

export default Input;
