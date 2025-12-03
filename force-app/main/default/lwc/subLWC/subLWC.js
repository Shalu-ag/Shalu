import { LightningElement , wire } from 'lwc';
import {subscribe,MessageContext} from 'lightning/messageService';
import COUNTING_UPDATED_CHANNEL from '@salesforce/messageChannel/Counting_Update__c';
;
export default class SubLWC extends LightningElement {
    counter =0;
     Subscription = null;   
     @wire(MessageContext)
     messageContext;

     connectedCallback(){
         this.subscribeToMessageChannel();

     }
     subscribeToMessageChannel(){
        this.Subscription = subscribe(
            this.messageContext,
            COUNTING_UPDATED_CHANNEL,
            message => this.handleMessage(message)
        );
     }
     handleMessage(message){
        if(message.operator =='add'){
            this.counter += message.constant;
        }
        else if(message.operator == 'substract'){
            this.counter -= message.constant;
        }
        else if(message.operator == 'multiply'){
        this.counter *= message.constant;
   
      }
       else if(message.operator == 'divide'){
        this.counter /= message.constant;
     }

        else if(message.operator =='clear'){
            this.counter =0;
        }
        else if(message.operator == 'percentage'){
            this.counter = (this.counter/100)* message.constant;
            console.log('this.counter:' + this.counter);
        }

     }
}