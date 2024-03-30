import { LoginService } from './../../services/login.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  
  userLoginOn:boolean=false;
  loginService=inject(LoginService);


  ngOnInit(): void {
    this.loginService.userLoginOn.subscribe({
    next:(userLoginOn) => {
      this.userLoginOn=userLoginOn;
    }
  })
  }

  

}
