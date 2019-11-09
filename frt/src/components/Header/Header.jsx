import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import HeaderLinkConfig from "../../containers/Header/HeaderLinkConfig";

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleMinimizeSidebar = this.handleMinimizeSidebar.bind(this);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    }

    // function that makes the sidebar from normal to mini and vice-versa
    handleMinimizeSidebar() {
        document.body.classList.toggle("sidebar-mini");
    }

    // function for responsive that hides/shows the sidebar
    mobileSidebarToggle(e) {
        document.documentElement.classList.toggle("nav-open");
    }

    render() {
        const {title} = this.props;
        return (
            <Navbar fluid>
                <div className="navbar-minimize">
                    <button
                        id="minimizeSidebar"
                        className="btn btn-default btn-fill btn-round btn-icon"
                        onClick={this.handleMinimizeSidebar}
                    >
                    <i className="fa fa-ellipsis-v visible-on-sidebar-regular" />
                    <i className="fa fa-navicon visible-on-sidebar-mini" />
                    </button>
                </div>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#pablo">{title}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={this.mobileSidebarToggle} />
                </Navbar.Header>

                {window.innerWidth > 992 ? (
                    <Navbar.Collapse>
                        <HeaderLinkConfig/>
                    </Navbar.Collapse>
                ) : null}
            </Navbar>
        );
    }
}

export default Header;
