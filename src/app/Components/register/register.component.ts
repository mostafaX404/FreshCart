import { Component } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService, private _Router:Router  )
  {
    if(localStorage.getItem('userToken')!==null)
      this._Router.navigate(['/home'])
  }

registerForm:FormGroup=new FormGroup({
  name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
  email:new FormControl(null, [Validators.required, Validators.email]),
  password:new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  rePassword:new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  phone:new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
},{validators:this.rePasswoordMatch})


rePasswoordMatch(registerForm:any)
{
  let passwordControl=registerForm.get('password')
  let rePasswordControl=registerForm.get('rePassword')

  if(passwordControl===rePasswordControl)
    return null
  else
  {
    rePasswordControl.setErrors({passwordMatch: 'password and rePassword not matched'})
    return {passwordMatch: 'password and rePassword not matched'}
  }
}

isLoading:boolean=false;
apiError:string=""

handleRegister(registerForm:FormGroup)
{ 
console.log(registerForm.value);

  this.isLoading=true;
  if(registerForm.valid)
    {
      this._AuthService.register(registerForm.value).subscribe({
        next:(response)=>{
          if(response.message==='success')
            {console.log("success");
            
              this.isLoading=false; 
              this._Router.navigate(['/login'])
            }
        },
        error:(err)=>{
          console.log("success");
          this.isLoading=false
          this.apiError=err.error.message

        }
      })
    }
}

}
