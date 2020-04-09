import React from 'react';
import './listItem.scss';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="homeList">
                <div className={"homeTitle"}>Javascript学习记录</div>
                <div className={"homeContent"}>学习最新的语法</div>
            </div>
        );
    }
}

export default ListItem;
