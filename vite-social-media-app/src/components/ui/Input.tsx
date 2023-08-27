import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ 
    className, 
    ...props
    }, ref) => {

  return (
    <input 
    className={twMerge(`
    px-4
    py-4
    rounded-md
    focus:outline-midnight
    bg-charcoal
    w-full
    text-white
    
    `, className)}
    {...props}
    ref={ref}
    />
  );
});

Input.displayName = 'Input'

export default Input

