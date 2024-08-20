'use client'
import React, { ChangeEvent, FC } from "react";

interface InputProps {
  id: string;
  value: string | number | null | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  type?: string;
  minLength?: number; // Adicionando a prop minLength
}

const Input: FC<InputProps> = ({
  id,
  value,
  onChange,
  required = false,
  className = "",
  placeholder = "",
  type = "text",
  minLength
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value ?? ''}
      onChange={onChange}
      required={required}
      className={`${className}`}
      placeholder={placeholder}
      minLength={minLength}
    />
  );
};

export default Input;