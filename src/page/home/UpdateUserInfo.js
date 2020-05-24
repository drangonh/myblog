import React from 'react';
import "./UpdateUserInfo.scss"
import {post, get} from "../../axios"
import {inject, observer} from "mobx-react";
import {uploadImage} from "../../utils/oss";

// 观察者
@inject('header')
@observer
class UpdateUserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true,//为true时代表登录，否则为注册
            photo: "",
            email: '',
            nickName: "",
            description: ""
        }
    }

    componentDidMount() {
        const {header: {person}} = this.props;
        this.setState({
            photo: person.avatar,
            email: person.email,
            nickName: person.nickName,
            description: person.description
        })
    }

    addImage = () => {
        this.input.click();//触发input：file的click事件，
    };

    handleImageChange = async (e) => {//处理图片
        const file = e.target.files[0];

        uploadImage(file, file.name, (res) => {
            console.log(res)
            this.setState({
                photo: res.url
            })
        })
    };

    upload = async () => {
        const params = {
            avatar: this.state.photo,
            email: this.state.email,
            nickName: this.state.nickName,
            description: this.state.description
        }
        console.log(params)
        const res = await post("/profile/editUserProfile", params)

        console.log(res)
        if (res.data) {
            const {header} = this.props;

            //清除input值
            this.email.value = ""

            header.changeInfo(res.data);
            this.props.history.push("/home");
            localStorage.setItem("userInfo", JSON.stringify(res.data))
        }
    }

    render() {
        const {photo} = this.state;
        return (
            <div id={"updateInfo"}>
                <div className={"box_6747X3"}>

                    <p className={"text_6746X3"}>
                        请填写基本信息
                    </p>

                    <div onClick={this.addImage}>
                        <input
                            style={{
                                display: 'none'
                            }}
                            ref={(el) => {
                                this.input = el
                            }}
                            type='file'
                            accept='image/*'
                            onChange={this.handleImageChange}
                        />

                        <img
                            className={"default"}
                            src={photo.length != 0 ?
                                photo
                                : require("../../static/image/defualt.jpeg")
                            }
                        />
                    </div>

                    <div className={"text_12X1"}>
                        <input
                            placeholder={"请输入昵称"}
                            type={"text"}
                            className={"editValue"}
                            ref={v => this.nickName = v}
                            value={this.state.nickName}
                            onChange={(e) => {
                                this.setState({
                                    nickName: e.target.value
                                })
                            }}
                        />
                    </div>

                    <div className={"text_12X1"}>
                        <input
                            placeholder={"请输入邮箱"}
                            type={"text"}
                            className={"editValue"}
                            ref={v => this.email = v}
                            value={this.state.email}
                            onChange={(e) => {
                                this.setState({
                                    email: e.target.value
                                })
                            }}
                        />
                    </div>

                    <div className={"text_12X2"}>
                        <textarea
                            placeholder={"请输入个人介绍"}
                            type={"text"}
                            className={"editValue"}
                            ref={v => this.info = v}
                            value={this.state.description}
                            onChange={(e) => {
                                this.setState({
                                    description: e.target.value
                                })
                            }}
                        />
                    </div>

                    <div
                        onClick={this.upload}
                        className={"text_18X1 uac_jc"}>
                        完 成
                    </div>
                </div>

            </div>
        )
    }
}


export default UpdateUserInfo
