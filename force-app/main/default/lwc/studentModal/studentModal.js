/*import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import STUDENT_NAME from '@salesforce/schema/Student__C.Name';
import STUDENT_AGE from '@salesforce/schema/Student__c.Age__c';
import STUDENT_EMAIL from '@salesforce/schema/Student__c.Email__c';


export default class StudentModal extends LightningElement {
    @api studentRecord
    fields = [STUDENT_NAME, STUDENT_AGE, STUDENT_EMAIL]
        
    get recordId() {
         return this.userRecord ? this.userRecord.Id : null;
        }
    
        get modalTitle() {
            return this.recordId ? 'Edit User' : 'Create New User';
        }
    
        handleCancel() {
            this.dispatchEvent(new CustomEvent('closemodal'));
        }
    
        handleSuccess() {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: this.recordId ? 'User updated successfully' : 'User created successfully',
                variant: 'success'
            }));
    
            this.dispatchEvent(new CustomEvent('closemodal'));
            this.dispatchEvent(new CustomEvent('successmodal'));
        }
        handleError(event) {
        console.error('Form Error:', JSON.stringify(event.detail, null, 2));
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error saving user',
                message: event.detail.message || 'Unknown error',
                variant: 'error'
            })
        );
    }
    }*/
    
    
