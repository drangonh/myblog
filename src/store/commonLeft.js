import {observable, action} from 'mobx';

class CommonLeftStore {
    @observable userInfo;

    @action
    changeInfo = obj => {
        console.log("獲取分類：：：：", obj)
        this.userInfo = obj;
    };

    constructor() {
        this.userInfo = {}
    }
}

const header = new CommonLeftStore();
export default header

