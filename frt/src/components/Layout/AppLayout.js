import React, { Component } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

var ps;

class AppLayout extends Component {

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.refs.mainPanel);
        }
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }

    componentDidUpdate(e) {
        if (navigator.platform.indexOf("Win") > -1) {
            setTimeout(() => {
                ps.update();
            }, 350);
        }
        if (e.history.action === "PUSH") {
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.refs.mainPanel.scrollTop = 0;
        }
        if (
            window.innerWidth < 993 &&
            e.history.action === "PUSH" &&
            document.documentElement.className.indexOf("nav-open") !== -1
        ) {
            document.documentElement.classList.toggle("nav-open");
        }
    }

    componentWillMount() {
        if (document.documentElement.className.indexOf("nav-open") !== -1) {
            document.documentElement.classList.toggle("nav-open");
        }
    }

    render() {
        const {header} = this.props;
        return (
            <div className="wrapper">
                <Sidebar {...this.props} />
                <div className="main-panel" ref="mainPanel">
                    <Header {...header} />
                    <div className="main-content">
                        <div className="container-fluid">
                            {this.props.children}
                        </div>
                    </div>
                    <Footer fluid />
                </div>
            </div>
            );
        }
    }

export default AppLayout;
