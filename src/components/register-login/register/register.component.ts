import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/adapters/user.repository.adapter';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordMatch()) {
      const newUser: User = new User();
      newUser.setName = this.registerForm.get('name')?.value;
      newUser.setEmail = this.registerForm.get('email')?.value;
      newUser.setPassword = this.registerForm.get('password')?.value;
      newUser.setStatus = User.ENABLE;

      this.userService.createUser(newUser).subscribe(
        (createdUser) => {
          console.log('Usuario creado:', createdUser);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error al crear usuario:', error);
        }
      );
    } else {
      console.log('Formulario inválido o contraseñas no coinciden');
    }
  }

  passwordMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}