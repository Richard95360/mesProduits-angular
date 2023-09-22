import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private helper = new JwtHelperService();
  apiURL: string = 'http://localhost:8081/users';
  token!:string;

  /*users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
  {"username":"ric","password":"123","roles":['USER']} ];*/

  public loggedUser!:string;
  public isloggedIn:boolean = false;
  public roles!:string[];
  constructor(private router : Router,
    private http: HttpClient) { }

    login(user : User) {
      return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
    }

    saveToken(jwt:string) {
      localStorage.setItem('jwt',jwt)
      this.token = jwt;
      this.isloggedIn = true;
      this.decodeJWT();
    }

    decodeJWT()
  {   if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }


      getToken():string {
      return this.token;
      }

      isAdmin():Boolean{
        if (!this.roles) //this.roles== undefiened
        return false;
        return (this.roles.indexOf('ADMIN') >-1) ;
        ;
      }  
    
    
      logout() {
      this.loggedUser = undefined!;
      this.roles = undefined!;
      this.token= undefined!;
      this.isloggedIn = false;
      localStorage.removeItem('jwt');
      this.router.navigate(['/login']);
      }
    
      setLoggedUserFromLocalStorage(login: string) {
        this.loggedUser = login;
        this.isloggedIn = true;
       // this.getUserRoles(login);
      }
    
      loadToken() {
        this.token = localStorage.getItem('jwt')!;
        this.decodeJWT();
      }
    
      isTokenExpired(): Boolean
      {
        return  this.helper.isTokenExpired(this.token);   
      }
    
    
    
      /*getUserRoles(username: string) {
        this.users.forEach((curUser) => {
          if (curUser.username == username) {
            this.roles = curUser.roles;
          }
        });
      }*/
        
}
