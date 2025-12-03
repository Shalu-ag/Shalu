import { LightningElement } from 'lwc';

export default class PracticeBinding extends LightningElement {
    fullName ="Shalu";
    title ="developer";
    message="I am learning LWC";

    changeHandler(event){
        this[event.target.name]=event.target.value;
    }
    handleChange(event){
        this.message=event.target.value;
    }

}