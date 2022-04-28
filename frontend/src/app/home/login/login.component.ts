import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUser: any;
  hide : boolean = true;

  constructor(private _auth: AuthService, private _router: Router) {
    this.loginUser = {};
  }

  ngOnInit(): void {}
  login() { 
    if (
    !this.loginUser.email ||
    !this.loginUser.password
  ) {
    alert('Datos incompletos');
  } else {
    this._auth.loginUser(this.loginUser).subscribe({
      next: (v) => {
        localStorage.setItem('token', v.jwtToken )
         this._router.navigate(['/tasks'])
      },
      error: (e) => {
        alert(e.error);
      },
    });
  }
}
}
