import React from 'react';

const Badge = ({ variant = 'teal', icon: Icon, children}) => {
    const variants = {
        teal: "bg-teal/10 text-teal",
        amber: "bg-transparent text-amber font-semibold",
        coral: "bg-coral/10 text-coral-dark"
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${variants[variant]}`}>
          {Icon && <Icon className="w-3.5 h-3.5" />}
          {children}
        </span> 
     
    );
};        

export default Badge;


    
    
    
    
    




    





 

