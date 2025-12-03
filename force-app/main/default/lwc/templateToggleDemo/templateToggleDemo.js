import { LightningElement,track } from 'lwc';


export default class TemplateToggleDemo extends LightningElement {
    @track toggleText = true;
    toggleHandler(){
        this.toggleText=false;
    }
    
}