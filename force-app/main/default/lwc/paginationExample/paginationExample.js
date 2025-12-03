import { LightningElement,track ,api,wire} from 'lwc';
import getAllContacts from '@salesforce/apex/DataController.getAllContacts';

export default class PaginationExample extends LightningElement {
    totalPage =0
    currentPage =1
    @track contacts=[]
    @track paginatedData =[]
    pageSize =10

    columns=[
        {label:'First Name', fieldName:'FirstName'},
        {label:'Last Name', fieldName:'LastName'},
        {label:'Email', fieldName:'Email'}
    ];
    @wire(getAllContacts)
    wiredContacts({data,error}){
        if(data){
            this.contacts = data;
            this.totalPage = Math.ceil(data.length/this.pageSize);
            this.updatePaginatedData();
        }
    }
    updatePaginatedData(){
        const start = (this.currentPage-1)*this.pageSize;
        const end = this.pageSize*this.currentPage
        this.paginatedData = this.contacts.slice(start,end)
    }
    handlePrevious(){
        if(this.currentPage>1){
            this.currentPage = currentPage-1;
            this.updatePaginatedData();
        }
    }
    handleNext(){
        if(this.currentPage<this.totalPage){
            this.currentPage = currentPage+1;
            this.updatePaginatedData();
        }
    }
    /*get isPreviousDisabled(){
        return this.currentPage =1;
    }
    get isNextDisabled(){
        return this.currentPage = this.totalPage;
    }*/
}