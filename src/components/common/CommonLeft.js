import React from 'react';
import "./CommonLeft.scss"
import {OverlayTrigger, Popover} from "react-bootstrap";
import {get} from "../../axios";

class CommonLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            target: null
        }

        this.popoverBottom = (
            <Popover id="popover-positioned-bottom" className={"loginImage"} title="底部弹出">
                <div className={"box_xx200"} onClick={this.changeInfo}>修改资料</div>
                <div className={"box_xx200"} onClick={this.logout}>退出登录</div>
            </Popover>
        );
    }

    /*方法说明
     *@method changeInfo
     *@for CommonLeft
     *@param nil
     *@return nil
    */
    changeInfo = () => {
        this.props.history.push({
            pathname: "/login",
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
        return (
            <div id={"commonLeft"}>

                <div
                    onClick={this.handleClick}
                    className={"box_278X1"}>


                    <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverBottom}>
                        <img className={"photo"}/>
                    </OverlayTrigger>

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
        );
    }
}

export default CommonLeft;
