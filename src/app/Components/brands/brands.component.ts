import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/Services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements  OnInit{
  brands:any[]=[]
  constructor( private BrandsService:BrandsService)
  {}


  ngOnInit(): void {
    this.BrandsService.getBrands().subscribe({
      next:(response)=>
        {
          this.brands=response.data
        }
    })
  }
 

}

