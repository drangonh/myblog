import React from 'react';
import './index.scss';
import Header from "../../components/common/Header";
import BaseComponent from "../../components/common/BaseComponent";
import ListItem from "../../components/home/ListItem";
import SuspendBtn from "../../components/home/SuspendBtn";

class App extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrap">
                <Header/>
                <div className={"homeContent"}>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                </div>

                <SuspendBtn/>
            </div>
        );
    }
}

export default App;
