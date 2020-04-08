import React from 'react';
import logo from '../../logo.svg';
import '../../styles/home/index.scss';
import {observer, inject} from 'mobx-react';
import Header from "../../components/common/Header";
import BaseComponent from "../../components/common/BaseComponent";

// inject 在模块内用 @inject('test')，将 test 注入到 props 上,保证结构的一致性
// 使用 @observer ，将组件变为观察者，响应 name,age 状态变化。
// 当状态变化时，组件也会做相应的更新。

// 观察者
@inject('test')
@observer
class App extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {test} = this.props;
        console.log(test)
        return (
            <div className="App">
                <Header/>
            </div>
        );
    }
}

export default App;
