import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  authToken: any;
  user:any;
  helper = new JwtHelperService()

  constructor(private http:HttpClient) { }


  storeUserData(token, user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user=user
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
   loggedIn(){
    if((localStorage.getItem('id_token'))!=null){
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
}
