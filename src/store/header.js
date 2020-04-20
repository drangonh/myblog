import {observable, action} from 'mobx';

class HeaderStore {
    @observable person;

    @action
    changeInfo = obj => {
        this.person.userName = obj.userName;
    };

    constructor() {
        let info = JSON.parse(localStorage.getItem("userInfo"));
        this.person = {
            userName: info ? info.userName : "黄龙",
            img: require("../static/image/person.png")
        }
    }
}

const header = new HeaderStore();
export default header
