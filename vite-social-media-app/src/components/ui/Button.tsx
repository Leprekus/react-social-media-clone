import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge'
import { cva, VariantProps } from 'class-variance-authority'

const button = cva()
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ 
    className, 
    disabled,
    ...props
    }, ref) => {

  return (
    <button 
    className={twMerge(`
    px-4
    py-4
    rounded-md
    border
    border-violet-900
    focus:outline-violet-900
    bg-violet-950/70
    text-violet-400
    active:bg-violet-950/50
    transition
    w-full
    `, 
    disabled && 'cursor-not-allowed bg-gray-400 animate-pulse',
    className)}
    {...props}
    ref={ref}
    />
  );
});

Button.displayName = 'Button'

export default Button

