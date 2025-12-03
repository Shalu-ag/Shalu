import { LightningElement, track } from 'lwc';
import getSchools from '@salesforce/apex/StudentController.getSchools';
import getClassesBySchool from '@salesforce/apex/StudentController.getClassesBySchool';
import getStudentsByClass from '@salesforce/apex/StudentController.getStudentsByClass';
import saveStudent from '@salesforce/apex/StudentController.saveStudent';
import deleteStudents from '@salesforce/apex/StudentController.deleteStudents';
import updateStudent from '@salesforce/apex/StudentController.updateStudent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import addOrUpdateStudent from '@salesforce/apex/StudentController.addOrUpdateStudent';


export default class StudentManagement extends LightningElement {
    @track selectedSchoolId = '';
    @track selectedClassId = '';
    @track schoolOptions = [];
    @track classOptions = [];
    @track studentList = [];
    @track selectedRowIds = [];
    @track showModal = false;
    @track studentName = '';
    @track studentAge = '';
    @track studentEmail = '';
    @track currentStudentId = '';
    @track isEditMode = false;

    get disableClassDropdown() {
        return !this.selectedSchoolId;
    }

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Class', fieldName: 'ClassName' },
        { label: 'Age', fieldName: 'Age__c' },
        { label: 'Email', fieldName: 'Email__c' },
        {
            type: 'button',
            typeAttributes: {
                label: 'Edit',
                name: 'edit',
                title: 'Edit',
                variant: 'base'
            }
        }
    ];

    connectedCallback() {
        this.loadSchools();
    }

    loadSchools() {
        getSchools().then(result => {
            this.schoolOptions = result.map(school => ({
                label: school.Name,
                value: school.Id
            }));
        });
    }

    handleSchoolChange(event) {
        this.selectedSchoolId = event.detail.value;
        this.selectedClassId = '';
        this.classOptions = [];
        this.studentList = [];
        this.loadClasses();
    }

    loadClasses() {
        getClassesBySchool({ schoolId: this.selectedSchoolId })
            .then(result => {
                this.classOptions = result.map(cls => ({
                    label: cls.Name,
                    value: cls.Id
                }));
            });
    }

    handleClassChange(event) {
        this.selectedClassId = event.detail.value;
        if (!this.isEditMode) {
            this.loadStudents();
        }
    }

    loadStudents() {
        getStudentsByClass({ classId: this.selectedClassId })
            .then(result => {
                this.studentList = result.map(student => ({
                ...student,
                ClassName: student.Class__r ? student.Class__r.Name : ''
            }));
                
            });
    }

    handleRowSelection(event) {
        this.selectedRowIds = event.detail.selectedRows.map(row => row.Id);
    }

    handleDelete() {
        if (this.selectedRowIds.length === 0) {
            this.showToast('Error', 'Please select at least one student to delete.', 'error');
            return;
        }

        deleteStudents({ studentIds: this.selectedRowIds })
            .then(() => {
                this.showToast('Success', 'Selected students deleted.', 'success');
                this.selectedRowIds = [];
                this.loadStudents();
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    handleNew() {
        this.resetForm();
        this.showModal = true;
        this.isEditMode = false;
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if (actionName === 'edit') {
            this.currentStudentId = row.Id;
            this.studentName = row.Name;
            this.studentAge = row.Age__c;
            this.studentEmail = row.Email__c;
            this.selectedClassId = row.Class__c;
            this.selectedSchoolId = row.School__c;
            this.showModal = true;
            this.isEditMode = true;
        }
    }

    handleNameChange(event) {
        this.studentName = event.target.value;
    }

    handleAgeChange(event) {
        this.studentAge = event.target.value;
    }

    handleEmailChange(event) {
        this.studentEmail = event.target.value;
    }

    closeModal() {
        this.showModal = false;
    }

    handleSave() {
        if (!this.studentName || !this.studentAge || !this.studentEmail || !this.selectedClassId) {
            this.showToast('Error', 'All fields are required', 'error');
            return;
        }

        const payload = {
            name: this.studentName,
            age: parseInt(this.studentAge, 10),
            email: this.studentEmail,
            classId: this.selectedClassId,
            schoolId: this.selectedSchoolId
        };

        if (this.isEditMode && this.currentStudentId) {
    const updatedStudent = {
        Id: this.currentStudentId,
        Name: this.studentName,
        Age__c: parseInt(this.studentAge, 10),
        Email__c: this.studentEmail,
        Class__c: this.selectedClassId
    };

    addOrUpdateStudent({ student: updatedStudent })
        .then(() => {
            this.showToast('Success', 'Student updated successfully', 'success');
            this.loadStudents();
            this.showModal = false;
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
} else {
    // For new student
    const newStudent = {
        Name: this.studentName,
        Age__c: parseInt(this.studentAge, 10),
        Email__c: this.studentEmail,
        Class__c: this.selectedClassId
    };

    addOrUpdateStudent({ student: newStudent })
        .then(() => {
            this.showToast('Success', 'Student added successfully', 'success');
            this.loadStudents();
            this.showModal = false;
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
}

                /*.then(() => {
                    this.showToast('Success', 'Student updated successfully', 'success');
                    this.loadStudents();
                    this.showModal = false;
                })
                .catch(error => {
                    this.showToast('Error', error.body.message, 'error');
                });
        } else {
            saveStudent(payload)
                .then(() => {
                    this.showToast('Success', 'Student added successfully', 'success');
                    this.loadStudents();
                    this.showModal = false;
                })
                .catch(error => {
                    this.showToast('Error', error.body.message, 'error');
                });
        }*/
    }

    resetForm() {
        this.studentName = '';
        this.studentAge = '';
        this.studentEmail = '';
        this.currentStudentId = '';
        this.selectedClassId = '';
        this.selectedSchoolId ='';
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
    get modalTitle() {
    return this.isEditMode ? 'Edit Student' : 'New Student';
}
}


