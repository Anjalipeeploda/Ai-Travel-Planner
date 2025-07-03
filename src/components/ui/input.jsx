import * as React from "react";
import { cn } from "@/lib/utils"; 

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "bg-white text-black placeholder-gray-400", 
        "border border-gray-300 rounded-md",        
        "px-3 py-[0.625rem] text-sm",  
        "w-full focus:border-black focus:ring-1 focus:ring-black", 
        "outline-none",                              
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
export { Input };










