import { EmitterVisitorContext } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private accountService :AccountService, private toastr:ToastrService) { }

  ngOnInit(): void {

  }

  register(){
    this.accountService.register(this.model).subscribe({
      next:()=> {
        //console.log(response);
        this.cancel();
      },
      error: error=>{ this.toastr.error(error.error);
        console.log(error.error)}
    })
   // console.log(this.model);

  }
  cancel(){
    this.cancelRegister.emit(false);
    console.log("Cancelled");
  }

}
