import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl="https://localhost:7101/api/partner/";


  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ =this.currentUserSource.asObservable();
  id:string="";
  constructor(private http:HttpClient) { }



  login(model: any){
    this.id=model;
    console.log("ACCOUNT SERVICE LOGIN:");
    return this.http.get<User>(this.baseUrl+this.id).pipe(
      map((response:User)=>{
        const user = response;
        if(user){
          this.setCurrentUser(user);
         }
      })
    );
  }

  setCurrentUser(user: User){
    console.log("ACCOUNTSERVICE",user);
    localStorage.setItem('userId', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('userId');
    this.currentUserSource.next(null);
  }
}
