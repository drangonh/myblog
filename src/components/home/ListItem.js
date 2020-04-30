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
            <div onSelect={this.openPageList} className="listItem">
                <div className={"title"}>
                    {item.languageTitle}
                </div>

                <div className={"content"}>
                    {item.languageContent}
                </div>
            </div>
        );
    }

    //跳转到指定语言分类的文章列表
    openPageList = () => {
        this.props.history({
            pathname: "",
            state: {}
        })
    }
}

export default ListItem;
