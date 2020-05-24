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
import {inject, observer} from "mobx-react";

@inject('commonLeft')
@observer
class HomeContent extends React.Component {
    constructor(props) {
        super(props);
        const {types} = this.props;
        this.state = {
            list: [],
            modalShow: false,
            languageId: types.length != 0 ? types[0].languageId : 0,
            count: 0,//文章总数
            selType: types.length != 0 ? types[0] : {},
        };

        this.page = 1;
        this.delItem = {}
    }

    componentDidMount() {
        this.getList()
    }

    componentWillUnmount() {
        this.delItem = {}
    }

    getList = async () => {
        const {languageId} = this.state;

        const params = {
            languageId: languageId,//0:默認查詢全部
            pageSize: 10,
            page: this.page
        };

        const res = await get("markdownStore/getArticleList", params);

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

    //改变选中的语言
    changeSelType = (item) => {
        this.setState({
            selType: item,
            languageId: item.languageId
        }, () => {
            this.getList()
        })
    };

    //跳转到文章详情页
    openPage = (item, edit) => {
        this.props.history.push({
            pathname: "/articleDetail",
            search: "?languageId=" + item.languageId + "&contentId=" + item.contentId
        });
    };

    // 删除文章
    delArticle = async (item, e) => {
        const params = {
            contentId: item.contentId
        };

        const res = await post("markdownStore/deleteArticle", params);

        if (res.data) {
            this.setModalShow(false, e)

            this.getList()
        }

    };

    render() {
        const {commonLeft} = this.props;
        const {list, modalShow, count, selType} = this.state;

        return (
            <div className={"homeContainer"}>

                {commonLeft.data.length > 0 ?
                    <div className={"box_642X1"}>
                        <div className={"box_642X1_list"}>
                            {
                                commonLeft.data.map((item) => {
                                    if (selType && selType.languageId == item.languageId) {
                                        return (
                                            <div
                                                onClick={() => this.changeSelType(item)}
                                                key={item.languageId}
                                                className={"text_825X1"}>
                                                {item.languageTitle}
                                                <div className={"box_823X1"}/>
                                            </div>
                                        )
                                    }

                                    return (
                                        <div
                                            key={item.languageId}
                                            onClick={() => this.changeSelType(item)}
                                            className={"text_824X1"}>
                                            {item.languageTitle}
                                        </div>
                                    )

                                })
                            }

                        </div>


                        <div className={"languageContent"}>
                            简介： {selType.languageContent}
                        </div>
                    </div>
                    : null}


                <div className={"homeContentRight"}>

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
                    total={count / 10}
                    onPress={(page) => {
                        this.page = page;
                        this.getList()
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




