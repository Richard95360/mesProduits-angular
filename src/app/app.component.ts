import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'MesProduits';

  constructor(public authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.authService.loadToken();
    if (this.authService.getToken()==null || 
        this.authService.isTokenExpired())
          this.router.navigate(['/login']);

  }
  onLogout(){
    this.authService.logout();
  }
}
