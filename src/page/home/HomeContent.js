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
        }
    };

    //跳转到文章详情页
    openPage = (item) => {
        this.props.history.push({
            pathname: "/markdown",
            state: {
                list: this.props.types,
                publish: false,
                item: item
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
                            <Alert key={item.contentId} variant="dark" onClick={() => this.openPage(item)}>

                                {/*<Alert.Heading>*/}
                                {/*{item.storeTitle}*/}
                                {/*</Alert.Heading>*/}

                                {/*<p className={"content"}>*/}
                                {/*{item.brief}*/}
                                {/*</p>*/}

                                <Markdown
                                    className="content"
                                    source={item.brief}
                                    skipHtml={this.state.htmlMode === 'skip'}
                                    escapeHtml={this.state.htmlMode === 'escape'}
                                    plugins={[toc]}
                                />
                            </Alert>
                        )
                    })
                }

            </div>
        );
    }

}

export default HomeContent;
