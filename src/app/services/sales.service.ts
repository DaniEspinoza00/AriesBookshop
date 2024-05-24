import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sales } from '../interfaces/sales';
import { Observable } from 'rxjs';
import { SaleBatch } from '../interfaces/sale-batch';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  postSales(saleList: sales[]): Observable<sales[]> {
    return this.http.post<sales[]>(
      environment.urlSales + "/batch",
      saleList,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  getSalesById(id:number):Observable<SaleBatch[]>{
    return this.http.get<SaleBatch[]>(environment.urlSales+"/user/"+id);
  }
}
