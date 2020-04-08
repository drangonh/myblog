import React, {lazy} from 'react';
import logo from '../../logo.svg';
import '../../styles/common/header.scss';
import {observer, inject} from 'mobx-react';
import header from "../../store/header";

// const person = lazy(import("../../static/image/person.png"))

// inject 在模块内用 @inject('test')，将 test 注入到 props 上,保证结构的一致性
// 使用 @observer ，将组件变为观察者，响应 name,age 状态变化。
// 当状态变化时，组件也会做相应的更新。

// 观察者
@inject('header')
@observer
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    changeName = () => {
        const {header} = this.props;
        header.changeAge(3)
    };

    render() {
        const {header: {person}} = this.props;
        return (
            <div className="header">
                <div className={"left"} onClick={this.changeName}>
                    <img
                        className={"person"}
                        src={person.img}
                    />

                    <p className={"name"}>{person.name}</p>
                </div>

                <div className={"right"}>
                    <img
                        className={"list"}
                        src={require("../../static/image/list.png")}
                    />

                    <img
                        className={"home"}
                        src={require("../../static/image/home.png")}
                    />
                </div>
            </div>
        );
    }
}

export default Header;