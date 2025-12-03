import { LightningElement } from 'lwc';

export default class GetSetParentCall extends LightningElement {
    callChildMethod() {
        const getChildComponent = this.template.querySelector('c-get-child-component'); // Corrected line
        // ... (check for existence if desired)
        getChildComponent.childMethod(); // Call the child method
    }
}