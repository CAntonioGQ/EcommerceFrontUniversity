import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/adapters/user.repository.adapter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.userService.login(email, password).subscribe(
        (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error en el login:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}