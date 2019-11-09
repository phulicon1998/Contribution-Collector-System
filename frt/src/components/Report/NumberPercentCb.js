import React, {Component} from "react";
import {Table, Row, Col } from "react-bootstrap";
import ChartistGraph from "react-chartist";
import Card from "../Card/Card.jsx";
import AppLayout from "../Layout/AppLayout";

class NumberPercentCb extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const viewsChart = {
            type: "Line",
            data: {
                labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
                series: [[30, 62, 50, 160, 54, 144, 132, 78, 85, 185]]
            },
            options: {
                lineSmooth: false,
                height: "260px",
                axisY: {
                    offset: 40
                },
                low: 10,
                high: 200,
                classNames: {
                    point: "ct-point ct-green",
                    line: "ct-line ct-green"
                },
                chartPadding: {
                    right: -25
                }
            }
        };

        const selectHeaderTable = ["Type", "Number", "Percent"];
        const selectTableData = [
            ["Selected contribution", "35", "41.17 %"],
            ["Unselected contribution", "50", "58.83 %"]
        ]

        const selectPie = {
            type: "Pie",
            data: {
                labels: ["41.17 %", "58.83 %"],
                series: [41.17, 58.83]
            }
        };

        const approveTableData = [
            ["Approved contribution", "80", "39.3 %"],
            ["Unapproved contribution", "105", "59.7 %"]
        ]

        const approvedPie = {
            type: "Pie",
            data: {
                labels: ["43.24 %", "56.76 %"],
                series: [43.24, 59.76]
            }
        };

        return (
            <AppLayout {...this.props}>
                <Row>
                    <Col md={12}>
                        <Card
                            title="Total Contribution Per Year Comparison"
                            category="Comparison among number of contribution per year"
                            content={
                                <ChartistGraph
                                    data={viewsChart.data}
                                    type={viewsChart.type}
                                    options={viewsChart.options}
                                    responsiveOptions={viewsChart.responsiveOptions}
                                />
                            }
                            legend={viewsChart.legend}
                        />
                    </Col>
                    <Col md={6}>
                        <Card
                            title="Approved & Unapproved Contribution"
                            category="All the numbers are analyzed at the time this report created"
                            tableFullWidth
                            content={
                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            {selectHeaderTable.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {approveTableData.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    {prop.map((prop, key) => {
                                                        return <td key={key}>{prop}</td>;
                                                    })}
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td><b>Total contribution</b></td>
                                            <td><b>185</b></td>
                                            <td><b>100 %</b></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            }
                        />
                    </Col>
                    <Col md={6}>
                        <Card
                            title="Selected & Unselected Contribution"
                            category="All the numbers are analyzed at the time this report created"
                            tableFullWidth
                            content={
                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            {selectHeaderTable.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectTableData.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    {prop.map((prop, key) => {
                                                        return <td key={key}>{prop}</td>;
                                                    })}
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td><b>Total approved contribution</b></td>
                                            <td><b>85</b></td>
                                            <td><b>100 %</b></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            }
                        />
                    </Col>
                    <Col md={6}>
                        <Card
                            title="Approved & Unapproved Contribution Percentage"
                            category="Comparing with the total contribution"
                            content={
                                <ChartistGraph
                                    data={approvedPie.data}
                                    type={approvedPie.type}
                                    options={approvedPie.options}
                                    responsiveOptions={approvedPie.responsiveOptions}
                                />
                            }
                            legend={approvedPie.legend}
                        />
                    </Col>
                    <Col md={6}>
                        <Card
                            title="Select & Unselect Contribution Percentage"
                            category="Comparing with the total approved contribution"
                            content={
                                <ChartistGraph
                                    data={selectPie.data}
                                    type={selectPie.type}
                                    options={selectPie.options}
                                    responsiveOptions={selectPie.responsiveOptions}
                                />
                            }
                            legend={selectPie.legend}
                        />
                    </Col>
                </Row>
            </AppLayout>
        )
    }
}

export default NumberPercentCb;
