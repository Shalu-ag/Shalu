import { LightningElement,track } from 'lwc';

export default class GetterSetter extends LightningElement {
    defaultMsg = "We are learning";
    @track outputMessage;

    getMessage(){
        return this.defaultMsg+"Lightning Web Component";
    }
     setMessage(val){
        this.outputMessage = val;
     }
     handleMessage(event){
            this.message = event.target.value;
     }
}