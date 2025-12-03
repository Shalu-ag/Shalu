import { LightningElement } from 'lwc';

export default class ConstructorExp extends LightningElement {
    constructor() {
        super();
        
        this.classList.add('new-class');
        console.log('In Constructor');
    }

}