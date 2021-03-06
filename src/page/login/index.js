import React from 'react';
import "./index.scss"
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
            userName: this.name.value,
            passWord: this.pwd.value,
            confirmPassWord: this.confirmPwd.value
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
            <div className={"loginPage"}>
                <input type="text"
                       ref={ref => this.name = ref}
                       className={"editValue"}
                       placeholder={"请输入账号"}
                />

                <input
                    type="password"
                    ref={ref => this.pwd = ref}
                    className={"editValue pwdMarginName"}
                    placeholder={"请输入密码"}
                />

                <input
                    hidden={login}
                    ref={ref => this.confirmPwd = ref}
                    type="password"
                    className={"editValue pwdMarginName"}
                    placeholder={"请再次输入密码"}
                />

                <div
                    onClick={login ? this.login : this.register}
                    className="loginBtn pwdMarginName">
                    {login ? "登录" : "注册"}
                </div>

                <p onClick={this.changeState} className="register pwdMarginName">
                    {!login ? "登录" : "注册"}
                </p>
            </div>
        )
    }
}


export default index
