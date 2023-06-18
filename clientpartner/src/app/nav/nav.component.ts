import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:string =""
// currentUser$: Observable<User | null> = of(null);

  constructor(public  accountService:AccountService) { }

  ngOnInit(): void {
   // this.currentUser$= this.accountService.currentUser$;
    //this.getCurrentUser();
    console.log("Nav component log n function model BEFORE login click",this.model)
  }


  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe({
  //     next: user => this.loggedIn = !!user,
  //     error: error => console.log(error)
  //   })
  // }

  login(){
    console.log("Nav component log n function model after login click",this.model);
    this.accountService.login(this.model).subscribe({
      next: response => {
        //console.log(response);
       // this.loggedIn= true;
        console.log("Logged in status HI");
      },
      error: error=> console.log(error)

    } );
  }

  logout(){
    this.accountService.logout();
    //this.loggedIn= false;
  }
}
