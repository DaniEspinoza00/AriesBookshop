import { Booklist } from './../interfaces/book-list';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BooklistService {

  Booklist:Booklist[]|undefined=[];

  constructor(private router:Router, private http:HttpClient) { }

  getBookListkHttp():Observable<Booklist[]>{
    return this.http.get<Booklist[]>(environments.urlBooks);
  }
  
  getBookStockPrice(id:number):Observable<Booklist>{
    return this.http.get<Booklist>(environments.urlBooks+"/"+id );
  }

}
