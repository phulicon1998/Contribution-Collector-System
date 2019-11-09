import React, { Component } from "react";
import { Row, Col, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import {apiAppCall} from "../../services/api";
import Select from "react-select";
import Button from "../CustomButton/CustomButton.jsx";
import Card from "../Card/Card.jsx";
import "../../assets/css/collection/collection.css";

class FacultyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordSelects: [],
            coordinator_id: "",
            name: "",
            desc: ""
        };
    }

    async componentDidMount() {
        const {select} = this.props;
        await this.loadFa();
        if(Object.keys(select).length > 0){
            if(select.coordinator_id) {
                const {coordSelects} = this.state;
                let {viewname, _id} = select.coordinator_id;
                this.setState({
                    coordSelects: [...coordSelects, {label: viewname, value: _id}],
                    coordinator_id: _id,
                    name: select.name,
                    desc: select.desc
                });
            } else {
                this.setState({
                    name: select.name,
                    desc: select.desc
                })
            }
        }
    }

    loadFa = async() => {
        let {notify} = this.props;
        try {
            let rs = await apiAppCall("get", "/api/coordinators/unassign");
            let coordSelects = rs.map(val => ({
                label: val.viewname,
                value: val._id
            }))
            this.setState({coordSelects});
        } catch(err) {
            return notify("error", "The data cannot loaded. Please try again.");
        }
    }

    selectCoord = (coord) => {
        this.setState({coordinator_id: coord ? coord.value : ""});
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async() => {
        const {notify, toggleForm, select} = this.props;
        const {coordinator_id, name, desc} = this.state;
        const isUpdate = Object.keys(select).length > 0;
        let fa = {name, desc, coordinator_id: coordinator_id ? coordinator_id : undefined};
        try{
            if(name !== ""){
                await apiAppCall(isUpdate ? "put" : "post", `/api/faculties${isUpdate ? "/"+select._id : ""}`, fa);
                notify("success", "Adding new data successfully!");
                return toggleForm(true);
            }
            return notify("error", "Please enter required information.");
        }catch(err){
            notify("error", "Adding new data has some problems. Please try again.");
        }
    }

    render() {
        const {desc, coordinator_id, name, coordSelects} = this.state;
        const {toggleForm} = this.props;
        return (
            <Card
                title="Add"
                content={
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Faculty name</ControlLabel>
                                <FormControl
                                    placeholder="Enter faculty name"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Select coordinators</ControlLabel>
                                <Select
                                    placeholder="Coordinator name"
                                    value={coordinator_id}
                                    options={coordSelects}
                                    onChange={this.selectCoord}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                            <FormGroup className="desc-area">
                                <ControlLabel>Description</ControlLabel>
                                <textarea
                                    placeholder="Enter some descriptions"
                                    rows="5"
                                    name="desc"
                                    value={desc}
                                    onChange={this.handleChange}
                                >
                                    Enter some description
                                </textarea>
                            </FormGroup>
                        </Col>
                        <Col md={12} className="buttons-with-margin">
                            <Button bsStyle="default" pullRight fill wd onClick={toggleForm}>Cancel</Button>
                            <Button bsStyle="primary" pullRight fill wd onClick={this.handleSubmit}>Create</Button>
                        </Col>
                    </Row>
                }
            />
        );
    }
}

export default FacultyForm;
