import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLogin:boolean=false
  cartNumber:number=0

 logOut()
 {
  this._AuthService.logout()
 }
  constructor(private _AuthService:AuthService, private _CartService:CartService)
  {
    _CartService.numberOfCartItems.subscribe({
      next:(value)=>this.cartNumber=value
    })
    _AuthService.userDate.subscribe({
      next:()=>{
        if(_AuthService.userDate.getValue()!==null)
          this.isLogin=true
        else
        this.isLogin=false
      }
    })
  }

}
