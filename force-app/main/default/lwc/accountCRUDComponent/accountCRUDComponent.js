import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getAccounts from '@salesforce/apex/AccountControllerPagination.getAccounts';
import createAccount from '@salesforce/apex/AccountControllerPagination.createAccount';
import updateAccount from '@salesforce/apex/AccountControllerPagination.updateAccount';
import deleteAccount from '@salesforce/apex/AccountControllerPagination.deleteAccount';

export default class accountCRUDComponent extends LightningElement {
//@track accounts;
    @track visibleAccounts;
    @track currentPage = 1;
    @track recordSize = 10;
    @track totalPages = 0;
    @track totalRecords = 0;
   


    @track accounts = [];
    @track showForm = false;
    @track showDeleteModal = false;
    @track selectedAccountId = null;
    @track accountToDelete = {};
    @track formTitle = 'New Account';
    @track isLoading = false;
    @track selectedRows = [];
    @api title='';
    @api showSearch=false;
    @api maxRecords=1000;
    
    // Data table columns configuration
    columns = [
        { label: 'Account Name', fieldName: 'Name', type: 'text', sortable: true },
        { label: 'Account Number', fieldName: 'AccountNumber', type: 'text' },
        { label: 'Type', fieldName: 'Type', type: 'text' },
        { label: 'Industry', fieldName: 'Industry', type: 'text' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Website', fieldName: 'Website', type: 'url' },
        { label: 'Email__c', fieldName: 'Email__c', type: 'Email' },
        { label: 'Rating', fieldName: 'Rating' , type:'Picklist'},
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date', sortable: true },
        {
            type: 'action',
            typeAttributes: {
                rowActions: [
                    { label: 'Edit', name: 'edit', iconName: 'utility:edit' },
                    { label: 'Delete', name: 'delete', iconName: 'utility:delete' }
                ]
            }
        }
    ];

    // Wire the accounts data
    wiredAccountsResult;

    @wire(getAccounts)
    wiredAccounts(result) {
        this.wiredAccountsResult = result;
        if (result.data) {
            this.visibleAccounts = result.data;
            this.totalRecords = result.data.length;
            this.totalPages = Math.ceil(this.totalRecords / this.recordSize);
            this.updateRecords();
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.accounts = [];
        }
    }
   
     get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === this.totalPages;
    }
    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.updateRecords();
        }
    }

    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage = this.currentPage + 1;
            this.updateRecords();
        }
    }

    updateRecords() {
       const start = (this.currentPage - 1) * this.recordSize;
       const end = this.currentPage * this.recordSize;
       this.accounts = this.visibleAccounts.slice(start, end);
    }


    // Handle new account button click
    handleNewAccount() {
        this.selectedAccountId = null;
        this.formTitle = 'New Account';
        this.showForm = true;
    }

    // Handle edit button click
    handleEdit(event) {
        const accountId = event.target.dataset.id;
        this.selectedAccountId = accountId;
        this.formTitle = 'Edit Account';
        this.showForm = true;
    }

    // Handle delete button click
    handleDelete(event) {
        const accountId = event.target.dataset.id;
        const account = this.accounts.find(acc => acc.Id === accountId);
        this.accountToDelete = account;
        this.showDeleteModal = true;
    }

    // Handle row actions (edit/delete)
    handleRowAction(event) {
        const { action, row } = event.detail;
        if (action.name === 'edit') {
            this.selectedAccountId = row.Id;
            this.formTitle = 'Edit Account';
            this.showForm = true;
        } else if (action.name === 'delete') {
            this.accountToDelete = row;
            this.showDeleteModal = true;
        }
    }

    // Handle form submission
    handleSubmit(event) {
        event.preventDefault();
        this.isLoading = true;
        
        const fields = event.detail.fields;
        
        if (this.selectedAccountId) {
            // Update existing account
            fields.Id = this.selectedAccountId;
            this.updateAccountRecord(fields);
        } else {
            // Create new account
            this.createAccountRecord(fields);
        }
    }

    // Create account using Apex
    async createAccountRecord(fields) {
        try {
            await createAccount({ accountData: JSON.stringify(fields) });
            this.showToast('Success', 'Account created successfully!', 'success');
            this.closeForm();
            this.refreshData();
        } catch (error) {
            this.showToast('Error', 'Failed to create account: ' + error.body.message, 'error');
        } finally {
            this.isLoading = false;
        }
    }

    // Update account using Apex
    async updateAccountRecord(fields) {
        try {
            await updateAccount({ accountData: JSON.stringify(fields) });
            this.showToast('Success', 'Account updated successfully!', 'success');
            this.closeForm();
            this.refreshData();
        } catch (error) {
            this.showToast('Error', 'Failed to update account: ' + error.body.message, 'error');
        } finally {
            this.isLoading = false;
        }
    }

    // Delete account using Apex
    async handleDeleteConfirm() {
        try {
            this.isLoading = true;
            await deleteAccount({ accountId: this.accountToDelete.Id });
            this.showToast('Success', 'Account deleted successfully!', 'success');
            this.closeDeleteModal();
            this.refreshData();
        } catch (error) {
            this.showToast('Error', 'Failed to delete account: ' + error.body.message, 'error');
        } finally {
            this.isLoading = false;
        }
    }

    // Handle form cancel
    handleCancel() {
        this.closeForm();
    }

    // Handle delete modal cancel
    handleDeleteCancel() {
        this.closeDeleteModal();
    }

    // Close form
    closeForm() {
        this.showForm = false;
        this.selectedAccountId = null;
        this.formTitle = 'New Account';
    }

    // Close delete modal
    closeDeleteModal() {
        this.showDeleteModal = false;
        this.accountToDelete = {};
    }

    // Refresh data
    async handleRefresh() {
    this.isLoading = true;
    try {
        await refreshApex(this.wiredAccountsResult);
        if (this.wiredAccountsResult.data) {
            this.visibleAccounts = this.wiredAccountsResult.data;
            this.totalRecords = this.visibleAccounts.length;
            this.totalPages = Math.ceil(this.totalRecords / this.recordSize);
            this.currentPage = 1;
            this.updateRecords();
        }
        this.showToast('Success', 'Data refreshed successfully!', 'success');
    } catch (error) {
        this.showToast('Error', 'Failed to refresh data', 'error');
    } finally {
        this.isLoading = false;
    }
}


    // Refresh data method
    refreshData() {
        return refreshApex(this.wiredAccountsResult);
    }

    // Handle row selection
    handleRowSelection(event) {
        this.selectedRows = event.detail.selectedRows;
    }

    // Handle sorting
    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        
        // Sort the accounts array
        this.accounts.sort((a, b) => {
            let aValue = a[fieldName];
            let bValue = b[fieldName];
            
            if (aValue === null || aValue === undefined) aValue = '';
            if (bValue === null || bValue === undefined) bValue = '';
            
            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }

    // Show toast message
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }

    // Handle form success (fallback)
    handleSuccess() {
        this.showToast('Success', 'Operation completed successfully!', 'success');
        this.closeForm();
        this.refreshData();
    }

    // Handle form error (fallback)
    handleError(event) {
        this.showToast('Error', 'An error occurred: ' + event.detail.message, 'error');
    }
}