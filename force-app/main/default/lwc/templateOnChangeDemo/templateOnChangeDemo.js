import { LightningElement,track } from 'lwc';

export default class TemplateOnChangeDemo extends LightningElement {
    @track inputText = null;
    changeHandler(event){
       
        this.inputText = event.target.value;
    }
    get checkText(){
        return this.inputText ==="Hi";
    }
}