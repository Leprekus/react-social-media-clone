import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ 
    className, 
    ...props
    }, ref) => {

  return (
    <button 
    className={twMerge(`
    px-4
    py-4
    rounded-md
    focus:outline-blue-500
    bg-blue-500
    active:bg-blue-600
    transition
    text-white
    w-full
    
    `, className)}
    {...props}
    ref={ref}
    />
  );
});

Button.displayName = 'Button'

export default Button

