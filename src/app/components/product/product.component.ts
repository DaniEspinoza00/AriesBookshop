import { LoginService } from './../../services/login.service';
import { FavoritesService } from './../../services/favorites.service';
import { CartService } from './../../services/cart.service';
import { BooklistService } from './../../services/booklist.service';
import { Booklist } from './../../interfaces/book-list';
import { Component, OnInit, inject } from '@angular/core';
import { book } from '../../interfaces/book';
import { BooksApiServiceService } from '../../services/books-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { Favorites } from '../../interfaces/favorites';
import { favRequest } from '../../interfaces/favorite-request';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  book: book | undefined;
  booklistItem: Booklist | undefined;
  private favoriteList: Favorites[]=[];

  private BooksApiServiceService = inject(BooksApiServiceService);
  private route = inject(ActivatedRoute);
  private BooklistService = inject(BooklistService);
  private CartService = inject(CartService);
  private FavoritesService = inject(FavoritesService);
  private LoginService = inject(LoginService);
  private router = inject(Router);
  userId: number = 0;
  isBookFaved:boolean=false;
  idFaved:number=0;
  idRoute:number=0;

  ngOnInit(): void {
    this.showBook();
    this.LoginService.userId.subscribe(id => {
      this.userId = id
    })
    if(this.userId !== 0){
      this.FavoritesService.getFavoritesIdUser(this.userId).subscribe(
        {
          next:(list)=>{
            this.favoriteList=list;
            this.route.params.subscribe(param=>{
              this.idRoute=param['id'];
            })
            for (const fav of this.favoriteList) {
              if (fav.idUser == this.userId && fav.idBook == this.idRoute) {
                  this.isBookFaved=true;
                  this.idFaved=fav.id;
                  return;
              }
          }
          }
        }
      )
    }


  }


  showBook() {
    this.route.params.subscribe(param => {
      const id = param['id'];
      this.BooksApiServiceService.getBook(id).subscribe(
        {
          next: (bookFound) => {
            this.book = bookFound;
          }
        }
      );
      this.BooklistService.getBookStockPrice(id).subscribe(
        {
          next: (book) => {
            this.booklistItem = book;
          }
        }
      )
    })
  }

  addToCart(book: book, booklistItem:Booklist) {//CAMBIADO
    const product: Product = {
      id: book.id,
      image_url: book.image_url,
      title: book.title,
      authors: book.authors,
      edition: book.edition,
      price: booklistItem.price,
      quantity: 1,
      stock:booklistItem.stock,
    }
    this.CartService.addNewProduct(product);
  }

  addToFavs(idBook: number) {
    
    if (this.userId !== null && this.userId !== 0) {
      const fav: favRequest = {
        idUser: this.userId, 
        idBook: idBook
      }
      this.FavoritesService.postFavorite(fav).subscribe(
        {
          next: (response) => {
            alert("Se añadio correctamente");
            this.reloadCurrentRoute();
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    }else{
      alert("Debes estar logeado para añadir a favoritos");
    }
  }

  removeFavs(){
    this.FavoritesService.deleteFavorite(this.idFaved).subscribe(
      {
        next:(response)=>{
          console.log(response);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    );
    this.isBookFaved=false;
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
