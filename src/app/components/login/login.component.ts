import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../../services/signup.service';
import { User } from '../../interfaces/user';

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
  private formBuiler = inject(FormBuilder);
  private router = inject(Router);
  private signupService = inject(SignUpService);



  loginForm = this.formBuiler.group({
    email: ['dani@gmail.com', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = this.formBuiler.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required]]
    })

    this.signupForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.verifyPassword();
    });
  }

  verifyPassword(): void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.signupForm.get('confirmPassword')?.setErrors({ DoNotMatch: true });//ojo con el do not match
    } else {
      this.signupForm.get('confirmPassword')?.setErrors(null);
    }
  }

  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  login() { //aca va el consumo del servicio que enlaza con la bdd
    if (this.loginForm.valid) {
      console.log("llamar al servicio de login");
      this.router.navigateByUrl('home');
      this.loginForm.reset;
    }
    else {
      this.loginForm.markAllAsTouched(); //esto muestra todo con verde y rojo segun
      alert("Error al ingresar los datos");
    }
  }

  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); //esto muestra todo con verde y rojo segun
      alert("Error al ingresar los datos");
    }
    const user: User = {
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      firstname: this.signupForm.value.firstname,
      lastname: this.signupForm.value.lastname,
      email: this.signupForm.value.email,
      phonenumber: this.signupForm.value.phonenumber,
    }
    console.log(user);
    this.signupService.postUser(user).subscribe(
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
