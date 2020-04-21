import React from 'react';
import './SuspendBtn.scss';
import PropTypes from "prop-types"
import {Button, OverlayTrigger, Popover} from 'react-bootstrap';

class SuspendBtn extends React.Component {
    static  propTypes = {
        suspendBtn: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            title: "开门"
        }
        this.popoverLeft = (
            <Popover id="popover-positioned-left" className={"leftPopover"} title="">
                <Button onClick={this.addType}>新增分类</Button>
                <Button onClick={this.publish}>发布文章</Button>
            </Popover>
        );
    }

    addType = () => {

    };

    publish = () => {

    };

    suspendBtn = () => {
        const {suspendBtn} = this.props;
        this.setState((preState, props) => {
            return {
                title: preState.title == "开门" ? "关门" : "开门"
            }
        });
        suspendBtn && suspendBtn()
    }

    render() {
        const {title} = this.state;
        return (
            <div onClick={this.suspendBtn} className="suspendBtn">
                <OverlayTrigger rootClose={true} trigger="click" placement="left" overlay={this.popoverLeft}>
                    <Button className={"button"}>{title}</Button>
                </OverlayTrigger>
            </div>
        );
    }
}

export default SuspendBtn;
