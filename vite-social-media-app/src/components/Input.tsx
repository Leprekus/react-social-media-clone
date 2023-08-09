import React, { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ 
    className, 
    ...props
    }, ref) => {





  return (
    <input 
    className={twMerge('', className)}
    {...props}
    ref={ref}
    />
  );
});

Input.displayName = 'Input'

export default Input

