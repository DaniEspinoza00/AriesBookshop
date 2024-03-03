import { Component } from '@angular/core';
import { CatalogueComponent } from '../../components/catalogue/catalogue.component';

@Component({
  selector: 'app-catalogue-page',
  standalone: true,
  imports: [CatalogueComponent],
  templateUrl: './catalogue-page.component.html',
  styleUrl: './catalogue-page.component.css'
})
export class CataloguePageComponent {

}
