import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

constructor(private _ActivatedRoute:ActivatedRoute,
  private _ProductsService:ProductsService, private _CartService:CartService)
{}

addToCart(productId:string)
  {
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        this._CartService.numberOfCartItems.next(response.numOfCartItems)
        
      }
    })
  }

productId:any
productDetails:any
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe((params)=>{
    this.productId=params.get('id')
  })

  this._ProductsService.getProductDetails(this.productId).subscribe({
    next:(response)=>{
      this.productDetails=response.data
    }
  })
}

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    }
  },
  nav: true
}

}
