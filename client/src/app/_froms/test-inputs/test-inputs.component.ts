import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-test-inputs',
  templateUrl: './test-inputs.component.html',
  styleUrls: ['./test-inputs.component.css']
})
export class TestInputsComponent implements ControlValueAccessor {
  @Input() label ='';
  @Input() type='text';


  constructor(@Self() public ngControl: NgControl) {

    this.ngControl.valueAccessor = this;

  }    //so in angular when we inject something ina constructor it gona remember it in memory
                                                         // so in case of the forms we dont want our component to remember anything so we usse self anlong with our comtrol
  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }

  get control(): FormControl{
    return this.ngControl.control as FormControl
  }


}
