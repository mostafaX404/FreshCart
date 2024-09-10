import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/Services/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

constructor(private _CartService:CartService)
{}

shippingAddress:FormGroup=new FormGroup({
  details:new FormControl(null),
  phone:new FormControl(null),
  city:new FormControl(null)
})

navigateToPage(url:string)
{
  window.location.href=url
}

handleSubmit(shippingAddress:FormGroup)
{
  this._CartService.onlinePayment(shippingAddress.value,this._CartService.cartId).subscribe({
    next:(response:any)=>{
      this.navigateToPage(response.session.url)
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

}
