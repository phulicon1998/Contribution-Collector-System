import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// this is used to create scrollbars on windows devices like the ones from apple devices
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import HeaderLinks from "../Header/HeaderLinks.jsx";
import CollapseSideItem from "./CollapseSideItem";
import UserSideBar from "../../containers/Sidebar/UserSideBar";

import image from "../../assets/img/full-screen-image-3.jpg";
import logo from "../../logo.svg";
import {sidebarPath} from "../../contents";
import {connect} from "react-redux";
const bgImage = { backgroundImage: "url(" + image + ")" };
var ps;

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAvatar: false,
            openManageAccounts: this.activeRoute("/manage") !== "" ? true : false,
            openReports: this.activeRoute("/report") !== "" ? true : false,
            isWindows: navigator.platform.indexOf("Win") > -1 ? true : false,
            width: window.innerWidth
        };
    }

    activeRoute = (routeName) => this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";

    isOpenAvatar = () => this.setState({ openAvatar: !this.state.openAvatar });

    updateDimensions = () => this.setState({ width: window.innerWidth });

    componentDidMount() {
        this.updateDimensions();
        // add event listener for windows resize
        window.addEventListener("resize", this.updateDimensions.bind(this));
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
                suppressScrollX: true,
                suppressScrollY: false
            });
        }
    }

    componentDidUpdate() {
        if (navigator.platform.indexOf("Win") > -1) {
            setTimeout(() => {
                ps.update();
            }, 350);
        }
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }

    checkRole = (code) => {
        if(code && code.length > 0){
            const {isAuthenticated, user} = this.props;
            if(isAuthenticated){
                return user.roles.some(val => code.indexOf(val.code) !== -1);
            }
            return code.indexOf("005") !== -1;
        }
        return true;
    }

    render() {
        const {user} = this.props;
        return (
            <div className="sidebar" data-color="black" data-image={image}>
                <div className="sidebar-background" style={bgImage} />
                <div className="logo">
                    <a href="https://www.creative-tim.com" className="simple-text logo-mini">
                        <div className="logo-img">
                            <img src={logo} alt="react-logo" />
                        </div>
                    </a>
                    <a className="simple-text logo-normal">Uni Magazine</a>
                </div>
                <div className="sidebar-wrapper" ref="sidebarWrapper">
                    <UserSideBar
                        hdlClick={this.isOpenAvatar}
                        caretClass={this.state.openAvatar ? "caret rotate-180" : "caret"}
                        isCollapsed={this.state.openAvatar}
                    />
                    <ul className="nav">
                        {this.state.width <= 992 ? <HeaderLinks /> : null}
                        {sidebarPath.map((prop, key) => {
                            if(this.checkRole(prop.code)){
                                var st = {
                                    [prop["state"]]: !this.state[prop.state]
                                };
                                if(!prop.condition || (prop.condition && prop.condition(user))){
                                    if (prop.collapse) {
                                        return <CollapseSideItem
                                            activeRoute={this.activeRoute}
                                            prop={prop}
                                            onClick={() => this.setState(st)} caretClass={this.state[prop.state] ? "caret rotate-180" : "caret"}
                                            isCollapsed={this.state[prop.state]}
                                            key={key}
                                        />
                                    } else {
                                        if (prop.redirect) {
                                            return null;
                                        } else {
                                            return (
                                                <li className={this.activeRoute(prop.path)} key={key}>
                                                <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                <i className={prop.icon} />
                                                <p>{prop.name}</p>
                                                </NavLink>
                                                </li>
                                            );
                                        }
                                    }
                                }
                            }
                            return null;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapState(state){
    return {
        user: state.user.data,
        isAuthenticated: state.user.isAuthenticated
    }
}

export default connect(mapState, null)(Sidebar);
