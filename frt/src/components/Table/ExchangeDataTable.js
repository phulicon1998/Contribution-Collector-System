import React, {Component} from "react";
import ReactTable from "react-table";
import Card from "../Card/Card.jsx";
import {Row, Col} from "react-bootstrap";
import Button from "../CustomButton/CustomButton.jsx";

class ExchangeDataTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            tick: []
        }
    }

    getActions = (key) => {
        return (
            <div className="actions-right">
                <Button onClick={this.push.bind(this, key)} bsStyle="info" simple icon>
                    <i className="fas fa-exchange-alt"></i>
                </Button>
            </div>
        )
    }

    push = async(key) => {
        if(window.confirm("Are you sure to make these changes?")){
            await this.props.select(key);
        }
    }


    render() {
        const {headers, data, title, cate} = this.props;
        let renderData = data.map(val => ({
            ...val,
            actions: this.getActions(val.id)
        }))
        return (
            <Row>
                <Col md={12}>
                <Card
                    title={title}
                    category={cate}
                    content={
                        <div>
                            <ReactTable
                                data={renderData}
                                filterable
                                columns={headers}
                                defaultPageSize={5}
                                showPaginationTop
                                showPaginationBottom={false}
                                className="-striped -highlight"
                            />
                        </div>
                    }
                />
                </Col>
            </Row>
        )
    }
}

export default ExchangeDataTable;
