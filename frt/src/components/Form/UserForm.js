import React, {Component} from "react";
import {
    Row,
    Col,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import Button from "../CustomButton/CustomButton.jsx";
import Card from "../Card/Card.jsx";
import Files from "react-files";
import userForm from "../../hocs/userForm";

class UserForm extends Component {
    render() {
        const {title, fileChange, fileError, toggleForm, st, hdlChange, hdlUpdate, update} = this.props;
        const {viewname, email, profileImg} = st;
        return (
            <Card
                title={title}
                content={
                    <Row>
                        <Col md={12}>
                            <div className="editImg">
                                <div>
                                    <img src={profileImg} alt=""/>
                                    <Files
                                        onChange={fileChange}
                                        onError={fileError}
                                        accepts={["image/*"]}
                                        maxFiles={1}
                                        clickable
                                    >
                                        <div><p>Change image</p></div>
                                    </Files>
                                </div>
                            </div>
                            <FormGroup>
                                <ControlLabel>Enter name</ControlLabel>
                                <FormControl placeholder="Enter name" type="text" name="viewname" value={viewname} onChange={hdlChange}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Enter email</ControlLabel>
                                <FormControl placeholder="Enter email" type="email" name="email" value={email} onChange={hdlChange}/>
                            </FormGroup>
                            {this.props.children}
                        </Col>
                    </Row>
                }
                legend={
                    <div className="update">
                        <Button bsStyle="info" fill onClick={hdlUpdate}>{!update ? "Update Information" : <i className="fas fa-circle-notch fa-spin"></i>}</Button>
                        <Button bsStyle="default" fill onClick={toggleForm.bind(this, false)}>Cancel</Button>
                    </div>
                }
            />
        )
    }
}

export default UserForm;
export let NoFaUserForm = userForm(UserForm);
