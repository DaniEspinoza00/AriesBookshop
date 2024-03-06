import { Component } from '@angular/core';
import { AuthorComponent } from '../../components/author/author.component';

@Component({
  selector: 'app-author-page',
  standalone: true,
  imports: [AuthorComponent],
  templateUrl: './author-page.component.html',
  styleUrl: './author-page.component.css'
})
export class AuthorPageComponent {

}
