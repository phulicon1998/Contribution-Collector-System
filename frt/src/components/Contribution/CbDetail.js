import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import Card from "../Card/Card";
import ColBox from "../Collection/ColBox";
import { CbImg, CbWord } from "./CbIns";
import CbCommentContainer from "../../containers/Contribution/CbComment";
import Empty from "../Empty";
import AppLayout from "../Layout/AppLayout";
import "../../assets/css/contribution/contribution.css";

const Public = ({hd, select}) => (
    <Col md={12}>
        <Card content={
            <div className="selectBar">
                <button
                    className={` ${!select ? "btn btn-success btn-fill" : "btn btn-warning"}`}
                    onClick={hd}
                >
                    {!select ? <i className="fas fa-check"></i> : <i class="fas fa-minus"></i>}
                    {!select ? "Select" : "Deselect"}
                </button>
                {!select ? <p>Click this for publicizing this contribution</p> : <p>Click this for cancelling publicizing</p>}
            </div>
        }/>
    </Col>
)

const Delete = ({hd}) => (
    <Col md={12}>
        <Card content={
            <div className="selectBar">
                <button className="btn btn-danger" onClick={hd}>Remove this contribution</button>
                <p>Click this for deleting this contribution</p>
            </div>
        }/>
    </Col>
)

const Approve = ({hd}) => (
    <Col md={12}>
        <Card content={
            <div className="approveBar">
                <p>Click to select "Approve" and "Deny" for accepting that this contribution meets the requirement and vice versa.</p>
                <div>
                    <button className="btn btn-primary btn-fill btn-wd" onClick={hd.bind(this, "Approve")}>Approve</button>
                    <button className="btn btn-danger btn-fill btn-wd" onClick={hd.bind(this, "Deny")}>Deny</button>
                </div>
            </div>
        } />
    </Col>
)

const Images = ({img}) => (
    <Row>
        {img.map((val, i) => (
            <Col md={3} key={i}>
                <CbImg name={`img${i+1}.jpg`} link={val.link}/>
            </Col>
        ))}
    </Row>
)

const Words = ({word}) => (
    <Row>
        {word.map((val, i) => (
            <Col md={3} key={i}>
                <CbWord name={`word${i+1}.docx`} link={val.link}/>
            </Col>
        ))}
    </Row>
)

const CbDetail = ({access, comment, image_id, word_id, student_id, createdAt, hdPublic, hdStatus, hdDelete, match, approveStatus, latest, selectForPublic, ...props}) => {
    return (
        <AppLayout {...props}>
            <Row>
                <Col md={8}>
                    <div className="col-md-12 rmPaddingLeft rmPaddingRight">
                        {access("002") || <CbCommentContainer saveCmt={comment} {...props} match={match}/>}
                        <Card title="Images" category="Images uploaded in contribution" content={
                            image_id && image_id.length > 0
                            ? <Images img={image_id} />
                            : <Empty text="There is no image." height={100} backgroundColor="#f0f0f0"/>
                        }/>
                        <Card title="Words" category="Words uploaded in contribution" content={
                            word_id && word_id.length > 0
                            ? <Words word={word_id} />
                            : <Empty text="There is no word." height={200} backgroundColor="#f0f0f0"/>
                        }/>
                        <Card content={
                            <div className="returnBar">
                                <p><i className="fas fa-cube"></i> Want to see and know what is inside the other contributions?</p>
                                <p><u><a href={`/submissions/${match.params.col_id}/contributions`}>Get back to the list here</a></u></p>
                            </div>
                        }/>
                    </div>
                </Col>
                <Col md={4}>
                    <Row>
                        <Col md={6}>
                            <ColBox
                                css="pe-7s-photo text-success"
                                number={image_id ? image_id.length : 0}
                                type="image(s)"
                                note="in this contribution"
                            />
                        </Col>
                        <Col md={6}>
                            <ColBox
                                css="pe-7s-bookmarks text-info"
                                number={word_id ? word_id.length : 0}
                                type="word(s)"
                                note="in this contribution"
                            />
                        </Col>
                    </Row>
                    <Card title="Contribution Information" content={
                        <div className="cbDetail">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row-detail">
                                        <span>Submitted by</span>
                                        <div>
                                            {student_id && <img src={student_id.profileImg.link} alt="" className=""/>}
                                            <span>{student_id && student_id.viewname}</span></div>
                                        </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row-detail">
                                        <span>Submitted at </span>
                                        <div>
                                            <i className="far fa-clock"></i>
                                            <span>{moment(createdAt).format("MMMM Do, YYYY")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row-detail">
                                        <span>Faculty</span>
                                        <div>
                                            <i className="fas fa-graduation-cap"></i>
                                            <span>{student_id && student_id.faculty_id.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }/>

                    <Row>
                        {access("003") && <Public hd={hdPublic} select={selectForPublic} />}

                        {access("002") && approveStatus === "Pending" && <Approve hd={hdStatus} />}

                        {access("001") && !latest && <Delete hd={hdDelete}/>}
                    </Row>
                </Col>
            </Row>
        </AppLayout>
    );
}

export default CbDetail;
