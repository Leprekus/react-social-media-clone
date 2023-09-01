import { TextareaHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge'


interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ 
    className, 
    onInput,
    ...props
    }, ref) => {

  return (
    <textarea 
    className={twMerge(`
    text-white
    shadow
    rounded-md
    focus:outline-slate-400
    w-full
    bg-charcoal
    resize-none
    pt-3
    px-3
    scrollbar-hide
    leading-5
    
    `, className)}
    {...props}
    ref={ref}
    onInput={(e) => {
        onInput && onInput(e)
        // Dynamically adjust the textarea's height based on its content
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
    }}
    />
  );
});

Textarea.displayName = 'Textarea'

export default Textarea

