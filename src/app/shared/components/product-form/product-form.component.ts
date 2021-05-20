import { ShopListService } from './../../../core/services/shop-list.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductInterface } from 'src/app/core/interfaces/product-interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  public form: FormGroup;
  @Output() newProduct: EventEmitter<ProductInterface> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private shopListService: ShopListService
  ) { }

  public get c(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '', // Default value
        Validators.required
      ],
      quantity: [
        1,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(10)
        ])
      ],
      unit: [
        ''
      ]
    });
  }

  public validate(): void {
    if (this.form.valid) {
      console.log(`${JSON.stringify(this.form.value)}`);
      this.newProduct.emit(this.shopListService.add(this.form.value));
      this.form.reset();
    } else {
      console.log('Erreur dans les données du formulaire');
    }
  }
}
