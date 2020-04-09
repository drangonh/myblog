import React from 'react';
import './SuspendBtn.scss';

class SuspendBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "开门"
        }
    }

    suspendBtn = () => {
        const {suspendBtn} = this.props;
        this.setState((preState, props) => {
            return{
                title: preState.title == "开门" ? "关门" : "开门"
            }
        });
        suspendBtn && suspendBtn()
    }

    render() {
        const {title} = this.state;
        return (
            <div onClick={this.suspendBtn} className="suspendBtn">
               <p className={""}>{title}</p>
            </div>
        );
    }
}

export default SuspendBtn;
