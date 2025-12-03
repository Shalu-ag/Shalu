import { LightningElement,api,track,wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/LWCExampleController.getAllAccounts';


export default class LWCMessageController extends LightningElement {
    @api records;
    @api errors;


    @wire(getAllAccounts,{
     }
    )
    wiredCases({
        data,error
    }){
    if(data){
        this.records = data;
         this.errors = undefined;
    }
    if(error){
        this.errors = error;
        this.records = undefined;
        }
    }
}


