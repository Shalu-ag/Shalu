import { LightningElement } from 'lwc';

export default class ModalParentComponent extends LightningElement {
    showModal = false
    showHandler(){
        this.showModel = true
    }
    modalCloseHandler(){
        this.showModal = false
    }
}