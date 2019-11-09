import React, { Component } from "react";
import { Row, Col} from "react-bootstrap";
import "../../assets/css/collection/collection.css";
import ChartistGraph from "react-chartist";
import Card from "../Card/Card.jsx";
import { eception } from "../../contents/Chart";

class ExceptionReport extends Component {
    render() {
        return (
            <div className="collectionList">
                <div className="card">
                    <div className="content"> <br/>
                    <legend className="title">Exception Report</legend>
                        <div>
                            <br/>
                            <Row>
                                {eception.map((prop, key) => {
                                    return (
                                        <Col md={6} key={key}>
                                            <Card
                                                title={prop.chart.title}
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
    }
}

export default ExceptionReport;
