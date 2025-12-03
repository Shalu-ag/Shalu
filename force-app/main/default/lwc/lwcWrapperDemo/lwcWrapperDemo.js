import { LightningElement,wire } from 'lwc';
import getAccountWithContact from '@salesforce/apex/WrapperDemo.getAccountWithContact'

export default class LwcWrapperDemo extends LightningElement {
    @wire(getAccountWithContact) wrapperList;
}