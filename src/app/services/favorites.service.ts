import { Favorites } from './../interfaces/favorites';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { favRequest } from '../interfaces/favorite-request';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http:HttpClient) { }

  postFavorite(favorite:favRequest):Observable<favRequest>{
    return this.http.post<favRequest>(
      environments.urlFavs,
      favorite,
      {headers:{'Content-Type':'application/json'}}
    );
  }

  getFavoritesIdUser(id:number):Observable<Favorites[]>{
    return this.http.get<Favorites[]>(environments.urlFavs+"/"+id);
  }

  deleteFavorite(id:number):Observable<Favorites>{
    return this.http.delete<Favorites>(environments.urlFavs+"/"+id);
  }

}
