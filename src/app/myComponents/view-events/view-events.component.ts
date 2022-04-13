import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})

export class ViewEventsComponent implements OnInit {
  totalLength: number;
  page: number = 1;
  events:any;
  user_id:any;
  constructor(private apiService: ApiService) { }
  
  ngOnInit(): void{
    this.user_id = localStorage.getItem('id');
    this.apiService.getData(this.user_id).subscribe((res)=>{
      this.events = res.data;
    });
  }
  
  deleteClicked(sno:any){
    this.apiService.deleteData(sno).subscribe((res)=>{
      console.log(res);
      this.apiService.getData(this.user_id).subscribe((res)=>{
        //console.log(res);
        this.events = res.data;
      });
    });
  }

}



/*export class ViewEventsComponent implements OnInit {
  localItem: string | null;
  totalLength: number;
  page: number = 1;
  events:Event[];  
  constructor(private sibiService: SiblingEventService) { 
    this.localItem = localStorage.getItem("events");
    if(this.localItem == null){
      this.events = []
    }
    else{
      //console.log(this.localItem);
      this.events = JSON.parse(this.localItem)
      this.totalLength = this.events.length;
    }
    
  }

  ngOnInit(): void{
    this.sibiService.currData.subscribe((event) =>{
      if(event.active != false){
        this.addNewEvent(event);
      }
    });
  }

  deleteClicked(event:Event){
    const index = this.events.indexOf(event);
    this.events.splice(index,1);
    localStorage.setItem("events",JSON.stringify(this.events));
  }
  addNewEvent(event:Event){
    console.log(this.events);
    this.events.push(event);
    console.log(this.events);
    localStorage.setItem("events",JSON.stringify(this.events));
  }

}*/
