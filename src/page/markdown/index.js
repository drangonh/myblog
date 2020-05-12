/**
 *
 */
import Markdown from "react-markdown"
import React from 'react'
import toc from "remark-toc"
import "./index.scss"
import {Button, ButtonGroup, DropdownButton, DropdownItem} from "react-bootstrap"
import {inject, observer} from "mobx-react";
import {post, get} from "../../axios";

const initialSource = `
### 编辑文章内容

使用markdown的语法
`

// 观察者
@inject('header')
@observer

class Index extends React.PureComponent {
    constructor(props) {
        super(props)
        const state = props.history.location.state;
        this.state = {
            markdownSrc: initialSource,             //markdown 文本
            htmlMode: 'raw',
            list: state ? state.list : [],          //语言分类列表
            publish: state ? state.publish : true,  //是否是发布文章
            edit: state ? state.edit : false,  //是否是发布文章
            selType: null,                          //选中的语言类型
            storeTitle: "",                         //文章标题
            detail: null                            //更改时候的文章详情
        }


    }

    componentDidMount() {
        // 编辑时候先获取详情
        if (!this.state.publish || this.state.edit) {
            this.getDetail()
        }
    }

    getDetail = async () => {
        let obj;
        const state = this.props.history.location.state;
        // state.item
        const {header: {person}} = this.props;
        const params = {
            languageId: state.item.languageId,
            contentId: state.item.contentId,
        };

        const res = await get("markdownStore/getArticleDetail", params)
        console.log(res.data);


        if (res && res.data) {

            this.state.list.forEach((item, index) => {
                if (item.languageId == res.data.languageId) {
                    obj = item
                }
            });

            this.setState({
                detail: res.data,
                storeTitle: res.data.storeTitle,
                markdownSrc: res.data.content,
                selType: obj
            })
        }
    };

    handleMarkdownChange = (evt) => {
        this.setState({markdownSrc: evt.target.value})
    };

    handleTitleChange = (evt) => {
        this.setState({storeTitle: evt.target.value})
    };

    changePage = async () => {
        this.setState({
            publish: !this.state.publish
        })

    };

    publishPage = async () => {
        const {header: {person}} = this.props;
        const {selType, markdownSrc, publish, detail} = this.state;
        if (!selType) {
            return
        }
        const params = {
            languageId: selType.languageId,
            content: markdownSrc,
            htmlContent: "",
            storeTitle: this.state.storeTitle,
            contentId: detail ? detail.contentId : 0
        };

        const res = await post("markdownStore/editArticle", params)
        console.log(res)

        if (res && res.data && res.data.result) {
            this.props.history.push({
                pathname: "/home"
            })
        }
    };

    changeType = (item) => {
        this.setState({
            selType: item
        })
    };


    render() {
        const {list, selType, publish} = this.state;
        console.log(selType);
        return (
            <div className="demo plr20">

                <header className={"top plr20"}>

                    {
                        publish ?
                            <ButtonGroup>
                                <DropdownButton title={selType ? selType.languageTitle : "选择文章类型"}
                                                id="bg-nested-dropdown">

                                    {list.map((item, index) => {
                                        return (
                                            <DropdownItem
                                                onSelect={() => this.changeType(item)}
                                                eventKey={index + 1}
                                                key={item.languageId}>
                                                {item.languageTitle}
                                            </DropdownItem>

                                        )
                                    })}
                                </DropdownButton>
                            </ButtonGroup>
                            : null
                    }

                    <div className={"uf1"}/>

                    {
                        publish ?
                            null :
                            <Button
                                onClick={this.changePage}
                                variant="outline-primary"
                                className={"mr20"}>
                                修改文章
                            </Button>
                    }

                    {
                        publish ?
                            <Button
                                onClick={this.publishPage}
                                variant="outline-secondary">
                                发布文章
                            </Button>
                            : null
                    }

                </header>

                <div className={"markdownContent"}>

                    {publish ?
                        <div className={"left"}>
                            <input
                                placeholder={"请输入文章标题"}
                                value={this.state.storeTitle}
                                onChange={this.handleTitleChange}
                            />
                            <textarea
                                placeholder={"markdown文档格式"}
                                value={this.state.markdownSrc}
                                onChange={this.handleMarkdownChange}
                            />
                        </div>
                        : null
                    }


                    <div className="right">
                        <Markdown
                            className="result"
                            source={this.state.markdownSrc}
                            skipHtml={this.state.htmlMode === 'skip'}
                            escapeHtml={this.state.htmlMode === 'escape'}
                            plugins={[toc]}
                        />
                    </div>
                </div>

            </div>
        )
    }
}


export default Index
