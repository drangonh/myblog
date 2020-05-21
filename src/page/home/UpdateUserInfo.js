import React from 'react';
import "./UpdateUserInfo.scss"
import {post, get} from "../../axios"
import {inject, observer} from "mobx-react";

// 观察者
@inject('header')
@observer

class UpdateUserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true,//为true时代表登录，否则为注册
        }
    }

    login = () => {
        const params = {userName: this.name.value, passWord: this.pwd.value};

        get("user/logout", {}).then(res => {

            post("user/login", params).then(res => {
                console.log("登录测试::", res)
                if (res.data) {
                    const {header} = this.props;
                    header.changeInfo(res.data);
                    this.props.history.push("/home");
                    localStorage.setItem("userInfo", JSON.stringify(res.data))
                }
            });
        })

    };

    register = () => {
        const params = {
            Username: this.name.value,
            Password: this.pwd.value,
            ConfirmPassword: this.confirmPwd.value
        };

        post("user/register", params).then(res => {
            console.log(res)
            if (res.data) {
                const {header} = this.props;
                header.changeInfo(res.data);
                this.props.history.push("/home");
                localStorage.setItem("userInfo", JSON.stringify(res.data))
            }
        });
    };

    changeState = () => {
        this.setState((preState, props) => {
                return {
                    login: !this.state.login
                }
            }
        )
    };

    render() {
        const {login} = this.state;
        return (
            <div id={"updateInfo"}>

                <div className={"box_6747X3"}>

                    <p className={"text_6746X3"}>
                        请填写基本信息
                    </p>

                    <img
                        className={"default"}
                        src={require("../../static/image/defualt.jpeg")}
                    />

                    <div className={"text_12X1"}>
                        <input
                            placeholder={"请输入昵称"}
                            type={"text"}
                            className={"editValue"}
                        />
                    </div>

                    <div className={"text_12X1"}>
                        <input
                            placeholder={"请输入邮箱"}
                            type={"text"}
                            className={"editValue"}
                        />
                    </div>

                    <div className={"text_12X2"}>
                        <textarea
                            placeholder={"请输入个人介绍"}
                            type={"text"}
                            className={"editValue"}
                        />
                    </div>

                    <div className={"text_18X1 uac_jc"}>
                        完 成
                    </div>
                </div>

            </div>
        )
    }
}


export default UpdateUserInfo
