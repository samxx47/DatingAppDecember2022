import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  //dependency injection in angular component is given below we have injected a Http dependency
  constructor(private http: HttpClient ){ }


  //a function that is invoked as soon as the components are instantiated is given below
  ngOnInit(): void {
     this.http.get('https://localhost:7075/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
     });
  }

  title = 'HelloBuddy';

  //when we dont know the type of the data we can use the any keyword.
  users: any;
}
