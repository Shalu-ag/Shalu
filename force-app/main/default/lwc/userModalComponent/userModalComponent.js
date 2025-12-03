import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import USER_NAME from '@salesforce/schema/User.Name';
import USER_ISACTIVE from '@salesforce/schema/User.IsActive';
import USER_EMAIL from '@salesforce/schema/User.Email';
import USER_ALIAS from '@salesforce/schema/User.Alias';
import USER_LOCALESIDKEY from '@salesforce/schema/User.LocaleSidKey';
import USER_LANGUAGELOCALEKEY from '@salesforce/schema/User.LanguageLocaleKey';
import USER_TIMEZONESIDKEY from '@salesforce/schema/User.TimeZoneSidKey';
import USER_EMAILENCODINGKEY from '@salesforce/schema/User.EmailEncodingKey';
import USER_PROFILEID from '@salesforce/schema/User.ProfileId';

export default class UserModalComponent extends LightningElement {
    @api userRecord;

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
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error saving user',
            message: event.detail.message || 'Unknown error',
            variant: 'error'
        }));
    }
}
