import React from 'react';
import './index.scss';
import Header from "../../components/common/Header";
import BaseComponent from "../../components/common/BaseComponent";
import ListItem from "../../components/home/ListItem";

class App extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className={"homeContent"}>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                </div>

            </div>
        );
    }
}

export default App;
