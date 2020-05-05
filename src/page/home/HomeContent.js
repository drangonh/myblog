/**
 * 首页
 * author:dragonh
 * time:2020/4/30
 **/
import React from 'react';
import './index.scss';
import BaseComponent from "../../components/common/BaseComponent";
import {Alert} from "react-bootstrap";
import {get} from "../../axios";
import {inject, observer} from "mobx-react";
import toc from "remark-toc";
import Markdown from "react-markdown";

// 观察者
@inject('header')
@observer
class HomeContent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.getList(nextProps)
    }

    getList = async (nextProps) => {
        const {header: {person}} = this.props;
        const {languageId} = nextProps;

        const params = {
            userId: person.info.userId,
            languageId: languageId
        };

        const res = await get("getArticleList", params);

        console.log(res.data)
        if (res.data) {
            this.setState({
                list: res.data,
            })
        } else {
            this.setState({
                list: [],
            })
        }
    };

    //跳转到文章详情页
    openPage = (item, edit) => {
        this.props.history.push({
            pathname: "/markdown",
            state: {
                list: this.props.types,
                publish: edit ? true : false, //编辑文章是显示发布样式
                item: item,
                edit: edit
            }
        });
    };

    render() {
        const {languageContent} = this.props;
        const {list} = this.state;
        return (
            <div className={"contentRight"}>
                <div className={"languageContent"}>
                    简介： {languageContent}
                </div>

                {
                    list.map((item, index) => {
                        return (
                            <div key={item.contentId} className={"content"} onClick={() => this.openPage(item, false)}>
                                <Markdown
                                    source={item.brief}
                                    skipHtml={this.state.htmlMode === 'skip'}
                                    escapeHtml={this.state.htmlMode === 'escape'}
                                    plugins={[toc]}
                                />

                                <div className={"contentBotBn"} onClick={() => this.openPage(item, true)}>
                                    <div className={"editPage editBtn"}>
                                        编辑
                                    </div>

                                    <div className={"editPage delBtn"}>
                                        删除
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        );
    }

}

export default HomeContent;
