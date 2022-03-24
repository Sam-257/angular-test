import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el:ElementRef) { }

  @HostListener('click')
  nextFunc(){
    var items = this.el.nativeElement.parentElement.parentElement.children[0];
    var item = items.getElementsByClassName('item')
    items.append(item[0]);
    
  }
}
