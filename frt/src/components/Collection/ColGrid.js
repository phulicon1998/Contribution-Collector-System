import React from "react";
import { Col, Row } from "react-bootstrap";
import ColSmItem from "../Collection/ColSmItem";
import Empty from "../Empty";
import Card from "../Card/Card";
import AppLayout from "../Layout/AppLayout";

const Contributions = ({title, contribution_id, closureDate, _id}) => (
    <Col md={2}>
        <ColSmItem
            title={title}
            number={contribution_id.length}
            date={closureDate}
            id={_id}
        />
    </Col>
)

const ColGrid = ({list, ...props}) => {
    let colList = list.map((col, index) => <Contributions {...col} key={index} />);
    return (
        <AppLayout {...props}>
            <Row>
                <Col md={12}>
                    <legend className="title">View All Submitted Collections</legend>
                </Col>
                {
                    list.length > 0 ? colList
                    : <Col md={12}>
                        <Card content={
                            <Empty text="There is no submitted contribution." />
                        }/>
                    </Col>
                }
            </Row>
        </AppLayout>
    );
}

export default ColGrid;
