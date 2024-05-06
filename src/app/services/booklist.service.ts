import { Booklist } from './../interfaces/book-list';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { environments } from '../../environments/environments';
import { book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BooklistService {//para precio y stock

  Booklist:Booklist[]|undefined=[];

  constructor(private router:Router, private http:HttpClient) { }

  getBookListkHttp():Observable<Booklist[]>{
    return this.http.get<Booklist[]>(environments.urlBooks);
  }
  
  getBookStockPrice(id:number):Observable<Booklist>{
    return this.http.get<Booklist>(environments.urlBooks+"/"+id );
  }

  mostrarPrecioIDstockHttp(librosFiltrados: book[]): Observable<Booklist[]> {
    const requests = librosFiltrados.map(libro => this.getBookStockPrice(libro.id));
  
    return forkJoin(requests).pipe(
      map(resultados => {
        return resultados; // Devolver los resultados
      })
    );
  }
}
