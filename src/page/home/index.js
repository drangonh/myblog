/**
 * 首页
 * author:dragonh
 * time:2020/4/30
 **/
import React from 'react';
import './index.scss';
import Header from "../../components/common/Header";
import BaseComponent from "../../components/common/BaseComponent";
import SuspendBtn from "../../components/home/SuspendBtn";
import {Button, FormControl, Modal} from "react-bootstrap";
import {post, get} from "../../axios";
import {inject, observer} from "mobx-react";
import HomeContent from "./HomeContent";
import CommonLeft from "../../components/common/CommonLeft";
import commonLeft from "../../store/commonLeft";

// 观察者
@inject('header')
@inject('commonLeft')
@observer
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            title: "",
            content: "",
            list: [],
            selType: {}
        }
    }

    componentDidMount() {
        this.getList()
    }

    getList = async () => {
        const params = {};
        const res = await get("language/getLanguageList", params);

        if (res.data) {
            this.setState({
                list: res.data,
                selType: res.data.length != 0 ? res.data[0] : {}
            })

            const {commonLeft} = this.props;
            commonLeft.changeInfo(res.data);
        }
    };

    suspendBtn = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    };

    commit = async () => {
        const {header: {person}} = this.props;

        if (person) {
            const params = {
                languageContent: this.state.content,
                languageTitle: this.state.title,
            };

            const res = await post("language/editLanguage", params)
            if (res.data && res.data.result) {
                this.suspendBtn()
                this.getList()
            } else {
                alert(res.err)
            }
        } else {
            this.props.history.push("/login");
        }
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
        console.log(this.state.list)
        if (this.state.list.length == 0) {

            this.setState({
                showModal: !this.state.showModal
            }, () => this.commit())

            return
        }
        this.props.history.push({
            pathname: "/markdown",
            state: {
                list: this.state.list,
                publish: true
            }
        });
    };

    render() {
        const {list, selType} = this.state;
        return (
            <div className="wrap">

                {/*<Header {...this.props}/>*/}

                <div className={"homeContent"}>

                    <CommonLeft {...this.props}/>

                    <HomeContent
                        types={list}
                        history={this.props.history}
                        languageContent={selType.languageContent}
                        languageId={selType.languageId}/>

                </div>

                {/*悬浮按钮*/}
                <SuspendBtn
                    publish={this.publish}
                    suspendBtn={this.suspendBtn}/>

                {this.renderModal()}
            </div>
        );
    }

    renderModal() {
        return (
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
        )
    }
}

export default App;
