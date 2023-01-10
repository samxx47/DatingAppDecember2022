import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

//services are good place to hold data because services stays as long as the app is runng bhut the
//componenets die as they are rendered.
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl=environment.apiUrl;

  private currentUserSource = new BehaviorSubject<User | null >(null);

  currentUser$ =this.currentUserSource.asObservable();

  constructor(private http:HttpClient) {   }

   login(model:any){
    return this.http.post<User>(this.baseUrl+'account/login',model).pipe(
      map((response: User)=>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }

      })
    )
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
      map(user => {
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
       // return user;
      })

    )
  }

   setCurrentUser(user :User){
    this.currentUserSource.next(user);
   }
   logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
   }
}

