import React from "react";

const FormInput = (props) => {
  let options = props.options || [];

  // General input element handler
  if (
    props.tag === "input" ||
    props.tag === "password" ||
    props.tag === "number"
  ) {
    return (
      <div className="form-group">
        {props.label && <label htmlFor={props.name}>{props.label}</label>}
        <input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          className={props.classes}
          style={props.style}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    );
  }

  // Textarea element handler
  if (props.tag === "textarea") {
    return (
      <div className="form-group">
        {props.label && <label htmlFor={props.name}>{props.label}</label>}
        <textarea
          name={props.name}
          cols="30"
          rows="7"
          placeholder={props.placeholder}
          className={props.classes}
          style={props.style}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    );
  }

  // Button element handler
  if (props.tag === "button") {
    return (
      <div className="form-group">
        <button
          className={`btn btn-theme`}
          style={props.style}
          onClick={props.onClick}
        >
          {props.val}
        </button>
      </div>
    );
  }

  // Select element handler
  if (props.tag === "select") {
    return (
      <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <select
          name={props.name}
          className="form-control first_null"
          id={props.id}
          value={props.value}
          onChange={props.onChange}
        >
          {options.map((data, index) => (
            <option key={index} value={data.value}>
              {data.text}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return null;
};

export default FormInput;
