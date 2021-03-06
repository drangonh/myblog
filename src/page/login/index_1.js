import React from 'react';
import "./index_1.scss"
import {post, get} from "../../axios"
import {inject, observer} from "mobx-react";

// 观察者
@inject('header')
@observer

class index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true,//为true时代表登录，否则为注册
        }

        const {header} = this.props;
        console.log(header)
    }

    login = () => {
        const params = {userName: this.name.value, passWord: this.pwd.value};

        post("user/login", params).then(res => {
            console.log("登录测试::", res)
            if (res.data) {
                const {header} = this.props;
                header.changeInfo(res.data);
                this.props.history.push("/home");
                localStorage.setItem("userInfo", JSON.stringify(res.data))
            }
        });

    };

    register = () => {
        const params = {
            Username: this.name.value,
            Password: this.pwd.value,
            ConfirmPassword: this.confirmPwd.value
        };

        post("user/register", params).then(res => {

            if (res.data) {
                const {header} = this.props;
                header.changeInfo({
                    uid: res.data.userId,
                    avatar: "",
                    email: "",
                    nickName: "",
                    description: ""
                });

                this.props.history.push("/updateInfo");
            }
        });
    };

    changeState = (res) => {
        console.log(res)
        this.setState((preState, props) => {
                return {
                    login: res
                }
            }
        )
    };

    render() {
        const {login} = this.state;
        return (
            <div id={"loginPage"}>
                <div className={"box_1X1"}>

                </div>

                <div className={"box_2X1"}>

                    {/*左*/}
                    <div className={"wrapper_2X1 uac"}>

                        <div className={"wrapper_2X2 "}>
                            <div
                                onClick={() => this.changeState(true)}
                                className={login ? "wrapper_2X3 uac_jc" : "wrapper_2X4 uac_jc"}>
                                密码登录
                            </div>

                            <div
                                onClick={() => this.changeState(false)}
                                className={login ? "wrapper_2X4 uac_jc" : "wrapper_2X3 uac_jc"}>
                                注册
                            </div>
                        </div>

                        <div className={"text_12X1"}>
                            <input
                                placeholder={"请输入常用账号"}
                                type={"text"}
                                className={"editValue"}
                                ref={ref => this.name = ref}
                            />
                        </div>

                        <div className={"text_12X1 margin-top28"}>
                            <input
                                placeholder={"请输入密码"}
                                type={"password"}
                                className={"editValue"}
                                ref={ref => this.pwd = ref}
                            />
                        </div>

                        <div
                            hidden={login}
                            className={"text_12X1 margin-top28"}>
                            <input
                                placeholder={"请再次输入密码"}
                                type={"password"}
                                className={"editValue"}
                                ref={ref => this.confirmPwd = ref}
                            />
                        </div>

                        <div
                            hidden={!login}
                            className={"box_202"}>
                            <div className={"text_17X1"}>
                                忘记密码?
                            </div>
                        </div>

                        <div
                            onClick={login ? this.login : this.register}
                            className={"text_18X1 uac_jc"}>
                            {login ? "登 录" : "注 册"}
                        </div>
                    </div>

                    {/*右边*/}
                    <div className={"box_203 uac_jc"}>
                        <div className={"text_21X1"}>
                            使用以下账号直接登录:
                        </div>

                        <div className={"box_204"}>
                            <img
                                className={"wechat margin-right20"}
                                src={require("../../static/image/wechat.png")}
                            />

                            <img
                                className={"qq"}
                                src={require("../../static/image/QQ.png")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default index
