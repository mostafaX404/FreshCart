import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService{

numberOfCartItems=new BehaviorSubject(0)
cartId:string=""

  constructor(private _HttpClient:HttpClient)  { 
    this.GetLoggedUserCart(this.header).subscribe({
      next:(response)=>{
        console.log(response);
        
        this.numberOfCartItems.next(response.numOfCartItems)
        this.cartId=response.data._id
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  

  header:any={
    token:localStorage.getItem('userToken')
  }

  addToCart(productId:string):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      {productId:productId},
      {
        headers:this.header
      }
    )
  }

  GetLoggedUserCart(header:any):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers:header
      }
    )
  }

  removeCartItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers:this.header
      })
  }

  updateItemCount(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count:count
      },
      {
        headers:this.header
      })
  }

  onlinePayment(shippingAddress:any,cartId:string):Observable<any>
  {
    console.log(cartId);
    
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress:shippingAddress 
      },
      {
        headers:this.header
      })
  }
}
