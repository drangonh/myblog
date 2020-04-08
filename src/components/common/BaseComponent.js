import React from 'react';
import Header from "./Header";

class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {render} = this.props;
        return (
            <div>
                <Header/>
                {render && render()}
            </div>
        );
    }
}

export default BaseComponent;
