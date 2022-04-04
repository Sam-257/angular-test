import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import { Event } from 'src/app/Event';
//import { SiblingEventService } from '../sibling-event.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  title:string
  description:string
  //@Input() nad @Output useful for parent-child data transfer
  //@Output() addEvent: EventEmitter<Event> = new EventEmitter();

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const event = {
      'title': this.title,
      'description': this.description
    };
    this.apiService.addData(event).subscribe({
      next:(res)=>console.log(res),
      error:(err)=>console.error(err)
    });
  }
  
  
  
  /*onSubmit(){
    const event = {
      sno: 9,
      title: this.title,
      description: this.description,
      active: true
    }
    //console.log(event);
    //this.addEvent.emit(event);
    this.sibiService.sendEvent(event);
  }*/

}
