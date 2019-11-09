import React, {Component} from "react";
import NotificationSystem from "react-notification-system";
import notiStyle from "../variables/notiStyle";

const box = {
    success: {
        icon: "pe-7s-cup",
        level: "success"
    },
    warning: {
        icon: "pe-7s-attention",
        level: "warning"
    },
    error: {
        icon: "pe-7s-close-circle",
        level: "error"
    }
}

export default function withNotice(WrappedComponent){
    class WithNotice extends Component {
        constructor(props){
            super(props);
            this.handleNotificationClick = this.handleNotificationClick.bind(this);
            this.state = {
                _notificationSystem: null
            };
        }

        componentDidMount() {
            this.setState({ _notificationSystem: this.refs.notificationSystem });
        }

        handleNotificationClick(type, msg) {
            const {icon, level} = box[type];
            this.state._notificationSystem.addNotification({
                title: <span data-notify="icon" className={icon} />,
                message: (
                    <div>{msg}</div>
                ),
                level: level,
                position: "tc"
            });
        }

        render() {
            return (
                <div>
                    <NotificationSystem ref="notificationSystem" style={notiStyle} />
                    <WrappedComponent notify={this.handleNotificationClick} {...this.props} />
                </div>
            )
        }
    }

    return WithNotice;
}
