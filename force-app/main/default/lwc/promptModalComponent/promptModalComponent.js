import { LightningElement } from 'lwc';
import LightningPrompt from "lightning/prompt";

export default class PromptModalComponent extends LightningElement {
    handlePromptClick(){
        LightningPrompt.open({
            message:"Please enter your feedback:",
            label:"Please Respond!",
            defaultValue: "Optional initaial input value...!!",
        }).then((result)=>{

        });
    }
}