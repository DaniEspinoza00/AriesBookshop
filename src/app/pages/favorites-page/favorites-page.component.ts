import { Component } from '@angular/core';
import { FavoritesComponent } from '../../components/favorites/favorites.component';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [FavoritesComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent {

}
