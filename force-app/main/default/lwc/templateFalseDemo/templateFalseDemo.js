import { LightningElement,track } from 'lwc';

export default class TemplateFalseDemo extends LightningElement {
    @track hideText =false;
    hideHandler(){
        this.hideText = true;
    }

}