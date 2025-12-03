import { LightningElement ,wire} from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import EXAMPLE_CHANNEL from '@salesforce/messageChannel/Example_Channel__c';


export default class SubscriberExampleComponent extends LightningElement {
    receivedMessage = 'No message received yet';
    subscription = null;
    @wire(MessageContext) 
      messageContext;
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            EXAMPLE_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }
    handleMessage(message) {
        this.receivedMessage = message.message;
    }
    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

}