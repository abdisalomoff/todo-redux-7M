import { forwardRef } from "react";

function Input({ type, placeholder, className, ...restProps }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={`border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 ${className}`}
      {...restProps}
    />
  );
}

export default forwardRef(Input);
