import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {
  authToken: any;
  
  user:any;
  // jwtHelper: JwtHelperService;
  helper = new JwtHelperService()


  constructor(private http:HttpClient) {
    // this.jwtHelper = new JwtHelperService({
    //   config: {
    //     tokenGetter: this.authToken,
    //   }})
   }

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
  a(data){
    return data.user.username
  }
  b(data){
    return data.username
  }
  c(data){
    return data.user.email;
  }
  d(data){
    return data.email
  }
  loggedIn(){
    if((localStorage.getItem('user') && localStorage.getItem('id_token'))!=null){
      try{
        //if(this.a(jwt_decode(localStorage.getItem('id_token')))==this.b(this.user) && this.c(jwt_decode(localStorage.getItem('id_token')))==this.d(this.user)) return true;


        //((jwt_decode(localStorage.getItem('id_token'),  {header:true})))
        return true

      }catch(err){
        return false;
      }
      //return true;
      //alert('here')
      //console.log(localStorage.getItem('id_token').split(" ")[1])
     //return this.helper.isTokenExpired(localStorage.getItem('id_token').split(" ")[1])
    }else{
      return false
    }
    
    }
    // else{
    //   return false;
    // }
 // }


}

