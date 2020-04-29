import React from 'react';
import './index.scss';
import Header from "../../components/common/Header";
import BaseComponent from "../../components/common/BaseComponent";
import ListItem from "../../components/home/ListItem";
import SuspendBtn from "../../components/home/SuspendBtn";
import {Button, FormControl, Modal} from "react-bootstrap";
import {post} from "../../axios";
import {inject, observer} from "mobx-react";

// 观察者
@inject('header')
@observer
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            title: "",
            content: ""
        }
    }

    componentDidMount() {
    }

    suspendBtn = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    };

    commit = async () => {
        const {header: {person}} = this.props;

        if (person.info) {
            const params = {
                languageContent: this.state.content,
                languageTitle: this.state.title,
                userId: person.info.userId
            };


            const res = await post("editLanguage", params)
            if (res.data && res.data.result) {

            }
        } else {
            this.props.history.push("/login");
        }

        this.suspendBtn()
    };

    handleChange = (p1) => {
        this.setState({
            title: p1.target.value
        })
    };

    changeContent = (p1) => {
        this.setState({
            content: p1.target.value
        })
    };

    publish = () => {
        this.props.history.push("/markdown");
    };

    render() {
        return (
            <div className="wrap">

                <Header {...this.props}/>

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
                            value={this.state.title}
                            placeholder="请输入分类名称"
                            onChange={this.handleChange}
                        />

                        <h5>分类介绍</h5>

                        <textarea
                            value={this.state.content}
                            onChange={this.changeContent}
                            className="introduce"
                            placeholder={"请输入分类介绍"}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.commit}>确定</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default App;
