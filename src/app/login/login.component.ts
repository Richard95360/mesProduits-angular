import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit{
  
  user = new User();
  erreur: number= 0;
  constructor(private authService : AuthService,
    private router: Router){}

  ngOnInit(): void {
   
  }

  onLoggedin(){
    console.log(this.user)
  this.authService.login(this.user).subscribe({
      next:(data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error:(err:any)=> {
        this.erreur = 1
      }
  });
  }
}


