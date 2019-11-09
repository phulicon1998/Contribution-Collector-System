import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel
} from "react-bootstrap";

import Card from "../Card/Card.jsx";
import Button from "../CustomButton/CustomButton.jsx";
import Select from "react-select";
import "react-select/dist/react-select.css";

class SelectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardHidden: true
        };
    }

    componentDidMount() {
        setTimeout(function() {
            this.setState({ cardHidden: false });
        }.bind(this), 700);
    }

    render() {
        const { hdlSubmit ,selectfaculty, selectlecturer} = this.props;
        return (
        <Grid>
            <div className="wizard-step">
            <h5 className="text-center">
                
            </h5>
                <Row>
                <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                        <form>
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title= "Select your faculty and lecturer"
                                content={
                                    <div>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Choose Your Faculty <span className="text-danger">*</span></ControlLabel>
                                                    <Select
                                                        name="bootstrapSelect"
                                                        value={selectfaculty}
                                                        options={[
                                                            { value: 1, label: "IT" },
                                                            { value: 2, label: "MBA" },
                                                            { value: 3, label: "ELECTRIC" },
                                                            { value: 4, label: "Bootstrap 4" }
                                                        ]}
                                                        onChange={value => this.setState({ selectfaculty: value })}
                                                        />
                                                        {/* {this.state.facultyError} */}
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <ControlLabel>Choose Your Lecturer <span className="text-danger">*</span></ControlLabel>
                                                <Select
                                                name="bootstrapSelect"
                                                value={selectlecturer}
                                                options={[
                                                    { value: 1, label: "Adam" },
                                                    { value: 2, label: "Ema" },
                                                    { value: 3, label: "John" },
                                                    { value: 4, label: "Nema" }
                                                ]}
                                                onChange={value => this.setState({ selectlecturer: value })}
                                                />
                                                {/* {this.state.lecturerError} */}
                                            </FormGroup>
                                        </Col>
                                    </div>
                                }
                                legend={
                                    <Button bsStyle="info" fill wd onClick={hdlSubmit}>Select</Button>
                                }
                                ftTextCenter
                            />
                        </form>
                    </Col>
                </Row>
            </div>
        </Grid>
      );
    }
}

export default SelectForm;


