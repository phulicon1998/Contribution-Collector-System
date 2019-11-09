import React, {Component} from "react";
import { Row, Col } from "react-bootstrap";
import {apiAppCall} from "../services/api";
import GenerateListCard from "../components/Generate/GenerateListCard";
import AppLayout from "../components/Layout/AppLayout";
import withNotice from "./withNotice";

export default function generateUser(RenderComponent) {
    class GenerateUser extends Component {

        constructor(props) {
            super(props);
            this.state = {
                ungenerate: [],
                unready: []
            }
        }

        async componentDidMount(){
            await this.loadUnready();
        }

        getUnique = (data) => data.filter(val => this.state.ungenerate.filter(e => e.email === val.email).length === 0);

        waitForGen = (accounts, dup = 0) => {
            const {notify} = this.props;
            let {ungenerate} = this.state;
            let uniqueAccs = this.getUnique(accounts);
            // compare to notify
            let duplicates = accounts.length - uniqueAccs.length + dup;
            if(duplicates > 0) notify("warning", `${duplicates} duplicated emails are removed.`);
            // add to table
            ungenerate = [...ungenerate, ...uniqueAccs];
            this.setState({ungenerate});
        }

        loadUnready = async() => {
            const {apiForUnready} = this.props;
            const unready = await apiAppCall("get", apiForUnready);
            this.setState({unready});
        }

        refresh = async({count, msg}) => {
            this.props.notify(count === 0 ? "success" : "warning", msg);
            await this.loadUnready();
            this.setState({ungenerate: []});
        }

        modify = (deleteKey) => {
            let {ungenerate, unready} = this.state;
            ungenerate = ungenerate.filter(val => val.email !== deleteKey);
            unready = unready.filter(val => val.email !== deleteKey);
            this.setState({unready, ungenerate});
        }

        render() {
            const {ungenerate, unready, form, notify} = this.props;
            return (
                <AppLayout {...this.props}>
                    <Row>
                        <Col md={5}>
                            <RenderComponent {...form} waitForGen={this.waitForGen}/>
                            <GenerateListCard
                                {...ungenerate}
                                list={this.state.ungenerate}
                                hdGenerate={this.handleGenerate}
                                modifyFn={this.modify}
                                refresh={this.refresh}
                            />
                        </Col>
                        <Col md={7}>
                            <GenerateListCard
                                {...unready}
                                list={this.state.unready}
                                modifyFn={this.modify}
                                notify={notify}
                            />
                        </Col>
                    </Row>
                </AppLayout>
            );
        }
    }

    return withNotice(GenerateUser);
}
