import React from 'react';

const Select = ({ label, name, value, onChange, options, errorMessage }) => {
  return (
    <div className="select-container">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Select;
