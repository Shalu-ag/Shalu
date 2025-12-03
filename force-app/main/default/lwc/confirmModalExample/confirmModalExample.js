import { LightningElement } from 'lwc';
import LightningConfirm from "lightning/confirm";

export default class ConfirmModalExample extends LightningElement {
    async handleConfirmClick(){
        const result = await LightningConfirm.open({
            message:"this is confirmation message",
            variant:"headerless",
            label:"this is aria-label value",
        });
    }
}