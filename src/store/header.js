import {observable, action} from 'mobx';

class HeaderStore {
    @observable person;

    @action
    changeInfo = obj => {
        this.person.userName = obj.userName;
        this.person.img = require("../static/image/person.png");
        this.person.info = obj;
    };

    constructor() {
        let info = JSON.parse(localStorage.getItem("userInfo"));
        console.log("个人信息", info)
        this.person = {
            userName: info ? info.userName : "黄龙",
            img: require("../static/image/person.png"),
            info: info
        }
    }
}

const header = new HeaderStore();
export default header
