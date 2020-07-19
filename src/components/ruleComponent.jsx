import React, { Component } from "react";
class RuleComponent extends Component {
  state = {};

  initialState = {
    selectedItemId: 1,
    selectedOperatorId: 1,
    parameters: [""],
  };

  constructor(props) {
    super(props);

    if (props.rule) {
      // for childern

      this.state = props.rule;
      //   this.state.selectedItemId = props.rule.selectedItemId;
      //   this.state.selectedOperatorId = props.rule.selectedOperatorId;
      //   this.state.parameters = props.rule.parameters;
    }

    // for parent only
    else this.state = this.initialState;
  }

  handleChange = ({ currentTarget: input }) => {
    let cloned = { ...this.state };
    cloned[input.name] = input.value;
    this.setState(cloned); // changed as an object
  };
  handleInputChange = (e, index) => {
    const { currentTarget: input } = e;
    let cloned = [...this.state.parameters];
    cloned[index] = input.value;
    this.setState({ parameters: cloned }); //chanded as an element inside an object
  };
  handleAddClick = () => {
    const cloned = [...this.state.parameters];
    cloned.push(""); //add a new element
    this.setState({ parameters: cloned });
  };
  handleRemoveClick = (index) => {
    const cloned = [...this.state.parameters];
    cloned.splice(index, 1);
    this.setState({ parameters: cloned });
  };

  handleAddRuleClick = () => {
    const { parameters, selectedItemId, selectedOperatorId } = this.state;
    this.props.onAddRule({ parameters, selectedItemId, selectedOperatorId });

    // return the parent to its initial state after copying its elements
    this.setState(this.initialState);
  };

  //  1-copy state elements(RuleParentElements)
  //   2-using spy function to push  parent elements as {,,,} to the child target array
  //   3-setState and re render the state with new childRule

  renderMinusIcon = (index) => {
    let classes =
      this.state.parameters.length - 1 !== index ? "parameter-delete-icon" : "";
    return classes;
  };
  renderAddRuleIcon() {
    let classes = this.props.rule ? "add-rule-icon" : "";
    return classes;
  }
  render(/*{ onAddRule }*/) {
    const { credentials, operators } = this.props;
    const { parameters } = this.state;

    return (
      <React.Fragment>
        <div className="row color justify">
          <div className="col-2">
            <select
              className="form-control"
              id="selectedItemId"
              name="selectedItemId"
              type="number"
              onChange={this.handleChange}
              value={this.state.selectedItemId}
              // value={rule.selectedItemId} can't be read dirctly from props, should be raised to the state
            >
              {/* <option value="" /> */}
              {credentials.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2">
            <select
              className="form-control"
              id="selectedOperatorId"
              name="selectedOperatorId"
              type="number"
              onChange={this.handleChange}
              value={this.state.selectedOperatorId}
              //   value={rule.selectedOperatorId}
            >
              {/* <option value="" /> */}
              {operators.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {parameters.map((p, index) => {
            return (
              <React.Fragment key={index}>
                <div key={index} className="parameter-container col-6 ml-auto">
                  <input
                    onChange={(e) => this.handleInputChange(e, index)}
                    id={index}
                    name={index}
                    type="text"
                    className="form-control parameterInputStyle"
                    placeholder="insert a parameter"
                    value={this.state.parameters[index]}
                  />
                  {parameters.length - 1 === index && (
                    <span>
                      <a
                        href="#"
                        onClick={this.handleAddClick}
                        className="addRuleIcon"
                      >
                        add rule
                      </a>
                    </span>
                  )}
                  {parameters.length - 1 !== index && (
                    <span>
                      <a
                        href="#"
                        onClick={() => this.handleRemoveClick(index)}
                        className="removeRoleIcon"
                      >
                        remove rule
                      </a>
                    </span>
                  )}
                </div>

                <span className={this.renderMinusIcon(index)}>
                  <i
                    className="fa fa-minus-circle iconMargin parameterDeleteIcon"
                    aria-hidden="true"
                  ></i>
                </span>

                {parameters.length - 1 !== index && (
                  <span className="parameter-delete-icon">
                    <i
                      className="fa fa-plus-circle iconMargin parameterDeleteIcon"
                      aria-hidden="true"
                    ></i>
                  </span>
                )}
              </React.Fragment>
            );
          })}

          <span className={this.renderAddRuleIcon()}>
            <i
              className="fa fa-plus-circle  iconMargin"
              aria-hidden="true"
              onClick={() => this.handleAddRuleClick()}
            ></i>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default RuleComponent;
