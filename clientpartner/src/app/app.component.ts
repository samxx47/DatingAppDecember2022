import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{


  users:any;
  AccountService: any;

  constructor(private http:HttpClient ,private acccountService:AccountService){}

  ngOnInit(): void {
    //this.getUsers();
    this.setCurrentUser();

  }


  setCurrentUser(){
    const userString =  localStorage.getItem('userId');
    if(!userString) return;

    const user: User= JSON.parse(userString);
    console.log("USER STRING",user);
    this.AccountService.setCurrentUser(user);

   }
}
