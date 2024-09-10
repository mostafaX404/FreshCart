import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { CartComponent } from './Components/cart/cart.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AuthGuard } from './Guards/auth.guard';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ProductsComponent } from './Components/products/products.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',canActivate:[AuthGuard],component:HomeComponent},
  {path:'categories',canActivate:[AuthGuard],component:CategoriesComponent},
  {path:'products',canActivate:[AuthGuard],component:ProductsComponent},
  {path:'cart',canActivate:[AuthGuard],component:CartComponent},
  {path:'checkout',canActivate:[AuthGuard],component:CheckoutComponent},
  {path:'productdetails/:id',canActivate:[AuthGuard],component:ProductDetailsComponent},
  {path:'brands',canActivate:[AuthGuard],component:BrandsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
