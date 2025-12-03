import { LightningElement, wire, track } from 'lwc';
import getAllAccountsWithContactsList from '@salesforce/apex/AccountContactController.getAllAccountsWithContacts';
export default class WrapperClassExampleLWC extends LightningElement {
    @track accountsWithContacts;
    @track error;
    @wire(getAllAccountsWithContactsList)
    wiredAccountsWithContacts({ error, data }) {
        if (data) {
            this.accountsWithContacts = data;
        } else if (error) {
            console.log(error);
            this.error = error;
        }
    }
}