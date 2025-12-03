import { LightningElement } from 'lwc';
import LightningAlert from "lightning/alert";

export default class AlertModalComponent extends LightningElement {
    async showAlert(){
    await LightningAlert.open({
        message:"this is error message.",
        theme:"error",
        label:"Error!",
    });
    }
}