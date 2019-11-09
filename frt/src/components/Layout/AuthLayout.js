import React, { Component } from "react";
import Footer from "../../components/Footer/Footer.jsx";
import PagesHeader from "../../components/Header/PagesHeader.jsx";
import "../../assets/css/login/login.css";

class AuthLayout extends Component {

    componentWillMount() {
        if (document.documentElement.className.indexOf("nav-open") !== -1) {
            document.documentElement.classList.toggle("nav-open");
        }
    }

    render() {
        const {bgImg} = this.props;
        return (
            <div>
                <PagesHeader/>
                <div className="wrapper wrapper-full-page mgzineBg">
                    <div className="full-page login-page" data-color="black" data-image={bgImg}>
                        <div className="content">
                            {this.props.children}
                        </div>
                        <Footer transparent />
                        <div className="full-page-background" style={{ backgroundImage: "url(" + bgImg + ")" }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthLayout;
