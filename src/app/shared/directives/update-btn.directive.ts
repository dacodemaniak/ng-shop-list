import { ProductInterface } from './../../core/interfaces/product-interface';
import { Directive, ElementRef, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUpdateBtn]',
})
export class UpdateBtnDirective implements OnInit {
  @Input() public innerText = 'Update';
  @Input() public product: ProductInterface;

  @HostListener('click') emit(): void {
    console.log('About to emit an event');
    // Here must goes the modal loader to edit input product
    // See advanced usage of Angular and component factory
  }

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const newBtn = this.renderer.createElement('button');
    newBtn.innerHTML = this.innerText;

    this.renderer.appendChild(this.element.nativeElement, newBtn);
  }

}
