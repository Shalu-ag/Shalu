import { LightningElement,track } from 'lwc';
import getOpacByProductId from '@salesforce/apex/ProductController.getOpacByProductId';
import getProducts from '@salesforce/apex/ProductController.getProducts';
import saveOpac from '@salesforce/apex/ProductController.saveOpac';
//import addOpac from '@salesforce/apex/ProductController.addOpac';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class ProductManagement extends LightningElement {
    

    



    @track selectedProductId = '';
    @track productOptions = [];
    @track opacList = [];
    
    @track selectedRowIds = [];
    @track showModal = false;
    @track opacName = '';
    @track opacMin = '';
    @track opacMax = '';
    @track opacPrice ='';
    @track currentOpacId = '';
    @track isEditMode = false;
    @track opacRecord = {};

    //get disableClassDropdown() {
        //return !this.selectedId;
    //}
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Product', fieldName: 'Product__r.Name' },
        { label: 'Min', fieldName: 'Min__c' },
        { label: 'Max', fieldName: 'Max__c' },
        {label:'Price',fieldName: 'Price__c'} ,
    ];

    connectedCallback() {
            this.loadProducts();
        }
    
        loadProducts() {
            getProducts().then(result => {
                this.productOptions = result.map(product => ({
                    label: product.Name,
                    value: product.Id
                }));
            });
        }
        handleProductChange(event) {
                this.selectedProductId = event.detail.value;
                if (!this.isEditMode) {
                    this.loadOpacs();
                }
            }
        
            
               loadOpacs(){
                getOpacByProductId({ productId: this.selectedProductId })
                    .then(result => {
                        this.opacList = result;
                    });
            }
            handleNew() {
        this.resetForm();
        this.showModal = true;
        this.isEditMode = false;
    }
    handleNameChange(event) {
        this.opacName = event.target.value;
    }

    handleMinChange(event) {
        this.opacMin = event.target.value;
    }

    handleMaxChange(event) {
        this.opacMax = event.target.value;
    }
    handlePriceChange(event){
        this.opacPrice = event.target.value;
    }
    

    
    closeModal() {
            this.showModal = false;
        }
    
        handleSave() {
    const payload = {
        name: this.opacName,
        min: parseFloat(this.opacMin),
        max: parseFloat(this.opacMax),
        price: parseFloat(this.opacPrice),
        product: this.selectedProductId
    };

    console.log('Sending Payload:', payload);

    saveOpac({ payload })
        .then(() => {
            this.showToast('Success', 'Record saved successfully', 'success');
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
}

 resetForm() {
    this.opacName = '';
    this.opacMin = '';
    this.opacMax = '';
    this.opacPrice = '';
    this.currentOpacId = '';
    this.opacRecord ={};
    
}

    
        showToast(title, message,  variant) {
            this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
        }
        get modalTitle() {
        return this.isEditMode ? 'Edit Opac' : 'New';
    
}
}

       
        


        


