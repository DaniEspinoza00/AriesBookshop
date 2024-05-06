import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class KeysService {

  constructor(private http:HttpClient) { }

/*   getKey (name:String):Observable<String>{
    return this.http.get<String>(environments.urlApiKey + "/" + name);
  } */
  getKey(name: string): Observable<any> {  // Cambiado a any para ser más genérico
    return this.http.get<string>(`${environments.urlApiKey}/${name}`, {responseType: 'text' as 'json'}); //para recibir una cadena de texto plano
    //en lugar de un json
  }
}
