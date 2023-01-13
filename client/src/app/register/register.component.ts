import { EmitterVisitorContext } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //@Input() userFromHomeComponent:any;  // for comminucationg between parent and child we use inut proprty
  @Output() cancelRegister = new EventEmitter() // for communicating between child and parent we use output property and to emit something we use eventemitter
  model:any={}
  registerForm : FormGroup =new FormGroup({});

  constructor(private accountService :AccountService, private toastr:ToastrService) { }

  ngOnInit(): void {
      this.initializeForm();
  }
initializeForm(){
  this.registerForm = new FormGroup({
      username : new FormControl('',Validators.required),
      password : new FormControl('',[Validators.required,Validators.minLength(4),
      Validators.maxLength(8)]),
      confirmPassword : new FormControl('',[Validators.required, this.matchValues('password')]),
  });
  this.registerForm.controls['password'].valueChanges.subscribe({
    next:() => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
  })
}

matchValues(matchTo: string): ValidatorFn{
 return (control : AbstractControl)=>{
  return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
 }
}

  register(){
    console.log(this.registerForm?.value);
    // this.accountService.register(this.model).subscribe({
    //   next:()=> {
    //     //console.log(response);
    //     this.cancel();
    //   },
    //   error: error=>{ this.toastr.error(error.error);
    //     console.log(error.error)}
    // })
   // console.log(this.model);

  }
  cancel(){
    this.cancelRegister.emit(false);
    console.log("Cancelled");
  }

}
