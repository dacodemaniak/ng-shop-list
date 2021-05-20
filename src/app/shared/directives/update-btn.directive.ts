import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUpdateBtn]',
})
export class UpdateBtnDirective implements OnInit {
  @Input() public innerText = 'Update';

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
