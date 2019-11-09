import React, {Component} from "react";
import HeaderLink from "../../components/Header/HeaderLinks.jsx";
import {logOut} from "../../store/actions/user";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class HeaderLinkConfig extends Component {

    handleClick = () => {
        this.props.logOut();
        this.props.history.push("/login");
    }

    render(){
        return <HeaderLink hdlClick={this.handleClick}/>
    }
}

export default connect(null, {logOut})(withRouter(HeaderLinkConfig));
