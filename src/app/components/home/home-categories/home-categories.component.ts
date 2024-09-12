import { CommonModule, NgOptimizedImage } from '@angular/common';
import { homeItem } from './../models/home-model.model';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-categories',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule, CommonModule],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.css'
})
export class HomeCategoriesComponent {

  homeItem=homeItem;
  private router=inject(Router);

  ngOnInit():void{
    console.log(this.homeItem);
  }

  navigate(genre:string) {
    if(genre=='youth')
      this.router.navigate(['/category/Young Adult']);
    else if(genre==='romantic')
      this.router.navigate(['/category/Romance']);
    else if(genre==='childs')
      this.router.navigate(['/category/Childrens']);
    else if(genre==='literature')
      this.router.navigate(['/category/Literature']);

  }
}
