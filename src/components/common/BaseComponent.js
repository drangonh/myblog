import React from 'react';
import Header from "./Header";

class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header/>
        );
    }
}

export default BaseComponent;
