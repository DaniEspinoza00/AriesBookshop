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
export class UserDetailsComponent implements OnInit{
  name:string='';
  userId: number = 0;
  userService= inject(UserService);
  formBuilder=inject(FormBuilder);
  loginService=inject(LoginService);
  router=inject(Router);
  user?:User;
  errorMessage:String="";
  userLoginOn:boolean=false;


  userDetails=this.formBuilder.group({
    id:[''],
    firstname:[''],
    lastname:[''],
    username:[''],
    country:[''],
  })

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const editUserLink = document.getElementById('editUser');
      const userForm = document.getElementById('userDetails');
      const saveChangesButton = document.getElementById('saveChanges');
  
      editUserLink?.addEventListener('click', (event) => {
          event.preventDefault();
  
          const inputs = userForm?.querySelectorAll('input');
          inputs?.forEach((input) => {
              input.removeAttribute('readonly');
          });
  
          if (saveChangesButton) {
              saveChangesButton.style.display = 'block';
          }
      });
  });
  
    this.loginService.userId.subscribe(id => {
      this.userId = id;
    });
    this.userService.getUser(this.userId).subscribe({
      next: (userData) => {
        this.user=userData;
        this.userDetails.controls.id.setValue(userData.id.toString());
        this.userDetails.controls.firstname.setValue( userData.firstname);
        this.userDetails.controls.lastname.setValue( userData.lastname);
        this.userDetails.controls.username.setValue( userData.username);
        this.userDetails.controls.country.setValue( userData.country);
        this.name=userData.username;
      },
      error: (errorData) => {
        this.errorMessage=errorData
      },
      complete: () => {
        console.info("User Data ok");
      }
    })

    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })
  }


  logout()
  {
    this.loginService.logout();
    this.router.navigate(['/home'])
  }



}
