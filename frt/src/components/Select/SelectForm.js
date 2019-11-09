import React, { Component } from "react";
// react component that creates a form divided into multiple steps
import StepZilla from "react-stepzilla";
import {Row, Col } from "react-bootstrap";
import Card from "../Card/Card.jsx";
import SelectData from "./SelectData";
import SelectDataView from "../../contents/SelectDataView";
import SelectSuccess from "../../contents/SelectSuccess";

const steps = [
    { name: "Choose Faculty", component: <SelectData {...SelectDataView.faculty}/> },
    { name: "Choose Lecturer", component: <SelectData {...SelectDataView.lecturer}/> },
    { name: "Completed", component: <SelectSuccess /> }
];

class SelectForm extends Component {
  render() {
    return (
        <Row>
            <Col md={8} mdOffset={2}>
              <Card
                  wizard
                  id="wizardCard"
                  textCenter
                  title="FIRST TIME TO LOGIN"
                  // category="Split a complicated flow in multiple steps"
                  content={
                      <StepZilla
                          steps={steps}
                          stepsNavigation={false}
                          nextButtonCls="btn btn-prev btn-info btn-fill pull-right btn-wd"
                          backButtonCls="btn btn-next btn-default btn-fill pull-left btn-wd"
                      />
                  }
                />
            </Col>
        </Row>
        );
    }
}

export default SelectForm;
