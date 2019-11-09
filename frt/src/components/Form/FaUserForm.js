import React, {Component} from "react";
import { FormGroup, ControlLabel } from "react-bootstrap";
import UserForm from "./UserForm";
import userForm from "../../hocs/userForm";
import Select from "react-select";
import {apiAppCall} from "../../services/api";

class FaUserForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            fas: []
        }
    }

    async componentDidMount(){
        const {api, notify} = this.props;
        try {
            let fas = await apiAppCall("get", api.getFa);
            this.setState({fas});
        } catch(err) {
            return notify("error", "The process has some problems. Please try again");
        }
    }

    hdlSelect = (faculty) => {
        this.props.setSt({faculty_id: faculty ? faculty.value : undefined});
    }

    render() {
        const {st} = this.props;
        let listOptions = this.state.fas.map(option => ({
            value: option._id,
            label: option.name
        }));
        return (
            <UserForm {...this.props}>
                <FormGroup>
                    <ControlLabel>Select faculty</ControlLabel>
                    <Select
                        placeholder="Please select Faculty"
                        name="faculty_id"
                        value={st.faculty_id}
                        options={listOptions}
                        onChange={this.hdlSelect}
                    />
                </FormGroup>
            </UserForm>
        )
    }
}

export default userForm(FaUserForm);
