import React from "react";
// FormInput Area
const FormInput = (props) => {
  const { label, type, tag, name, id, placeholder, classes, val } = props;
  let options = props.options || [];
  return (
    <>
      <div className="form-group">
        {label && <label for={name}>{label}</label>}
        {tag === "input" && (
          <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            className={classes}
            required
          />
        )}
        {tag === "textarea" && (
          <textarea
            name={name}
            cols="30"
            rows="7"
            id={id}
            placeholder={placeholder}
            className={classes}
            required
          />
        )}
        {tag === "password" && (
          <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className={classes}
          />
        )}
        {tag === "number" && (
          <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className={classes}
          />
        )}
        {tag === "button" && <button className={`btn btn-theme`}>{val}</button>}
        {tag === "select" && (
          <select className="form-control first_null" id="city">
            {options.map((data, index) => (
              <option key={index} value={data.value}>
                {data.text}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default FormInput;
