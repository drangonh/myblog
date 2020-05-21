/**
 * 首页
 * author:dragonh
 * time:2020/4/30
 **/
import React from 'react';
import './ArticleDetail.scss';
import BaseComponent from "../../components/common/BaseComponent";
import {post, get} from "../../axios";
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
            content: "",
            list: [],
            selType: {}
        }
    }

    componentDidMount() {
        this.getList()
    }

    getList = async () => {
        const {header: {person}} = this.props;

        const params = {};
        const res = await get("language/getLanguageList", params);

        if (res.data) {
            this.setState({
                list: res.data,
                selType: res.data.length != 0 ? res.data[0] : {}
            })
        }
    };

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
            };

            const res = await post("language/editLanguage", params)
            if (res.data && res.data.result) {
                this.suspendBtn()
                this.getList()
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
        this.props.history.push({
            pathname: "/markdown",
            state: {
                list: this.state.list,
                publish: true
            }
        });
    };

    //改变选中的语言
    changeSelType = (item) => {
        this.setState({
            selType: item
        })
    };

    render() {
        const {list, selType} = this.state;
        return (
            <div id="articleDetail">
                <div className={"left"}>

                    <div className={"box_278X1"}>
                        <div className={"photo"}>

                        </div>

                        <h4>Web Bolg</h4>

                        <p>
                            Only the harvest，to test the significance of the work；
                            only the contribution，
                            the value of the square
                            can be measured。
                        </p>
                    </div>

                    <div className={"box_275X1"}>
                        <div className={"wrapper_118X1"}>
                            <div className={"text_268X1"}>1</div>
                            <div className={"text_269X1"}>文章</div>
                        </div>

                        <div className={"wrapper_118X1"}>
                            <div className={"text_268X1"}>1</div>
                            <div className={"text_269X1"}>分类</div>
                        </div>

                        <div className={"wrapper_118X1"}>
                            <div className={"text_268X1"}>1</div>
                            <div className={"text_269X1"}>Tags</div>
                        </div>
                    </div>

                </div>

                <div className={"box_286X1"}></div>

                <div className={"right"}>
                    <div className={"box_387X1"}>
                        <div className={"text_388X1"}>
                            标题标题标题
                        </div>


                        <div className={"box_200"}>
                            <div className={"text_420X1"}>Javascript</div>
                            <div className={"text_420X1"}>Javascript</div>
                            <div className={"text_420X1"}>Javascript</div>
                        </div>

                        <div className={"text_393X1"}>
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                            。。。。。。
                        </div>

                        <div className={"box_201"}>
                            <div className={"box_202"}>
                                <div className={"icon_7X1"}>
                                </div>

                                <div className={"text_436X1"}>上一篇文章标题</div>
                            </div>

                            <div className={"box_202"}>
                                <div className={"icon_7X1"}>
                                </div>

                                <div className={"text_436X1"}>下一篇文章标题</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
