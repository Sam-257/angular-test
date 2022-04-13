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
        this.events = res.data;
      });
    });
  }

}
