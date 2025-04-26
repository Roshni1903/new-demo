import React from "react";
const FormUi = (element, data, error, handleChange) => {
  switch (element.type) {
    case "email": {
      return (
        <>
          <b>
            <label key={element.label}>{element.label} </label>
          </b>
          <input
            name={element.name}
            type={element.type}
            value={data[element.name]}
            onChange={(e) => handleChange(e)}
          ></input>
          {error[element.name] ? (
            <ErrorContainer error={error[element.name]} />
          ) : null}
        </>
      );
    }
    case "password": {
      return (
        <>
          <b>
            <label key={element.label}>{element.label} </label>
          </b>
          <input
            name={element.name}
            type={element.type}
            value={data[element.name]}
            onChange={(e) => handleChange(e)}
          ></input>
          {error[element.name] ? (
            <ErrorContainer error={error[element.name]} />
          ) : null}
        </>
      );
    }
    case "text": {
      return (
        <>
          <b>
            <label key={element.label}>{element.label} </label>
          </b>
          <input
            name={element.name}
            type={element.type}
            value={data[element.name]}
            onChange={(e) => handleChange(e)}
          ></input>
          {error[element.name] ? (
            <ErrorContainer error={error[element.name]} />
          ) : null}
        </>
      );
    }
    case "select": {
      return (
        <>
          <b>
            <label>{element.label}</label>
          </b>
          <select
            name={element.name}
            value={data[element.name]}
            onChange={(e) => handleChange(e)}
          >
            {Object.entries(element.optionValue).map(([_, param]) => (
              <option value={param.value}>{param.label}</option>
            ))}
          </select>
          {error[element.name] ? (
            <ErrorContainer error={error[element.name]} />
          ) : null}
        </>
      );
    }
  }
};
const ErrorContainer = ({ error }) => {
  if (error) {
    return <span style={{ color: "red" }}>{error}</span>;
  } else {
    return null;
  }
};
export default FormUi;
