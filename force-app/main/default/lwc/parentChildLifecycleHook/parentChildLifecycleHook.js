import { LightningElement } from 'lwc';

export default class ParentChildLifecycleHook extends LightningElement {
    constructor(){
        super();
        console.log(' parent In Constructor');
;           
    }
    connectedCallback(){
        console.log(' parent Connected callback');
    }
    renderedCallback(){
        console.log(' parent renderd call');
    }
    disconnectedCallback(){
        console.log(' parent disconnected callback');
    }
    errorCallback(error,stack){
        console.log(stack +'----'+trace);
        
    }
}
