import {observable, action} from 'mobx';

class HeaderStore {
    @observable person;

    @action
    changeAge = i => {
        this.person.name = this.person.name + Number(i)
    }

    constructor() {
        this.person = {
            name: "黄龙",
            img: require("../static/image/person.png")
        }
    }
}

const header = new HeaderStore()
export default header
