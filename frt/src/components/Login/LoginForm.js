import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";
import AuthLayout from "../Layout/AuthLayout";
import Card from "../Card/Card.jsx";
import Button from "../CustomButton/CustomButton.jsx";
import {connect} from "react-redux";
import {logIn} from "../../store/actions/user";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardHidden: true,
            email: "",
            password: ""
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleSubmit = async() => {
        const {email, password} = this.state;
        await this.props.logIn({email, password});
        this.props.history.push("/login/profile");
    }

    componentDidMount() {
        this.props.isAuth && this.props.history.push("/");
        setTimeout(function() {
            this.setState({ cardHidden: false });
        }.bind(this), 700);
    }

    componentDidUpdate() {
        this.props.isAuth && this.props.history.push("/");
    }

    render() {
        const {title, button} = this.props;
        return (
            <AuthLayout {...this.props}>
                <Grid>
                    <Row>
                        <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                            <form>
                                <Card
                                    hidden={this.state.cardHidden}
                                    textCenter
                                    title={title}
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>Email address</ControlLabel>
                                                <FormControl placeholder="Enter email" type="email" name="email" onChange={this.handleChange} value={this.state.email}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Password</ControlLabel>
                                                <FormControl placeholder="Password" type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
                                            </FormGroup>
                                        </div>
                                    }
                                    legend={
                                        <Button bsStyle="info" fill wd onClick={this.handleSubmit}>{button}</Button>
                                    }
                                    ftTextCenter
                                />
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </AuthLayout>
        );
    }
}

const mapState = ({user}) => ({isAuth: user.isAuthenticated})

export default connect(mapState, {logIn})(LoginForm);
