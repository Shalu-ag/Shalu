import { LightningElement, track } from 'lwc';
import getUsers from '@salesforce/apex/UserController.getUsers';

export default class UserManagement extends LightningElement {
    @track users = [];
    @track selectedRows = [];
    @track isModalOpen = false;
    @track selectedUser = null;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email' },
        { label: 'Username', fieldName: 'Username' },
        {
            type: 'button',
            typeAttributes: {
                label: 'Edit',
                name: 'edit',
                title: 'Edit',
                variant: 'brand'
            }
        }
    ];

    connectedCallback() {
        this.loadUsers();
    }

    loadUsers() {
        getUsers().then(result => {
            this.users = result;
        });
    }

    handleRowAction(event) {
        if (event.detail.action.name === 'edit') {
            this.selectedUser = { ...event.detail.row };
            this.isModalOpen = true;
        }
    }

    handleNewUser() {
        this.selectedUser = null;
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }

    handleSuccessModal() {
        this.loadUsers(); // Refresh data
    }
}
