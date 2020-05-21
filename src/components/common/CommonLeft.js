import React from 'react';
import "./CommonLeft.scss"

class CommonLeft extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"left"}>

                <div className={"box_278X1"}>
                    <div className={"photo"}>

                    </div>

                    <h4>Web Bolg</h4>

                    <p>
                        Only the harvest，to test the significance of the work；
                        only the contribution，
                        the value of the square
                        can be measured。
                    </p>
                </div>

                <div className={"box_275X1"}>
                    <div className={"wrapper_118X1"}>
                        <div className={"text_268X1"}>1</div>
                        <div className={"text_269X1"}>文章</div>
                    </div>

                    <div className={"wrapper_118X1"}>
                        <div className={"text_268X1"}>1</div>
                        <div className={"text_269X1"}>分类</div>
                    </div>

                    <div className={"wrapper_118X1"}>
                        <div className={"text_268X1"}>1</div>
                        <div className={"text_269X1"}>Tags</div>
                    </div>
                </div>

            </div>
        );
    }
}

export default CommonLeft;
