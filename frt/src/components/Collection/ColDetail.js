import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import "../../assets/css/collection/collection.css";
import "../../assets/css/submitContribution/submit.css";
import Card from "../Card/Card.jsx";
import ColBox from "./ColBox";
import ColItem from "./ColItem";
import ColSubmit from "./ColSubmit";
import CbList from "../Contribution/CbList";
import AppLayout from "../Layout/AppLayout";

const ColDetail = ({submit, hdUpdate, hdDelete, user, notify, detail, match, access, load, ...props}) => {
    const {col_id} = match.params;
    const {contribution_id, closureDate, finalClosureDate, ownContribution_id} = detail;
    let daysLeft = moment(closureDate).diff(moment(), "days") + 1;
    return (
        <AppLayout {...props}>
            <div className="collectionList">
                <Row>
                    <Col md={8}>
                        <ColItem
                            {...detail}
                            {...{access, hdUpdate, hdDelete}}
                            detail
                        />
                        </Col>
                    <Col md={4}>
                        <Row>
                            <Col md={6}>
                                <ColBox
                                    css="pe-7s-upload text-success"
                                    number={contribution_id.length}
                                    type="submition(s)"
                                    note="in total contribution"
                                />
                            </Col>
                            <Col md={6}>
                                <ColBox
                                    css="pe-7s-clock text-info"
                                    number={daysLeft > 0 ? daysLeft : 0}
                                    type="day(s) left"
                                    note="Time until closure date"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Card content={
                                    <div className="dateBox">
                                        <Row>
                                            <div className="dateInfo">
                                                <span>{moment(closureDate).format("MMMM Do, YYYY")}</span>
                                                <span>Closure date</span>
                                            </div>
                                            <div className="dateInfo">
                                                <span>{moment(finalClosureDate).format("MMMM Do, YYYY")}</span>
                                                <span>Final closure date</span>
                                            </div>
                                        </Row>
                                    </div>
                                }/>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        {!access("001") && contribution_id.length > 0 && <CbList
                            title="Recent Submission"
                            list={ownContribution_id}
                            access={access}
                        />}
                        {access("001") && daysLeft > 0 && <ColSubmit
                            user={user}
                            notify={notify}
                            colId={col_id}
                            load={load}
                            {...submit}
                        />}
                    </Col>
                </Row>
            </div>
        </AppLayout>
    );
}

export default ColDetail;
