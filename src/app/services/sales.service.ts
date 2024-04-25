import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sales } from '../interfaces/sales';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { SaleBatch } from '../interfaces/sale-batch';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  postSales(saleList: sales[]): Observable<sales[]> {
    return this.http.post<sales[]>(
      environments.urlSales + "/batch",
      saleList,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  getSalesById(id:number):Observable<SaleBatch[]>{
    return this.http.get<SaleBatch[]>(environments.urlSales+"/user/"+id);
  }
}
