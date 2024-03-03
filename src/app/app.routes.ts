import { Routes } from '@angular/router';
import { CataloguePageComponent } from './pages/catalogue-page/catalogue-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
    {path:'home', component:HomePageComponent},
    {path:'books', component:CataloguePageComponent},
    {path:'**', redirectTo:"home"}
];
