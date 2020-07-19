import React, { Component } from "react";
import ModalForm from "./modalForm";

import $ from "jquery/dist/jquery.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

class ModalWindow extends Component {
  state = {};
  componentDidMount() {
    $("#exampleModal").modal("show");
  }

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          show Modal Window
        </button>

        <div
          className="modal fade  bd-example-modal-lg"
          id="exampleModal"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Revenue Group
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body ">
                <ModalForm />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ModalWindow;
