import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor(private el:ElementRef) { }

  @HostListener('click')
  prevFunc(){
    var items = this.el.nativeElement.parentElement.parentElement.children[0];
    var item = items.getElementsByClassName('item')
    items.prepend(item[item.length - 1]);
  }

}
