/**
 * 首页
 * author:dragonh
 * time:2020/4/30
 **/
import React from 'react';
import './index.scss';
import BaseComponent from "../../components/common/BaseComponent";
import {Alert, Button, Modal} from "react-bootstrap";
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
            modalShow: false
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

    setModalShow = (res, e) => {
        this.setState({
            modalShow: res
        });
        e && e.stopPropagation()
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
        const {list, modalShow} = this.state;
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

                                <div className={"contentBotBn"}>
                                    <div className={"editPage editBtn"} onClick={() => this.openPage(item, true)}>
                                        编辑
                                    </div>

                                    <div className={"editPage delBtn"} onClick={(e) => this.setModalShow(true, e)}>
                                        删除
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <DeleteModal
                    show={modalShow}
                    onHide={(e) => {
                        this.setModalShow(false, e)
                    }}
                />

            </div>
        );
    }

}

function DeleteModal(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    提醒
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    您将要删除这篇文章，确定删除吗？
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => props.onHide && props.onHide(e)}>确定</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HomeContent;
