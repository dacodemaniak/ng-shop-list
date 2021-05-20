import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

import {
  MatToolbarModule
} from '@angular/material/toolbar';

const materials = [
  MatToolbarModule
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductQuantityComponent
  ],
  imports: [
    CommonModule,
    ...materials
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductQuantityComponent,
    ...materials,
  ]
})
export class SharedModule { }
