import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any={ }
  //loggedIn =false

  // currentUser$:Observable<User | null> =of(null);
  constructor(public accountService: AccountService ,private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
  //  this.currentUser$ = this.accountService.currentUser$;
  }

  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe({
  //     next: user => this.loggedIn = !!user,      //  !! this convets the user sinto boolean
  //     error: error => console.log(error)

  //   })
  // }
//because we are returning an observable so we need to subscribe it.
  login(){
    this.accountService.login(this.model).subscribe({
      next: response=>{
       // console.log("madharchod"),
       // this.loggedIn=true
       this.router.navigateByUrl('/members');
      },
      error : err=>{
       // this.toastr.error(err.error);   //because we are now handling the errors with the interceptor
        console.log(err)
      }
    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  //  this.loggedIn=false
  }

}
