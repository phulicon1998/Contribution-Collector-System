import React from "react";
import {Row, Col, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import Datetime from "react-datetime";
import Button from "../CustomButton/CustomButton.jsx";
import "../../assets/css/collection/collection.css";
import Card from "../Card/Card.jsx";
import AppLayout from "../Layout/AppLayout";

function ColForm(props) {
    const {btn, title, closureDate, finalClosureDate, hdChange, hdClosure, hdFinalClosure, hdSubmit, history, description} = props;
    return (
        <AppLayout {...props}>
            <div>
                <Card
                    title="Enter Collection Information"
                    content={
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <ControlLabel>Collection Title</ControlLabel>
                                    <FormControl
                                        placeholder="Enter some title"
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={hdChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup>
                                    <ControlLabel>Closure date</ControlLabel>
                                    <Datetime
                                        inputProps={{ placeholder: "Datetime Picker Here" }}
                                        value={closureDate}
                                        onChange={hdClosure}
                                        dateFormat="MMMM Do, YYYY"
                                        timeFormat={false}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup>
                                    <ControlLabel>Final closure date</ControlLabel>
                                    <Datetime
                                        inputProps={{ placeholder: "Datetime Picker Here" }}
                                        value={finalClosureDate}
                                        onChange={hdFinalClosure}
                                        dateFormat="MMMM Do, YYYY"
                                        timeFormat={false}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <FormGroup className="col-desc-area">
                                    <ControlLabel>Collection description</ControlLabel>
                                    <textarea
                                        className="areatext"
                                        name="description"
                                        rows="7"
                                        placeholder="Enter some description"
                                        value={description}
                                        onChange={hdChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={12} className="buttons-with-margin">
                                <Button bsStyle="primary" pullRight fill wd onClick={hdSubmit}> <i className={btn.icon}/> {btn.text} </Button>
                                <Button bsStyle="default" pullRight fill wd onClick={() => history.push("/collections")}> Back to list</Button>
                            </Col>
                        </Row>
                    }
                />
            </div>
        </AppLayout>
    );
}

export default ColForm;
