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
import CommonLeft from "../../components/common/CommonLeft";
import Markdown from "react-markdown";
import toc from "remark-toc";

// 观察者
@inject('header')
@observer
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            detail: {}
        }

    }

    componentDidMount() {
        this.getDetail()
    }

    getDetail = async () => {
        const data = this.props.history.location.search  //地址栏截取
        const paramsString = data.substring(1)
        console.log(paramsString)

        const searchParams = new URLSearchParams(paramsString)
        const languageId = searchParams.get('languageId')
        const contentId = searchParams.get('contentId')

        const params = {
            languageId: languageId,
            contentId: contentId,
        };

        const res = await get("markdownStore/getArticleDetail", params)
        console.log(res.data);


        if (res && res.data) {
            this.setState({
                detail: res.data,
            })
        }
    };

    render() {
        const {detail} = this.state;
        return (
            <div id="articleDetail">
                <CommonLeft {...this.props}/>

                <div className={"right"}>
                    <div className={"box_387X1"}>
                        <div className={"text_388X1"}>
                            {detail.storeTitle}
                        </div>


                        <div className={"box_200"}>
                            <div className={"text_420X1"}>{detail.languageTitle}</div>
                        </div>

                        <div className={"text_393X1"}>
                            {/*{detail.content}*/}
                            <Markdown
                                className="result"
                                source={detail.content}
                                skipHtml={this.state.htmlMode === 'skip'}
                                escapeHtml={this.state.htmlMode === 'escape'}
                                plugins={[toc]}
                            />
                        </div>

                        <div className={"box_201"}>
                            <div className={"box_202"}>
                                <div className={"icon_7X1"}>
                                    {"<"}
                                </div>

                                <div className={"text_436X1"}>上一篇文章标题</div>
                            </div>

                            <div className={"box_202"}>
                                <div className={"text_436X1"}>下一篇文章标题</div>

                                <div className={"icon_7X1"}>
                                    {">"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
