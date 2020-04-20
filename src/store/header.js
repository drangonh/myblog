import {observable, action} from 'mobx';

class HeaderStore {
    @observable person;

    @action
    changeName = obj => {
        this.person.name = obj.userName
    };

    constructor() {
        this.person = {
            name: "黄龙",
            img: require("../static/image/person.png")
        }
    }
}

const header = new HeaderStore();
export default header
