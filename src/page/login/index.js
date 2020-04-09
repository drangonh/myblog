import React from 'react';
import "./index.scss"

export default class index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true,//为true时代表登录，否则为注册
        }
    }

    login = () => {
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
                       className={"editValue"}
                       placeholder={"请输入账号"}
                />

                <input
                    type="text"
                    className={"editValue pwdMarginName"}
                    placeholder={"请输入密码"}
                />

                <input
                    hidden={login}
                    type="text"
                    className={"editValue pwdMarginName"}
                    placeholder={"请再次输入密码"}
                />

                <div
                    onClick={this.login}
                    className={"loginBtn pwdMarginName"}>
                    <p>{login ? "登录" : "注册"}</p>
                </div>

                <p hidden={!login} onClick={this.register} className={"register pwdMarginNames"}>注册</p>
            </div>
        )
    }
}
