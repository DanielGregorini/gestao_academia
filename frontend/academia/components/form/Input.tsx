'use client'
import React, { ChangeEvent, FC } from "react";

interface InputProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  type?: string;
}

const Input: FC<InputProps> = ({
  id,
  value,
  onChange,
  required = false,
  className = "",
  placeholder = "",
  type = "text",
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className={`${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;