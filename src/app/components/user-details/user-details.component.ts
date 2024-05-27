import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
  encapsulation: ViewEncapsulation.Emulated

})
export class UserDetailsComponent implements OnInit {
  
  private userId: number = 0;
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  isLoading: boolean = false;
  user?: User;
  errorMessage: String = "";
  userLoginOn: boolean = false;
  name: string = '';

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
        this.userDetails.patchValue({
          ...userData,
          id: userData.id.toString()
        });
        this.name = userData.username;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
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

  editUser(){
    if(this.userDetails.valid){
      this.isLoading=true;
      this.userService.updateUser(this.userDetails.value as unknown as User). subscribe(
        {
          next:()=>{
            this.isLoading=false;
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User edited successfully",
              showConfirmButton: false,
              timer: 2500
            });
            this.reloadCurrentRoute();
          },
          error:(error)=>{
            console.log(error);
          }
        }
      )
    }
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
