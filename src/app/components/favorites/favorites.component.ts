import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Booklist } from '../../interfaces/book-list';
import { Favorites } from '../../interfaces/favorites';
import { LoginService } from '../../services/login.service';
import { FavoritesService } from '../../services/favorites.service';
import { book } from '../../interfaces/book';
import { BooksApiServiceService } from '../../services/books-api-service.service';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor, RouterLink, MatProgressSpinnerModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class FavoritesComponent implements OnInit{
  
  listado:Booklist[]=[];
  favList:Favorites[]=[];
  booklist:book[]=[];
  isLoading: boolean = false;
  userId: number = 0;

  private orderedBookIndexes: number[] = [];
  private favoriteService=inject(FavoritesService);
  private loginService=inject(LoginService);
  private BooklistService=inject(BooksApiServiceService);
  private router= inject (Router);
  

  ngOnInit(): void {
      this.getFavorites();
  }


  getFavorites(){
     this.loginService.userId.subscribe(id=>{
      this.userId=id
    })
    this.isLoading=true;
    this.favoriteService.getFavoritesIdUser(this.userId).subscribe(
      {
        next:(favorites)=>{
          this.favList=favorites;
          this.favList.forEach((fav, index)=>{
            this.BooklistService.getBook(fav.idBook).subscribe(
              {
                next:(book)=>{
                  this.orderedBookIndexes.push(index);
                  this.booklist[index] = book;
                },
                error:(error)=>{
                  console.log(error);
                }
              }
            );
          })
          setTimeout(()=>{
            this.isLoading = false;
          },1000);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }

  deleteFav(id:number){
    this.favoriteService.deleteFavorite(id).subscribe(
      {
        next:(reponse)=>{
          console.log("el favorito se elimino con exito", reponse);
          this.reloadCurrentRoute();
        },
        error:(error)=>{
          console.log("no se pudo eliminar el favorito", error);
        }
      }
    )
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
