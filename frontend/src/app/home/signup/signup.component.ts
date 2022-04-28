import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpUser: any; //se utiliza cuando va a recibir datos cuando no se que tipos de datos son

  constructor(private _authservice: AuthService , private _router: Router) {
    this.signUpUser = {}; //para que esto lo construya antes de inicializar la página (que este esa variable vacia esperando lo que escriban ene l formulario), apenas cree el formulario ya sabe que name, email y passowrd van en esa variable
  }

  ngOnInit(): void {}
  signUp() {
    if (
      !this.signUpUser.name ||
      !this.signUpUser.email ||
      !this.signUpUser.password
    ) {
      alert('Datos incompletos');
    } else {
      this._authservice.signUpUser(this.signUpUser).subscribe({
        next: (v) => {
          localStorage.setItem('token', v.jwtToken);
          this._router.navigate(['/create'])
        },
        error: (e) => {
          alert(e.error);
        },
      });
    }
  }
}
