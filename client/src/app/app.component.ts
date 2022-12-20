import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  //dependency injection in angular component is given below we have injected a Http dependency
  constructor(private http: HttpClient ,private accountService: AccountService ){ }


  //a function that is invoked as soon as the components are instantiated is given below
  ngOnInit(): void {
    //this.getUsers();
    this.setCurrentUser();

  }


   setCurrentUser(){
    const userString =  localStorage.getItem('user');
    if(!userString) return;
    const user: User= JSON.parse(userString);
    console.log("Bhak madharchod");
    this.accountService.setCurrentUser(user);

   }
 // title = 'HelloBuddy';

  //when we dont know the type of the data we can use the any keyword.
 // users: any;
}
