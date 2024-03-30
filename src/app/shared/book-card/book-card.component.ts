import { BooklistService } from './../../services/booklist.service';
import { Booklist } from './../../interfaces/book-list';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { pipe } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit{
  @Input() item: any;
  @Input() booklist: Booklist  | undefined;
  ngOnInit(): void {
    
  }

}
