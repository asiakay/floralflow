import React from 'react';

const TextArea = ({ label, name, value, onChange, errorMessage }) => {
  return (
    <div className="textarea-container">
      <label htmlFor={name}>{label}</label>
      <textarea name={name} id={name} value={value} onChange={onChange} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default TextArea;
