import { LightningElement ,wire,track} from 'lwc';
import getOpportunityList from '@salesforce/apex/opportunityLWCClass.getOpportunityList';
const columns=[
    {label:' Opportunity Id',fieldName:'Id'},
    {label:' Opportunity Name',fieldName:'Name'},
];

export default class CreateWireComponent extends LightningElement {
    @track columns = columns;
    @track data=[];
    @wire(getOpportunityList)
    WiredOpportunity({data,error}){
        if(data){
            this.data = data;
        }
        else if(error){
            this.error = error;
        }
    }
}