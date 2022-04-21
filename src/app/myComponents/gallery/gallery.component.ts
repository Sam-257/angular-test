import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  nextEle(){
    console.log("next was clicked");
    var ele = document.getElementById("items")!.children;
    var elements = document.getElementsByClassName('item');
    console.log(ele);
    console.log(elements);
  }
  
  prevEle(){
    console.log("prev was clicked");
  }
}
