import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ToastMessageComponent extends LightningElement {
    showErrorToast(){
        const evt = new ShowToastEvent({
            title:'Toast Error',
            message: 'Some unexpected error',
            variant:'error',
            mode:'dismissable'
        });
        this.dispatchEvent(evt);
    }
    showSuccessToast(){
        const evt = new ShowToastEvent({
            title:'Toast Success',
            message: 'operation successful',
            variant:'success',
            mode:'dismissable'
        });
        this.dispatchEvent(evt);

    }
    showWarningToast(){
        const evt = new ShowToastEvent({
            title:'Toast Warning',
            message: 'Some problem',
            variant:'warning',
            mode:'dismissable'
        });
        this.dispatchEvent(evt);
    }
    showInfoToast(){
        const evt = new ShowToastEvent({
            title:'Toast Info',
            message: 'operation will run in background',
            variant:'info',
            mode:'dismissable'
        });
        this.dispatchEvent(evt);
    }
}
