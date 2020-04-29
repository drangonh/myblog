import React from 'react';
import './listItem.scss';
import PropTypes from 'prop-types'

class ListItem extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired
    }

    render() {
        const {item} = this.props;
        return (
            <div className="listItem">
                <div className={"title"}>
                    {item.languageTitle}
                </div>

                <div className={"content"}>
                    {item.languageContent}
                </div>
            </div>
        );
    }
}

export default ListItem;
