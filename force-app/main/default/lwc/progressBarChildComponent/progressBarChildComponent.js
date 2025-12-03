import { LightningElement,api } from 'lwc';

export default class ProgressBarChildComponent extends LightningElement {
    @api percentage1;
    get getStyle() {
        return 'width:' + this.percentage1 + '%';
    }

}