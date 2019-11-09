import React, {Component} from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {allPath} from "./contents";
import {connect} from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.1.1";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "./assets/css/emptyBox/emptyBox.css";

class Page extends Component {

    checkRole = (code) => {
        if(code && code.length > 0){
            const {user} = this.props;
            if(user.isAuthenticated){
                return user.data.roles.some(val => code.indexOf(val.code) !== -1);
            }
            return code.indexOf("005") !== -1;
        }
        return true;
    }

    checkCondition = (condition) => {
        const {user} = this.props;
        if(!condition || (condition && condition(user.data))) {
            return true;
        }
        return false;
    }

    render() {
        const {location} = this.props;
        let roleRoute = allPath.filter(route => this.checkRole(route.code));
        let permitRoute = roleRoute.filter(route => this.checkCondition(route.condition));
        return (
            <Switch>
                {
                    permitRoute.map((route, index) => {
                        if(route.collapse){
                            return route.views.map((subRoute, index) => {
                                return <Route path={subRoute.path} key={index} render={({match}) => (
                                    <subRoute.component {...this.props} {...subRoute.display} match={match}/>
                                )} />
                            })
                        } else if (route.redirect) {
                            return <Redirect exact from={route.path} to={route.pathTo} key={index} />
                        } else {
                            return <Route path={route.path} key={index} render={({match}) => (
                                <route.component {...this.props} {...route.display} match={match} />
                            )}/>
                        }
                    })
                }
                <Redirect exact from={location.pathname} to={"/home"} />
            </Switch>
        )
    }

}

function mapState(state){
    return {
        user: state.user
    }
}

export default withRouter(connect(mapState, null)(Page));
