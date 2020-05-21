import React from 'react';
import './Header.scss';
import {observer, inject} from 'mobx-react';
import header from "../../store/header";

// const person = lazy(import("../../static/image/person.png"))

// inject 在模块内用 @inject('test')，将 test 注入到 props 上,保证结构的一致性
// 使用 @observer ，将组件变为观察者，响应 name,age 状态变化。
// 当状态变化时，组件也会做相应的更新。

// 观察者
@inject('header')
@inject('commonLeft')
@observer
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    changeName = () => {
        this.props.history.push("/login")
    };

    render() {
        const {header: {person}} = this.props;
        return (
            <div className="header">
                <div className={"homeLeft"} onClick={this.changeName}>
                    <img
                        className={"person"}
                        src={person.img}
                    />

                    <p className={"name"}>{person.userName}</p>
                </div>

                <div className={"right"}>
                    <div className={"box_642X1"}>

                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
