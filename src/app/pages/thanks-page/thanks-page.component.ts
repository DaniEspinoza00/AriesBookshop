import { Component } from '@angular/core';
import { ThanksComponent } from '../../components/thanks/thanks.component';

@Component({
  selector: 'app-thanks-page',
  standalone: true,
  imports: [ThanksComponent],
  templateUrl: './thanks-page.component.html',
  styleUrl: './thanks-page.component.css'
})
export class ThanksPageComponent {

}
