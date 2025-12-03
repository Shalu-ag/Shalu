import { LightningElement,track } from 'lwc';

export default class TwoWayDataBinding extends LightningElement {
     fullname="Shalu agrawal";
     title="salesforce developer";
    changeHandler(event){
        this[event.target.name]= event.target.value;
    }
}