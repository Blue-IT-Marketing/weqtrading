import React from 'react'

function Input({
        type,
        placeholder,
        name,
        className,
        onChange
    },ref){
  return (
      <input 
        ref={ref}
        type={type} 
        className={className} 
        name={name} 
        placeholder={placeholder}
        onChange = {onChange}        
        />
        )
}

const forwadedInput = React.forwardRef(Input);

export default forwadedInput;

