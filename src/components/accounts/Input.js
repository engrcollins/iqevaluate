import React from "react";

const Input = ({ value, onChange, name, label, type, maxLength }) => {
  return (
    <div className="form-custumize">
      <input
        type={type}
        required
        name={name}
        value={value}
        autoComplete="off"
        onChange={(e) => onChange(e)}
        maxLength={maxLength}
      />
      <label htmlFor="name" className="label-name">
        <span className="content-name">{label}</span>
      </label>
    </div>
  );
};

export default Input;
