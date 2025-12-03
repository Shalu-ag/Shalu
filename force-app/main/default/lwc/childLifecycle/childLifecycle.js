import { LightningElement } from 'lwc';

export default class ChildLifecycle extends LightningElement {
    constructor(){
        super();
        console.log(' child In Constructor');
;           
    }
    connectedCallback(){
        console.log(' child Connected callback');
    }
    renderedCallback(){
        console.log(' child renderd call');
    }
    disconnectedCallback(){
        console.log(' child disconnected callback');
    }
    errorCallback(error,stack){
        console.log(stack +'----'+trace);
        
    }
}