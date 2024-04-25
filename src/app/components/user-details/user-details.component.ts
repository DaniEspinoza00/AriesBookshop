import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  name: string = '';
  userId: number = 0;
  userService = inject(UserService);
  formBuilder = inject(FormBuilder);
  loginService = inject(LoginService);
  router = inject(Router);
  user?: User;
  errorMessage: String = "";
  userLoginOn: boolean = false;


  userDetails = this.formBuilder.group({
    id: [''],
    firstname: [''],
    lastname: [''],
    username: [''],
    country: [''],
  })

  ngOnInit(): void {
    this.loginService.userId.subscribe(id => {
      this.userId = id;
    });

    this.userService.getUser(this.userId).subscribe({
      next: (userData) => {
        this.user = userData;

        // Convertir el id a string antes de asignarlo al formulario
        this.userDetails.patchValue({
          ...userData,
          id: userData.id.toString()
        });

        this.name = userData.username;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info("User Data ok");
      }
    });

    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
  }

  enableEditMode(): void {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.removeAttribute('readonly');
    });

    const saveChangesButton = document.getElementById('saveChanges');
    if (saveChangesButton) {
      saveChangesButton.style.display = 'block';
    }
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/home']);
  }



}
