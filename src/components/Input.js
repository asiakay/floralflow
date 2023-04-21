import React from 'react';

const Input = ({ label, type, name, value, onChange, errorMessage }) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Input;
