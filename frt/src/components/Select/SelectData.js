import React from "react";
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
// react component that creates a dropdown menu for selection
import Select from "react-select";
import "react-select/dist/react-select.css";

// import { selectOptions } from "../../variables/Variables.jsx";

class SelectData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailError: null,
            unit: null,
            unitError: null,
        };
    }
    isValidated() {
        this.state.unit === null
        ? this.setState({
            unitError: (
                <small className="text-danger">{this.props.validate}</small>
            )
        })
        : this.setState({ unitError: null });
        // this.state.unit !== null;
        return this.state.unit;
    }
  render() {
      const {request, title} = this.props;
      return (
      <div className="wizard-step">
        <h5 className="text-center">
          {request}
        </h5>
        <Row>
          <Col md={10} mdOffset={1}>
            <FormGroup>
              <ControlLabel>
                Your Email
              </ControlLabel>
              <FormControl
                disabled="disabled"
                type="email"
                name="email"
                placeholder="hello@creative-tim.com"
                onChange={event => this.setState({ email: event.target.value })}
              />
              {this.state.emailError}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={10} mdOffset={1}>
            <FormGroup>
              <ControlLabel>Choose Your {title} <span className="text-danger">*</span></ControlLabel>
              <Select
                name="bootstrapSelect"
                value={this.state.unit}
                options={[
                  { value: 1, label: "IT" },
                  { value: 2, label: "MBA" },
                  { value: 3, label: "ELECTRIC" },
                  { value: 4, label: "Bootstrap 4.0(beta)" }
                ]}
                onChange={value => this.setState({ unit: value })}
              />
              {this.state.unitError}
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SelectData;
