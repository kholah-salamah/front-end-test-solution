import React, { Component } from "react";
import joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    // we've gotten eventObj
    let clonedErrors = { ...this.state.errors };
    const returnedFromValidation = this.validateProperty(input);
    if (returnedFromValidation)
      clonedErrors[input.name] = returnedFromValidation;
    else delete clonedErrors[input.name];

    //checking  collected input-value-type before  asigning
    let value = input.value;
    if (input.type === "number" || input.dataset.type === "number")
      value = parseInt(value);

    //note==> in Select elemet has a hidden type called "select-one" that we have frocibly set its type using data-atrributes as we have done data-type
    //we can call dataset ==> bearingObj.dataset.type
    //console.log((input.type || input.dataset.type) === "number");<==X wrong programmatically
    //console.log( parseInt(value));<== X this is wrong because we forcibly apply parsInt on the value
    //and the condition doesn't work!

    // asign value
    let cloned = { ...this.state.data };
    cloned[input.name] = value;
    this.setState({ data: cloned, errors: clonedErrors });
  };

  validation = () => {
    const fixAbortEarly = { abortEarly: false };
    const returnedFromJoiValidation = joi.validate(
      this.state.data,
      this.schema,
      fixAbortEarly
    );

    //console.log(returnedFromJoiValidation.error);

    if (!returnedFromJoiValidation.error) return null;

    const ErroRs = {};
    for (let eachItemOfDatails of returnedFromJoiValidation.error.details)
      return (ErroRs[eachItemOfDatails.path[0]] = eachItemOfDatails.message);
  };
  validateProperty = (currentTraget) => {
    const { name, value } = currentTraget;

    let objBearsSingleInput = { [name]: value };
    let schemaObj = { [name]: this.schema[name] };
    const returnedFromJoiValidation = joi.validate(
      objBearsSingleInput,
      schemaObj
    );
    // console.log(
    //   "currentTraget:",
    //   currentTraget.value,
    //   "returnedFromJoiValidation:",
    //   returnedFromJoiValidation
    // );
    const checking = returnedFromJoiValidation.error
      ? returnedFromJoiValidation.error.details[0].message
      : null;
    return checking;
  };
  handleSubmmit = (e) => {
    e.preventDefault();
    const errors = this.validation();
    console.log(errors);
    this.setState({ errors: errors || {} }); //false || true === null  || true
    if (errors) return;
    this.doSubmit();
  };

  renderinput(name, label, type = "text") {
    const { data, errors } = this.state;
    //console.log(this.state);
    return (
      <Input
        onChange={this.handleChange}
        error={errors[name]}
        value={data[name]}
        type={type}
        label={label}
        name={name}
      />
    );
  }

  renderSelect(name, label, keyField, valueField, dataType, dataList) {
    const { data, errors } = this.state;
    return (
      <Select
        label={label}
        name={name}
        dataType={dataType}
        onChange={this.handleChange} //write to state
        value={data[name]} // read only
        error={errors[name]} //wr
        list={dataList}
        keyField={keyField}
        valueField={valueField}
      />
    );
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validation()}
        className="btn btn-secondary confirm-button-style"
      >
        {label}
      </button>
    );
  }
}

export default Form;
