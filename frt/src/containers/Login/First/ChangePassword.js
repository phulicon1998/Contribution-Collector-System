import React, {Component} from "react";
import TextBox from "../../../components/Login/First/ChangePassword/TextBox";
import {apiAppCall} from "../../../services/api";
import {connect} from "react-redux";
import "../../../assets/css/changePassword/changePassword.css";
import {logIn} from "../../../store/actions/user";
import AppLayout from "../../../components/Layout/AppLayout";

class ChangePassword extends Component {

    constructor(props){
        super(props);
        this.state = {
            password: "",
            conpassword: ""
        }
    }

    componentDidMount(){
        const {isAuth, ready, history} = this.props;
        !isAuth && history.push("/login");
        ready && history.push("/");
    }

    componentDidUpdate(){
        const {isAuth, ready, history} = this.props;
        !isAuth && history.push("/login");
        ready && history.push("/");
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    complete = async() => {
        const {password, conpassword} = this.state;
        if(password === conpassword){
            try{
                let user = await apiAppCall("put", "/api/auth/first/password", {password});
                await logIn(user.email, user.password)
                this.props.history.push("/");
            } catch(err) {
                console.log(err);
            }
        }
    }

    render(){
        const {password, conpassword} = this.state;
        return (
            <AppLayout {...this.props}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 logPassword-input">
                            <div>
                                <i className="fas fa-user-lock"></i>
                                <h1>Set New Password</h1>
                            </div>
                            <div>
                                <div>
                                    <TextBox
                                        hold="Enter new password here..."
                                        name="password"
                                        value={password}
                                        hdChange={this.handleChange}
                                        icon="fas fa-key"
                                    />
                                    <TextBox
                                        hold="Confirm new password here.."
                                        name="conpassword"
                                        value={conpassword}
                                        hdChange={this.handleChange}
                                        icon="fas fa-key"
                                    />
                                </div>
                                <div className="changePass_next">
                                    <button className="btn-fill btn-wd btn btn-info" onClick={this.complete}>Change & Next</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 logPassword-inform">
                            <h1>What is the point of this step?</h1>
                            <p>Since the password sent through mail is generated, this step allows user to conveniently change the password as they want to memorize easier and avoiding stealing account</p>
                            <p>In case you're satisfied with the current password, you are free to skip this step.</p>
                            <p>The password entered is required to have 6 or more characters, contain both letter and number.</p>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )
    }
}

const mapState = ({user}) => ({isAuth: user.isAuthenticated, email: user.data.email, viewname: user.data.viewname, ready: user.data.ready, roles: user.data.roles});

export default connect(mapState, {logIn})(ChangePassword);
