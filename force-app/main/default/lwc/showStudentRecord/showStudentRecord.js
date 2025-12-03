import { LightningElement, track, wire } from 'lwc';
import getActiveStudents from '@salesforce/apex/StudentInformation.getActiveStudents';

export default class StudentFilter extends LightningElement {
    @track allStudents = [];
    @track filteredStudents = [];
    @track numberOfRecords = '';
    @track showError = false;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Course', fieldName: 'Course__c' },
        { label: 'College', fieldName: 'College__c' },
        { label: 'Active', fieldName: 'Active__c', type: 'boolean' }
    ];

    @wire(getActiveStudents)
    wiredStudents({ error, data }) {
        if (data) {
            this.allStudents = data;
            this.filteredStudents = data;
        } else if (error) {
            console.error('Error fetching student records:', error);
        }
    }

    handleInputChange(event) {
        const value = parseInt(event.target.value, 10);
        this.numberOfRecords = value;

        if (value > 0) {
            this.showError = false;
            this.filteredStudents = this.allStudents.slice(0, value);
        } else {
            this.showError = true;
            this.filteredStudents = [];
        }
    }
}