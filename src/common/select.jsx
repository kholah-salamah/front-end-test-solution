import React, { Component } from "react";
class Select extends Component {
  render() {
    const {
      name,
      onChange,
      label,
      list,
      value,
      keyField,
      valueField,
      dataType,
      error,
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          className="form-control"
          id={name}
          name={name}
          data-type={dataType}
          onChange={onChange}
          value={value}
          error={error}
        >
          <option value=""></option>
          {list.map((item) => (
            <option key={item[keyField]} value={item[keyField]}>
              {item[valueField]}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Select;
