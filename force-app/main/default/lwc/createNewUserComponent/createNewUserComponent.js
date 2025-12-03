import { LightningElement,wire,track ,api} from 'lwc';
import getUserData from '@salesforce/apex/fetchUserDataClass.getUserData';
import USER_NAME from '@salesforce/schema/User.Name';
import USER_ISACTIVE from '@salesforce/schema/User.IsActive';
import USER_EMAIL from '@salesforce/schema/User.Email';

/*import USER_ISACTIVE from '@salesforce/schema/User.IsActive';
import USER_ALIAS  from '@salesforce/schema/User.Alias'
import USER_EMAILENCODINGKEY from '@salesforce/schema/User.EmailEncodingKey';
import USER_LANGUAGELOCALKEY from '@salesforce/schema/User.LanguageLocaleKey';
import USER_LOCALESIDKEY from '@salesforce/schema/User.LocaleSidKey';
import USER_PROFILEID from '@salesforce/schema/User.ProfileId';
import USER_TIMEZONESIDKEY from '@salesforce/schema/User.TimeZoneSidKey';*/


const columns=[{label:'UserName',fieldName:'Name'},{
    label:'Active', fieldName:'isActive'},{
        label:'Email', fieldName:'SenderEmail'
    }]


export default class CreateNewUserComponent extends LightningElement {
    @api recordId;
    selectedFields=[USER_NAME,USER_ISACTIVE,USER_EMAIL]
    @track isModalOpen = false;
    @track columns= columns;
    @track data = [];
    @wire(getUserData)
    userName = USER_NAME;
     
    
     handleSuccess(){
         if(this.recordId !== null){
             this.dispatchEvent(new ShowToastEvent({
                     title: "SUCCESS!",
                     message: "New record has been created.",
                    variant: "success",
                 }),  
            );    
          }
     } 
    

     
     
    
    wiredData({data,error}){
        if(data){
            this.data = data;
        }
        else if(error){
            console.log(error);
        }
    }
    openModal(){
        this.isModalOpen=true;
     }
     closeModal()
     {
        this.isModalOpen = false;
    
     }
     submitDetails(){
        this.isModalOpen = false;
     }
     handleNewUserChange(event){
        this.userName = event.target.value;
     }
        
     }
