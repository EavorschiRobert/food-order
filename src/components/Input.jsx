import React from 'react'

function Input({label, id, handleChange, ...props}) {
  return (
    <span>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...props} onChange={(e) => handleChange(e.target.value, id)}/>
    </span>
  )
}

export default Input