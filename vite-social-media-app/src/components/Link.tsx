import React, { AnchorHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge'
import { useRouter } from '../hooks/useRouter';


interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    ({ 
    className, 
    children, 
    href,
    ...props
    }, ref) => {

  const router = useRouter()

  const handleClick = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    router.push(href!)
  }

  return (
    <a 
    className={twMerge('', className)}
    {...props}
    ref={ref}
    href={href}
    onClick={handleClick}
    >
      { children }
    </a>
  );
});

Link.displayName = 'Link'

export default Link

