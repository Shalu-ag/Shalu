import { api,LightningElement } from 'lwc';

export default class GetChildComponent extends LightningElement {
    name="xyz";
    @api
    get itemName(){
        return this.name;
    }
set itemName(value){
    //this.name=value.toLowerCase();
    this.name=value.toUpperCase();

}
}