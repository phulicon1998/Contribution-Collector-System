import React, { Component } from "react";
import { Row, Col, ProgressBar} from "react-bootstrap";
import "../../assets/css/collection/collection.css";
import ChartistGraph from "react-chartist";
import Card from "../Card/Card.jsx";
import { dashboard } from "../../contents/Chart";

class ColReport extends Component {
    render() {
        const dashBoard = (
            <div>
                <div className="card">
                    <div className="content"> <br/>
                    <legend className="title">Dashboard</legend>
                        <div> <br/>
                        <Row>
                            {dashboard.map((prop, key) => {
                            return (
                                <Col md={6} key={key}>
                                <Card
                                    title={prop.chart.title}
                                    // category={prop.chart.category}
                                    content={
                                    <ChartistGraph
                                        data={prop.chart.chart.data}
                                        type={prop.chart.chart.type}
                                        options={prop.chart.chart.options}
                                        responsiveOptions={prop.chart.chart.responsiveOptions}
                                    />
                                    }
                                    legend={prop.chart.legend}
                                />
                                </Col>
                            );
                            })}
                        </Row>
                        </div>
                    </div>
                </div>
            </div>
        );


        return (
            <div className="collectionList">

                {/* Dashboard for all people */}
                {dashBoard}
            </div>
        );
    }
}

export default ColReport;
