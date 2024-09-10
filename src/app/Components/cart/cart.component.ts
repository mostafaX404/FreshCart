import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartDetails:any=null
  constructor(private _CartService:CartService)
  {}

updateItemCount(productId:string, count:number){

  if(count==0)
    this.removeItem(productId)
  else
  this._CartService.updateItemCount(productId,count).subscribe({
    next:(response)=>{
      this._CartService.numberOfCartItems.next(response.numOfCartItems)
      this.cartDetails=response.data

    }
  })
}

removeItem(productId:string)
{
  this._CartService.removeCartItem(productId).subscribe({
    next:(response)=>{
      this._CartService.numberOfCartItems.next(response.numOfCartItems)
      this.cartDetails=response.data

    }
  })
}

  ngOnInit(): void {
    let header:any={
      token:localStorage.getItem('userToken')
    }

    this._CartService.GetLoggedUserCart(header).subscribe({
      next:(response)=>{
        this.cartDetails=response.data
        this._CartService.numberOfCartItems.next(response.numOfCartItems)

      }
    })
  }

}
