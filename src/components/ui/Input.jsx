import React from 'react' ; 

const Input = React.forwardRef(({ className = '', ...props}, ref) => {
  return (
    <input
    ref={ref}
    className={`w-full min-h-[44px] px-4 py-2 border border-gray-200 rounded-lg bg-surface-card focus:ring-2 focus:ring-coral focus:border-transparent outline-none transition-all placeholder:text-gray-400 ${className}`}
    {...props}
    />  
  );  
});

Input.displayName = 'Input';

export default Input;



