import { Routes } from '@angular/router';
import { CataloguePageComponent } from './pages/catalogue-page/catalogue-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const routes: Routes = [
    {path:'home', component:HomePageComponent},
    {path:'books', component:CataloguePageComponent},
    {path:'product/:id', component:ProductPageComponent},
    {path:'**', redirectTo:"home"}
];
