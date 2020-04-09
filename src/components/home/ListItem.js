import React from 'react';
import './listItem.scss';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="homeList">
                <p className={"homeTitle"}>
                    Edit <code>src/App.js</code> and save to reload.
                </p>

                <p className={"homeTitle"}>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default ListItem;
