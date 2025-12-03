import { LightningElement } from 'lwc';

export default class GetterSetterComponent extends LightningElement {
    name = "John Doe";
    OriginalValue = 1;
    newAge = 0;//1


    get age() {
        console.log('Getter called, returning OriginalValue:', this.OriginalValue);//7
        return this.OriginalValue;
       
    }


    set age(value) {
        console.log('Setter called,  age value:', value);//4
        const numericValue = Number(value);
        console.log('Getter called, returning numericValue:', numericValue); //5
        if (numericValue > 25) {
            console.log('Age cannot be set to a value greater than 25');
            this.OriginalValue = 24;
                    console.log('OriginalValue set to:', this.OriginalValue);


        } else {
            this.OriginalValue = numericValue;
        }
        console.log('OriginalValue set to from numeric value:', this.OriginalValue);//6
    }


   
    handleChange(event) {
        this.newAge = event.target.value;
        console.log('newAge inputValue:', this.newAge);//2
    }


    handleClick() {
        this.age = this.newAge;
        console.log('Age after setter:', this.age);//3
    }
}

