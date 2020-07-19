import React from "react";
import Form from "../common/form";
import joi from "joi-browser";
import getConditions, {
  getCredentials,
  getOperators,
} from "../services/fakeMenuService";

import RuleComponent from "./ruleComponent";

class ModalForm extends Form {
  state = {
    data: {
      title: "",
      itemId: 1,
      precentage: 16,
    },

    errors: {},
    conditions: [],
    credentials: [],
    operators: [],

    rules: [],
  };
  componentDidMount() {
    const conditions = getConditions();
    const credentials = getCredentials();
    const operators = getOperators();

    this.setState({
      conditions,
      credentials,
      operators,
    });
  }

  schema = {
    title: joi.string().required(),
    itemId: joi.number().integer().required(),
    precentage: joi.number().integer().required().max(100),
  };

  doSubmit = () => {
    // call server
    console.log("form is confirmed");
  };

  handleAddRule = (ruleState) => {
    let cloned = [...this.state.rules];
    cloned.push(ruleState);
    this.setState({ rules: cloned });
  };

  render() {
    const { conditions, credentials, operators, rules } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmmit}>
          {this.renderinput("title", "Revenue Group Title", "text")}
          <div className="row conditionsContainer">
            <div className="col-1 textAlignment">
              <p className="paragraphStyle">if</p>
            </div>
            <div className="col-2 padding">
              {this.renderSelect(
                "itemId",
                "",
                "_id",
                "name",
                "number",
                conditions
              )}
            </div>
            <div className="col">
              <p className="paragraphStyle">of the below conditions are met</p>
            </div>
          </div>
          <RuleComponent
            credentials={credentials}
            operators={operators}
            onAddRule={this.handleAddRule} //output the RuleComponent state clone
          />

          {rules.length > 0 &&
            rules.map((rule) => (
              <RuleComponent
                credentials={credentials}
                operators={operators}
                rule={rule}
                onAddRule={this.handleAddRule} //output the RuleComponent state clone
              />
            ))}

          <div className="row conditionsContainer">
            <div className="col-2 textAlignment">
              <p className="paragraphStyle">then revenue</p>
            </div>
            <div className="col-2 padding">
              {this.renderinput("precentage", "", "number")}
            </div>
          </div>
          {this.renderButton("confirm")}
          <button
            type="button"
            className="btn btn-secondary cancel-button-style"
          >
            Cancel
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ModalForm;
