import {observable,action,computed} from 'mobx';

class Store{

    @observable isLoggedin=false;
    @observable curuser=null;
    // @observable id=null;
    @observable addGrp=false;
    @observable groupNames=[];
}

const store=new Store();
export default store