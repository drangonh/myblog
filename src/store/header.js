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
        this.person = {
            userName: info ? info.userName : "登录",
            img: require("../static/image/person.png"),
            info: info ? info : {}
        }
    }
}

const header = new HeaderStore();
export default header
