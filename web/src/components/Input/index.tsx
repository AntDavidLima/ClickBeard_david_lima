import { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="bg-gray-800 rounded-lg p-2 w-full focus:outline outline-amber-600 outline-2"
    />
  );
}
