import {observable, action} from 'mobx';

class HeaderStore {
    @observable person;

    @action
    changeInfo = obj => {
        console.log(obj)
        this.person = obj;
    };

    constructor() {
        let info = JSON.parse(localStorage.getItem("userInfo"));
        console.log(info)
        this.person = info ? info : null

    }
}

const header = new HeaderStore();
export default header

