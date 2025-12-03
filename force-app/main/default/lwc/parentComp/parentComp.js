import { LightningElement } from 'lwc';
import firsttemplate from './parentComp.html';
import secondtemplate from './childComp.html';

export default class ParentComp extends LightningElement {
    

templatenumber = 'temp1';
constructor()

{
super();
console.log('Inside constructor');
}
connectedCallback(){
console.log('Inside connected callback');
}
disconnectedCallback(){
console.log('Inside disconnected callback');
}
onchange(){
console.log('Inside change template');
if(this.templatenumber==='temp1'){
this.templatenumber='temp2';

}else{
this.templatenumber='temp1';
}
}
render(){
console.log('Inside render');
if(this.templatenumber==='temp1')
return firsttemplate;
else return secondtemplate;
}
}

