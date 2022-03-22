import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import { Event } from 'src/app/Event';
import { SiblingEventService } from '../sibling-event.service';
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

  constructor(private sibiService:SiblingEventService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const event = {
      sno: 9,
      title: this.title,
      description: this.description,
      active: true
    }
    //console.log(event);
    //this.addEvent.emit(event);
    this.sibiService.sendEvent(event);
  }

}
