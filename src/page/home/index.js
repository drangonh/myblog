import React from 'react';
import '../../styles/home/index.scss';
import Header from "../../components/common/Header";
import BaseComponent from "../../components/common/BaseComponent";

class App extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Header/>
            </div>
        );
    }
}

export default App;
