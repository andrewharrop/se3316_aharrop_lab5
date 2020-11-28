import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {
  authToken: any;
  
  user:any;



  constructor(private http:HttpClient) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/users/register', user, {headers:headers, observe:'response'});
  }
  storeUserData(token, user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user=user
  }
  getProfile(){
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization',this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/secure/profile', {headers:headers, observe:'response'});
  }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken= token;
  }
  logout(){
   this.authToken = null;
   this.user = null;
   localStorage.clear() 
  }

}

