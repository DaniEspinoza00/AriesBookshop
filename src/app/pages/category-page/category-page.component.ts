import { Component } from '@angular/core';
import { CategoryComponent } from '../../components/category/category.component';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent {

}
