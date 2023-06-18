import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerOutsideClick } from 'ngx-bootstrap/utils';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl =environment.apiUrl;
  members: Member[] =[];
  memberCache = new Map();
  paginatedResults: PaginatedResult<Member[]> = new PaginatedResult<Member[]>;

  constructor(private http:HttpClient ) { }


  getMembers(userParams :UserParams){
    //if(this.members.length >0) return of(this.members);
    // to get the vlaues from a object we use below code
    //console.log(Object.values(userParams).join('-'));
    const response = this.memberCache.get(Object.values(userParams).join('-'));

    if(response) return of(response);

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
   return this.getPaginatedResults<Member[]>(this.baseUrl+ 'users',params).pipe(
    map(response => {
      this.memberCache.set(Object.values(userParams).join('-'), response);
      return response;
    })
   )
  }

  private getPaginatedResults<T>(url: string ,params : HttpParams) {
    const paginatedResult: PaginatedResult<T>= new PaginatedResult<T>;
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number , pageSize : number) {
    let params = new HttpParams();

      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);

    return params;
  }

  getMember(username:string){
    console.log("Member cache:",this.memberCache);
    // const member = this.members.find( x=> x.userName == username);
    // if(member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
  updateMember(member:Member){
    return this.http.put(this.baseUrl + 'users' ,member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);
        this.members[index]= {...this.members[index], ...member};
      })
    );
  }
  setMainPhoto(photoId: number){
    return  this.http.put(this.baseUrl + 'users/set-main-photo/'+photoId,{});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/'+photoId)
  }

}
