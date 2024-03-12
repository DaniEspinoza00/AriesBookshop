import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginError:string="";
  userLoginOn:boolean=false;
  private formBuiler=inject(FormBuilder);
  private router=inject(Router);

  loginForm=this.formBuiler.group({
    email:['dani@gmail.com',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
  })
  
  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.controls.email;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  login(){ //aca va el consumo del servicio que enlaza con la bdd
    if(this.loginForm.valid){
      console.log("llamar al servicio de login");
      this.router.navigateByUrl('home');
      this.loginForm.reset;
    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos");
    }
  }
}
