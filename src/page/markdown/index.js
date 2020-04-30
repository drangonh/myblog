/**
 * 
 */
import Markdown from "react-markdown"
import React from 'react'
import toc from "remark-toc"
import "./index.scss"
import {Button, ButtonGroup, DropdownButton, DropdownItem} from "react-bootstrap"
import {inject, observer} from "mobx-react";
import {post} from "../../axios";

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
            markdownSrc: initialSource,
            htmlMode: 'raw',
            list: state ? state.list : [],
            selType: null
        }

    }

    handleMarkdownChange = (evt) => {
        this.setState({markdownSrc: evt.target.value})
    };

    changePage = async () => {
        const {header} = this.props;
        const params = {
            languageContent: "",
            languageTitle: "",
            userId: header.info.userId
        };

        console.log(params);
        return
        const res = await post("editLanguage", params)

        console.log(res)
    };

    publishPage = async () => {
        const {header: {person}} = this.props;
        const {selType, markdownSrc} = this.state;
        if (!selType) {
            return
        }
        const params = {
            userId: person.info.userId,
            languageId: selType.languageId,
            content: markdownSrc,
            htmlContent: ""
        };

        const res = await post("editArticle", params)
        console.log(res)
    };

    changeType = (item) => {
        this.setState({
            selType: item
        })
    };

    render() {
        const {list, selType} = this.state;
        console.log(selType);
        return (
            <div className="demo plr20">

                <header className={"top plr20"}>

                    <ButtonGroup>
                        <DropdownButton title={selType ? selType.languageTitle : "选择文章类型"} id="bg-nested-dropdown">

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


                    <div className={"uf1"}/>
                    <Button
                        onClick={this.changePage}
                        variant="outline-primary"
                        className={"mr20"}>
                        修改文章
                    </Button>

                    <Button
                        onClick={this.publishPage}
                        variant="outline-secondary">
                        发布文章
                    </Button>
                </header>

                <div>
                    <div className={"item left"}>
                    <textarea
                        placeholder={"markdown文档格式"}
                        value={this.state.markdownSrc}
                        onChange={this.handleMarkdownChange}
                    />
                    </div>

                    <div className="item">
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
