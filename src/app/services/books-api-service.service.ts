import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { book } from '../interfaces/book';
import { environments } from '../../environments/environments.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksApiServiceService {

  bookList:book[]=[];
  urlApi:string=environments.baseUrl;
  limit:string='books?_limit=100';
  books:string='books'

  constructor(private http:HttpClient) { }

  getBooks():Observable<book[]>{
    return this.http.get<book[]>(`${this.urlApi}/${this.limit}`);
  }

  getBook(id:number):Observable<book>{
    return this.http.get<book>(`${this.urlApi}/${this.books}/${id}`);
  }
}
