import { LightningElement,wire,track } from 'lwc';
import getPositionList  from '@salesforce/apex/wireDemoClass.getPositionList';
const columns=[
    {label:' Position Name', fieldName:'Name'},
    {label:'Position record ID', fieldName:'Id'},
];

export default class WireDemo extends LightningElement {
    @track columns = columns;
    @track data=[];
    @wire(getPositionList)
    wiredPosition({data,error}){
        if(data){
            this.data =  data;

        }else if(error){
            console.log('error occur');

        }
    }
}