import React from 'react';
import "./index.scss"
import {post} from "../../axios"
import {inject, observer} from "mobx-react";
import {createHashHistory} from "history"
const history = createHashHistory();

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

        post("login", params).then(res => {
            console.log("登录测试::", this.props)
            if (res.data) {
                const {header} = this.props;
                header.changeName(res.data);
                history.push("/home");

            }
        });
        this.setState((preState, props) => {
                return {
                    login: true
                }
            }
        )
    };

    register = () => {
        this.setState((preState, props) => {
                return {
                    login: false
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
                    type="text"
                    ref={ref => this.pwd = ref}
                    className={"editValue pwdMarginName"}
                    placeholder={"请输入密码"}
                />

                <input
                    hidden={login}
                    ref={ref => this.confirmPwd = ref}
                    type="text"
                    className={"editValue pwdMarginName"}
                    placeholder={"请再次输入密码"}
                />

                <div
                    onClick={this.login}
                    className="loginBtn pwdMarginName">
                    {login ? "登录" : "注册"}
                </div>

                <p hidden={!login} onClick={this.register} className="register pwdMarginName">注册</p>
            </div>
        )
    }
}


export default index
