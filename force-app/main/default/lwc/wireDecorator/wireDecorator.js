import { LightningElement,api,wire } from 'lwc';
import getInputMessage from '@salesforce/apex/MessageWire.getInputMessage';



export default class WireDecorator extends LightningElement {
    @api inputMessage = 'World';

    @wire(getInputMessage) inputMessage;
  handleChange(event) {
        console.log('event.target.value' + event.target.value);
        this.inputMessage = event.target.value;

}
}