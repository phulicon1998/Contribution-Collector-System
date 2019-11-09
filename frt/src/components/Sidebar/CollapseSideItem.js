import React from "react";
import { Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const CollapseSideItem = ({activeRoute, prop, onClick, caretClass, isCollapsed}) => (
    <li className={activeRoute(prop.path)}>
        <a onClick={onClick}>
            <i className={prop.icon} />
            <p>{prop.name} <b className={caretClass}/></p>
        </a>
        <Collapse in={isCollapsed}>
            <ul className="nav">
                {prop.views.map((prop, key) => {
                    return (
                        <li className={activeRoute(prop.path)} key={key}>
                            <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                <span className="sidebar-mini">{prop.mini}</span>
                                <span className="sidebar-normal">{prop.name}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </Collapse>
    </li>
);

export default CollapseSideItem;
