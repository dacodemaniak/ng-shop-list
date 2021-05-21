import { HttpResponse } from '@angular/common/http';
import { HttpShopListService } from './../../../core/services/http-shop-list.service';
import { ShopListService } from './../../../core/services/shop-list.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductInterface } from 'src/app/core/interfaces/product-interface';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private httpShopListService: HttpShopListService,
    private snackBar: MatSnackBar
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
      this.httpShopListService.add(this.form.value)
        .pipe(
          take(1)
        )
        .subscribe((httpResponse: HttpResponse<any>) => {
          if (httpResponse.status === 201) {
            this.newProduct.emit(httpResponse.body);
            this.form.reset();
            this.snackBar.open(
              'Le produit a bien été créé',
              'Got it!',
              {
                duration: 1500
              }
            );
          }
        });
    } else {
      console.log('Erreur dans les données du formulaire');
    }
  }
}
