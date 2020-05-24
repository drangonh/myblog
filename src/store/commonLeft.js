import {observable, action} from 'mobx';

class CommonLeftStore {
    @observable data;

    @action
    changeInfo = obj => {
        this.data = obj;
    };

    constructor() {
        this.data = []
    }
}

const header = new CommonLeftStore();
export default header

