import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class KeysService {

  constructor(private http:HttpClient) { }


  getKey(name: string): Observable<any> { 
    return this.http.get<string>(`${environments.urlApiKey}/${name}`, {responseType: 'text' as 'json'});

  }
}
