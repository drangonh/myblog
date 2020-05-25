import React from 'react';
import "./CommonLeft.scss"
import {OverlayTrigger, Popover} from "react-bootstrap";
import {get} from "../../axios";
import {inject, observer} from "mobx-react";

@inject('header')
@observer
class CommonLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            target: null,
            art: 0,//文章数量
            lag: 0,//分类数量
        }

        this.popoverBottom = (
            <Popover id="popover-positioned-bottom" className={"loginImage"} title="底部弹出">
                <div className={"box_xx200"} onClick={this.changeInfo}>修改资料</div>
                <div className={"box_xx200"} onClick={this.logout}>退出登录</div>
            </Popover>
        );
    }

    componentDidMount() {
        this.getLagAndArtCnt()
    }

    /*方法说明
     *@method getLagAndArtCnt
     *@for CommonLeft
    */
    async getLagAndArtCnt() {
        const res = await get("user/getArtAndCatCnt", {})
        console.log(res)
        if (res.data) {
            this.setState({
                art: res.data.article,//文章数量
                lag: res.data.language
            })
        }
    }

    /*方法说明
     *@method changeInfo:更新用户信息
     *@for CommonLeft
     *@param nil
     *@return nil
    */
    changeInfo = () => {
        this.props.history.push({
            pathname: "/updateInfo",
        });
    }

    /*方法说明
     *@method logout
     *@for CommonLeft
     *@param nil
     *@return nil
    */
    logout = () => {
        get("user/logout", {}).then(res => {
            this.props.history.push({
                pathname: "/login",
            });
        })

    }

    handleClick = e => {
        console.log(e.target)
        this.setState({
            target: e.target,
            show: !this.state.show
        });
    };

    render() {
        const {header: {person}} = this.props
        const {lag, art} = this.state;
        return (
            <div id={"commonLeft"}>

                <div
                    onClick={this.handleClick}
                    className={"box_278X1"}>


                    <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverBottom}>
                        <img
                            src={person && person.uid && person.avatar ? person.avatar : require("../../static/image/defualt.jpeg")}
                            className={"photo"}/>
                    </OverlayTrigger>

                    <h4>
                        {person && person.uid ?
                            person.nickName ? person.nickName : "请修改个人资料"
                            : "请登录"}
                    </h4>

                    <p>
                        {person && person.uid ? person.description : ""}
                    </p>
                </div>

                <div className={"box_275X1"}>
                    <div className={"wrapper_118X1"}>
                        <div className={"text_268X1"}>{art}</div>
                        <div className={"text_269X1"}>文章</div>
                    </div>

                    <div className={"wrapper_118X1"}>
                        <div className={"text_268X1"}>{lag}</div>
                        <div className={"text_269X1"}>分类</div>
                    </div>

                    {/*<div className={"wrapper_118X1"}>*/}
                    {/*    <div className={"text_268X1"}>1</div>*/}
                    {/*    <div className={"text_269X1"}>Tags</div>*/}
                    {/*</div>*/}
                </div>

            </div>
        );
    }
}

export default CommonLeft;
