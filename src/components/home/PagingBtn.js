import React from 'react';
import './PagingBtn.scss';
import PropTypes from "prop-types"

class MiddleViewItem extends React.Component {
    static propTypes = {
        txt: PropTypes.any.isRequired,
        onPress: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {txt, onPress} = this.props;

        return (
            <div className={"item"} onClick={() => onPress && onPress(txt)}>
                {txt}
            </div>
        )
    }
}

class MiddleView extends React.Component {
    static propTypes = {
        start: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        onPress: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            arr: [],
            presentIndex: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        const {total} = nextProps;
        let arr = [];
        for (let i = 0; i < total; i++) {
            arr.push({
                txt: i + 1,
                key: "item" + i
            })
        }

        this.setState({
            arr: arr
        })
    }


    render() {
        const {arr} = this.state;
        const {onPress} = this.props;
        return (
            <div className={"middleView"}>
                {
                    arr.map((item, index) => {
                        return (
                            <MiddleViewItem
                                txt={item.txt}
                                key={item.key}
                                onPress={(txt) => {
                                    onPress && onPress(txt)
                                }}
                            />
                        )
                    })
                }
            </div>
        )

    }
}

class PagingBtn extends React.Component {
    static  propTypes = {
        total: PropTypes.number.isRequired,
        preBtn: PropTypes.func,
        nextBtn: PropTypes.func,
        onPress: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    addType = () => {
        const {suspendBtn} = this.props;
        suspendBtn && suspendBtn()
    };

    render() {
        const {total, preBtn, nextBtn, onPress} = this.props;
        console.log("共有多少分页", total)

        return (
            <div id="pagingBtn">
                <MiddleViewItem
                    className={"preBtn"}
                    txt={"<<"}
                    onPress={() => {
                        onPress && onPress()
                    }}
                />
                <MiddleView
                    start={1}
                    total={total}
                    onPress={(page) => {
                        onPress && onPress(page)
                    }}
                />
            </div>
        );
    }
}

export default PagingBtn;
