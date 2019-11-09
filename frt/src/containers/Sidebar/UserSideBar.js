import React, {Component} from "react";
import { Collapse } from "react-bootstrap";
import {connect} from "react-redux";

class UserSideBar extends Component {
    render(){
        const {user, hdlClick, caretClass, isCollapsed} = this.props;
        const {profileImg, viewname} = user;
        return (
            <div className="user">
                <div className="photo">
                    <img src={profileImg ? profileImg.link : "https://images.unsplash.com/photo-1556194717-78036eada3a1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=120&h=120&fit=crop&ixid=eyJhcHBfaWQiOjF9"} alt="Avatar" />
                </div>
                <div className="info">
                    <a onClick={hdlClick}>
                        <span>{viewname ? viewname : "Guest User"} <b className={caretClass}/></span>
                    </a>
                    <Collapse in={isCollapsed}>
                        <ul className="nav">
                            <li>
                                <a>
                                    <span className="sidebar-mini">MP</span>
                                    <span className="sidebar-normal">My Profile</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span className="sidebar-mini">EP</span>
                                    <span className="sidebar-normal">Edit Profile</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span className="sidebar-mini">S</span>
                                    <span className="sidebar-normal">Settings</span>
                                </a>
                            </li>
                        </ul>
                    </Collapse>
                </div>
            </div>
        )
    }
}

function mapState(state){
    return {
        user: state.user.data
    }
}

export default connect(mapState, null)(UserSideBar);
