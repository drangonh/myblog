import React from 'react';
import './index.scss';
import Header from "../../components/common/Header";
import BaseComponent from "../../components/common/BaseComponent";
import ListItem from "../../components/home/ListItem";
import SuspendBtn from "../../components/home/SuspendBtn";
import {Button, FormControl, FormGroup, Modal} from "react-bootstrap";
import {createHashHistory} from "history"

const history = createHashHistory();

class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    componentDidMount() {

    }

    suspendBtn = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    };

    handleChange = (p1) => {
        console.log(p1.target.value)
    };

    publish = () => {
        history.push("/markdown");
    };

    render() {
        return (
            <div className="wrap">

                <Header/>

                <div className={"homeContent"}>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                </div>

                <SuspendBtn
                    publish={this.publish}
                    suspendBtn={this.suspendBtn}/>

                <Modal show={this.state.showModal} onHide={this.suspendBtn}>
                    <Modal.Header closeButton>
                        <Modal.Title>新增分类</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>分类名称</h5>
                        <FormControl
                            className={"type"}
                            type="text"
                            value={this.state.value}
                            placeholder="请输入分类名称"
                            onChange={this.handleChange}
                        />

                        <h5>分类介绍</h5>

                        <textarea
                            onChange={this.handleChange}
                            className="introduce"
                            placeholder={"请输入分类介绍"}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.suspendBtn}>确定</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default App;
