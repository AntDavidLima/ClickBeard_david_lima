import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

export const Input = forwardRef(function Input(
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      {...props}
      ref={ref}
      className="bg-gray-800 rounded-lg p-2 w-full focus:outline outline-amber-600 outline-2"
    />
  );
});
