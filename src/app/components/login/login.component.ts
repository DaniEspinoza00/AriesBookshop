import { LoginRequest } from './../../interfaces/login-request';
import { LoginService } from './../../services/login.service';
import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../../services/signup.service';
import { User } from '../../interfaces/user';
import { AuthResponse } from '../../interfaces/auth-response';
import { RegisterRequest } from '../../interfaces/register-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {



  loginError: string = "";
  userLoginOn: boolean = false;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);
  private signupService = inject(SignUpService);

  
  signupForm!: FormGroup;
  
  loginForm=this.formBuilder.group({
    username:['dani@gmail.com',[Validators.required, Validators.email]],
    password: ['12345',Validators.required],
  })

  sign = this.formBuilder.group({
    username2: ['', [Validators.required, Validators.email]],
    password2: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    country: ['', [Validators.required]],
  })




  ngOnInit(): void {
/* 
     this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      country: ['', [Validators.required]],
    }) */

    this.sign.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.verifyPassword();
    }); 


  }

  verifyPassword(): void {
    const password = this.sign.get('password2')?.value;
    const confirmPassword = this.sign.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.sign.get('confirmPassword')?.setErrors({ DoNotMatch: true });//ojo con el do not match
    } else {
      this.sign.get('confirmPassword')?.setErrors(null);
    }
  } 


  get firstname(){
    return this.sign.controls.firstname;
  }

  get lastname(){
    return this.sign.controls.lastname;
  }

  get country(){
    return this.sign.controls.country;
  }

  get username2(){
    return this.sign.controls.username2;
  }

  get password2() {
    return this.sign.controls.password2;
  }

  get email(){
    return this.loginForm.controls.username;
  }
  get password() {
    return this.loginForm.controls.password;
  }

login(){
    if(this.loginForm.valid){
      this.loginError="";

      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          this.router.navigateByUrl('/home');
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }


    signup() {
    if (this.sign.invalid) {
      this.signupForm.markAllAsTouched(); //esto muestra todo con verde y rojo segun
      alert("Error al ingresar los datos");
      return;
    }
    const user: RegisterRequest = {
      username: this.sign.value.username2 as string,
      password: this.sign.value.password2 as string,
      firstname: this.sign.value.firstname as string,
      lastname: this.sign.value.lastname as string,
      country: this.sign.value.country as string,
    }
    console.log(user);
    this.signupService.añadirUsuario(user).subscribe(
      {
        next: () => {
          alert("Se ha agregado tu usuario");
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }
} 
