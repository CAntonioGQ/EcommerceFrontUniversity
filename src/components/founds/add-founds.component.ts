import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from 'src/app/adapters/card.repository.adapter';
import { UserService } from 'src/app/adapters/user.repository.adapter';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-add-founds',
  templateUrl: './add-founds.component.html',
})
export class AddFoundsComponent implements OnInit {
  addFoundsForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;
  currentUser: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private userService: UserService,
    private router: Router
  ) {
    this.addFoundsForm = this.formBuilder.group({
      digits: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      funds: ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
    });
  }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  onSubmit(): void {
    if (this.addFoundsForm.valid && this.currentUser) {
      this.loading = true;
      this.error = null;
      this.success = null;

      const cardData = this.addFoundsForm.value;
      cardData.idUser = this.currentUser.idUser;

      this.cardService.createCard(cardData).subscribe(
        (response) => {
          this.success = 'Fondos añadidos exitosamente';
          this.addFoundsForm.reset();
          this.loading = false;
        },
        (error) => {
          this.error = 'Error al añadir fondos. Por favor, intente de nuevo.';
          this.loading = false;
        }
      );
    } else if (!this.currentUser) {
      this.error = 'Usuario no autenticado. Por favor, inicie sesión.';
    }
  }
}