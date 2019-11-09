import React, {Component} from "react";
import {apiAppCall} from "../../services/api";
import { FormGroup, ControlLabel } from "react-bootstrap";
import Select from "react-select";
import "react-select/dist/react-select.css";

class FacultySelect extends Component {
    constructor(props){
        super(props);
        this.state = {
            option: []
        };
    }

    async componentDidMount() {
        const faculty = await apiAppCall("get", "/api/faculties");
        let options = faculty.map(val => ({value: val._id, label: val.name}));
        this.setState({options});
    }

    render() {
        return (
            <FormGroup>
                <ControlLabel>Faculty</ControlLabel>
                <Select
                    placeholder="Please select Faculty"
                    name="faculty"
                    value={this.props.faculty}
                    options={this.state.options}
                    onChange={this.props.getFa}
                />
            </FormGroup>
        )
    }
}

export default FacultySelect;
