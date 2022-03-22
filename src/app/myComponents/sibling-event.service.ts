import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';
import { Event } from 'src/app/Event'
@Injectable({
  providedIn: 'root'
})
export class SiblingEventService {
  // For transfering data between siblings
  ev:Event = {
    sno: 0,
    title: '',
    description: '',
    active: false
  }
  private formData = new BehaviorSubject<Event>(this.ev);
  currData = this.formData.asObservable();
  constructor() { }

  sendEvent(event:Event){
    //console.log(event);
    this.formData.next(event)
    this.formData.next(this.ev)
  }

}
