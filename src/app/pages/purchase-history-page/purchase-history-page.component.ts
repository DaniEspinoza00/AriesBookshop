import { Component } from '@angular/core';
import { PurchaseHistoryComponent } from '../../components/purchase-history/purchase-history.component';

@Component({
  selector: 'app-purchase-history-page',
  standalone: true,
  imports: [PurchaseHistoryComponent],
  templateUrl: './purchase-history-page.component.html',
  styleUrl: './purchase-history-page.component.css'
})
export class PurchaseHistoryPageComponent {

}
