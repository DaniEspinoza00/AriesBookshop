import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

}
