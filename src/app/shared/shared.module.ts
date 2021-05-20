import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

import {
  MatToolbarModule
} from '@angular/material/toolbar';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';

import { ReactiveFormsModule } from '@angular/forms';

import { UpdateBtnDirective } from './directives/update-btn.directive';
import { ProductFormComponent } from './components/product-form/product-form.component';

const materials = [
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductQuantityComponent,
    UpdateBtnDirective,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...materials
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductQuantityComponent,
    UpdateBtnDirective,
    ProductFormComponent,
    ...materials,
  ]
})
export class SharedModule { }
