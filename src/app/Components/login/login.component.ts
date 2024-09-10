import { Component } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService, private _Router:Router ,private _CartService:CartService )
  {
    if(localStorage.getItem('userToken')!==null)
      this._Router.navigate(['/home'])
    
  }

loginForm:FormGroup=new FormGroup({
  email:new FormControl(null, [Validators.required, Validators.email]),
  password:new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
})

isLoading:boolean=false;
apiError:string=""

handleLogin(loginForm:FormGroup)
{ 

  this.isLoading=true;
  if(loginForm.valid)
    {
      this._AuthService.login(loginForm.value).subscribe({
        next:(response)=>{
          if(response.message==='success')
            {
              localStorage.setItem('userToken',response.token)
              console.log(localStorage.getItem('userToken'));
              
              let header:any={
                token:localStorage.getItem('userToken')
              }

              this._AuthService.DecodeUserData()
              this.isLoading=false; 
              this._Router.navigate(['/home'])
              this._CartService.GetLoggedUserCart(header).subscribe({
                next:(response)=>{
                  console.log(response);
                  
                  this._CartService.numberOfCartItems.next(response.numOfCartItems)
                },
                error:(err)=>{
                  console.log(err);
                }
              })
            }
        },
        error:(err)=>{
          this.isLoading=false
          this.apiError=err.error.message

        }
      })
    }
}
}
