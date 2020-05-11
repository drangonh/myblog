/**
 * 首页
 * author:dragonh
 * time:2020/4/30
 **/
import React from 'react';
import './index.scss';
import {Button, Modal} from "react-bootstrap";
import {get, post} from "../../axios";
import toc from "remark-toc";
import Markdown from "react-markdown";
import PagingBtn from "../../components/home/PagingBtn";

class HomeContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            modalShow: false,
            languageId: "",
            count: 0//文章总数
        }

        this.delItem = {}
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        const {languageId} = nextProps;

        if (nextProps.languageId !== this.state.languageId) {
            this.setState({
                languageId
            }, () => {
                this.getList()
            })
        }

    }

    componentWillUnmount() {
        this.delItem = {}
    }

    getList = async () => {
        const {languageId} = this.state;

        const params = {
            languageId: languageId,
            pageSize: 10,
            page: 1
        };

        const res = await get("getArticleList", params);

        console.log(res.data)
        if (res.data) {
            this.setState({
                list: res.data.list,
                count: res.data.count
            })
        } else {
            this.setState({
                list: [],
                count: 0
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

    // 删除文章
    delArticle = async (item, e) => {
        const params = {
            contentId: item.contentId
        };

        const res = await post("deleteArticle", params);

        if (res.data) {
            this.setModalShow(false, e)

            this.getList()
        }

    };

    render() {
        const {languageContent} = this.props;
        const {list, modalShow,count} = this.state;

        return (
            <div className={"homeContainer"}>
                <div className={"homeContentRight"}>
                    <div className={"languageContent"}>
                        简介： {languageContent}
                    </div>

                    {
                        list.map((item, index) => {
                            return (
                                <div key={item.contentId} className={"content"}
                                     onClick={() => this.openPage(item, false)}>
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

                                        <div className={"editPage delBtn"} onClick={(e) => {
                                            this.delItem = item;
                                            this.setModalShow(true, e)
                                        }}>
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
                        delArticle={(e) => this.delArticle(this.delItem, e)}
                    />

                </div>

                <PagingBtn
                    total={count/10}
                    nextBtn={() => {
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
                <Button onClick={(e) => {
                    props.delArticle && props.delArticle()
                }}>确定</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HomeContent;




