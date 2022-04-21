import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common/api.service';

@Component({
  selector: 'app-get-events',
  templateUrl: './get-events.component.html',
  styleUrls: ['./get-events.component.scss']
})
export class GetEventsComponent implements OnInit {
  user_id:any;
  beforeEvents:any;
  ongoingEvents:any;
  afterEvents:any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('id');
    this.apiService.getBeforeEvents(this.user_id).subscribe((res)=>{
      this.beforeEvents = res.data;
    });
    this.apiService.getOngoingEvents(this.user_id).subscribe((res)=>{
      this.ongoingEvents = res.data;
    });
    this.apiService.getAfterEvents(this.user_id).subscribe((res)=>{
      this.afterEvents = res.data;
    });
  }

}
