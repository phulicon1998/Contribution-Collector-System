import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import "../../assets/css/report/list.css";
import AppLayout from "../Layout/AppLayout";

class ListReport extends Component {
    render(){
        return (
            <AppLayout {...this.props}>
                <div>
                    <h3 className="listReport">Statistic Contributor Reports</h3>
                    <Row>
                        <Col lg={2} sm={6}>
                            <div className="card">
                                <div className="content reportBox">
                                    <i className="pe-7s-file"></i>
                                    <div>
                                        <div>
                                            <i className="fa fa-clock-o" />
                                            <p>28 Apr 2019, 12:33</p>
                                        </div>
                                        <i className="fas fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} sm={6}>
                            <div className="card">
                                <div className="content reportBox">
                                    <i className="pe-7s-file"></i>
                                    <div>
                                        <div>
                                            <i className="fa fa-clock-o" />
                                            <p>26 Apr 2019, 10:35</p>
                                        </div>
                                        <i className="fas fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} sm={6}>
                            <div className="card">
                                <div className="content reportBox">
                                    <i className="pe-7s-file"></i>
                                    <div>
                                        <div>
                                            <i className="fa fa-clock-o" />
                                            <p>22 Apr 2019, 2:33</p>
                                        </div>
                                        <i className="fas fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} sm={6}>
                            <div className="card">
                                <div className="content reportBox">
                                    <i className="pe-7s-file"></i>
                                    <div>
                                        <div>
                                            <i className="fa fa-clock-o" />
                                            <p>20 Apr 2019, 1:26</p>
                                        </div>
                                        <i className="fas fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </AppLayout>
        )
    }
}

export default ListReport;
