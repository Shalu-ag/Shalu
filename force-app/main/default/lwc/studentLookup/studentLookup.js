import { LightningElement,track,wire } from 'lwc';
//import { LightningElement, track, wire } from 'lwc';
import getSchools from '@salesforce/apex/StudentController.getSchools';
import getClassesBySchoolId from '@salesforce/apex/StudentController.getClassesBySchoolId';
import getStudentsByClassId from '@salesforce/apex/StudentController.getStudentsByClassId';
const ACTIONS = [
    { label: 'Edit', name: 'edit' }
];

export default class StudentLookup extends LightningElement {
    

    @track selectedUser = null;
    @track isModalOpen = false;
    @track schoolOptions = [];
    @track classOptions = [];
    @track students = [];
    selectedSchoolId;
    selectedClassId;
    isClassDisabled = true;

    columns = [
        { label: 'Student Name', fieldName: 'Name' },
        { label: 'Class', fieldName: 'Class__r.Name' },
        { label: 'Age', fieldName: 'Age__c' },
        { label: 'Email', fieldName: 'Email__c' },
        {
        type: 'action',
        typeAttributes: { rowActions: ACTIONS }
    }
    ];

    @wire(getSchools)
    wiredSchools({ data, error }) {
        if (data) {
            this.schoolOptions = data.map(school => ({
                label: school.Name,
                value: school.Id
            }));
        } else if (error) {
            console.error(error);
        }
    }

    handleSchoolChange(event) {
        this.selectedSchoolId = event.detail.value;
        this.selectedClassId = undefined;
        this.classOptions = [];
        this.students = [];
        this.isClassDisabled = false;

        getClassesBySchoolId({ schoolId: this.selectedSchoolId })
            .then(data => {
                this.classOptions = data.map(cls => ({
                    label: cls.Name,
                    value: cls.Id
                }));
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleClassChange(event) {
        this.selectedClassId = event.detail.value;
        this.fetchStudents();
    }

    fetchStudents() {
        getStudentsByClassId({ classId: this.selectedClassId })
            .then(data => {
                this.students = data;
            })
            .catch(error => {
                console.error(error);
            });
    }
    handleNew() {
        this.selectedUser = null;
        this.isModalOpen = true;
    }
    handleRowAction(event) {
        const action = event.detail.action.name;
        const row = event.detail.row;

        if (action === 'edit') {
            this.selectedUser = { ...row };
            this.isModalOpen = true;
        }
    }

}


