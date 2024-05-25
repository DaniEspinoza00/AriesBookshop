import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class KeysService {

  constructor(private http:HttpClient) { }


  getKey(name: string): Observable<any> { 
    return this.http.get<string>(`${environment.urlApiKey}/${name}`, {responseType: 'text' as 'json'});

  }
}
