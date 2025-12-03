import { LightningElement,wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import EXAMPLE_CHANNEL from '@salesforce/messageChannel/Example_Channel__c';


export default class PublisherExampleComponent extends LightningElement {
    messageText = '';


    @wire(MessageContext)
    messageContext;
    handleMessageChange(event) {
        this.messageText = event.target.value;
    }
    publishMessage() {
        const payload = {
            message: this.messageText
        };  
        publish(this.messageContext, EXAMPLE_CHANNEL, payload);
    }

}