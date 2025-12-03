import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/contactExpClass.getContactList';

export default class ContactList extends LightningElement {
    @wire(getContactList)
    contacts;
}