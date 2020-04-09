import React from 'react';
import BaseComponent from "../components/common/BaseComponent";
import Home from "./home/index"
import Login from "./login/index"
import {
    //// as的作用为将HashRouter重命名为Router,这样的好处是在反复测试HashRouter和BrowserRouter时,可以免去组件修改
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom"

/*
* 这里Redirect必须放在所有的Route之后，而且
* */

class App extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                {/*Switch匹配到一个结果后就不会继续匹配*/}
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>

                    <Route path="/home">
                        <Home/>
                    </Route>

                    {/*Redirect写法一*/}
                    {/*<Route path="/">*/}
                    {/*<Redirect to="/home"/>*/}
                    {/*</Route>*/}

                    {/*Redirect写法二*/}
                    <Redirect from='/' to="/home"/>
                </Switch>
            </Router>
        );
    }
}

export default App;
