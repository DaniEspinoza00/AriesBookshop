import { LoginService } from './../../services/login.service';
import { Component, NgModule, OnInit, inject } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userLoginOn: boolean = false;
  private loginService = inject(LoginService);
  bookTitle:string='';
  searchForm: FormGroup;


  constructor(private router:Router, private formBuilder: FormBuilder){
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

  }

  searchBooks() {
    const searchTerm = this.searchForm.get('search')?.value;
    this.router.navigate(['/search', searchTerm]);
    this.searchForm.reset();
  }
  

}
