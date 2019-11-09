import React from "react";
import { Row, Col } from "react-bootstrap";
import StatsCard from "../Card/StatsCard.jsx";
import AppLayout from "../Layout/AppLayout";
import CbList from "../Contribution/CbList";

const ListFacultyCon = ({list, ...props}) => (
    <Col md={12} >
        {list.map((fa, i) => (
            <CbList title={`Public contributions of '${fa.faculty}'`} list={fa.contributions} key={i} {...props}/>
        ))}
    </Col>
)

const Home = ({list, access, ...props}) => {
    return (
        <AppLayout {...props}>
            <Row>
                <Col lg={3} sm={6}>
                    <StatsCard
                        bigIcon={<i className="pe-7s-albums text-warning" />}
                        statsText="Contributions"
                        statsValue="210"
                        statsIcon={<i className="fa fa-clock-o" />}
                        statsIconText="In the last hour"
                    />
                </Col>
                <Col lg={3} sm={6}>
                    <StatsCard
                        bigIcon={<i className="pe-7s-comment text-success" />}
                        statsText="Contribution was comment"
                        statsValue="200"
                        statsIcon={<i className="fa fa-clock-o" />}
                        statsIconText="In the last hour"
                    />
                </Col>
                <Col lg={3} sm={6}>
                    <StatsCard
                        bigIcon={<i className="pe-7s-attention text-danger" />}
                        statsText="Contribution without comment"
                        statsValue="10"
                        statsIcon={<i className="fa fa-clock-o" />}
                        statsIconText="In the last hour"
                    />
                </Col>
                <Col lg={3} sm={6}>
                    <StatsCard
                        bigIcon={<i className="pe-7s-global text-info" />}
                        statsText="Contribution was public"
                        statsValue="45"
                        statsIcon={<i className="fa fa-clock-o" />}
                        statsIconText="In the last hour"
                    />
                </Col>

                <ListFacultyCon list={list} access={access} />
            </Row>
        </AppLayout>
    )
}

export default Home;
