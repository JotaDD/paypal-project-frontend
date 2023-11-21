import React from 'react'

type InputProps = {
  label?: string
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({ label = '', ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <input {...props} />
    </div>
  )
}

export default Input
