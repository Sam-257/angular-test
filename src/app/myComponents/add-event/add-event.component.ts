import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import { ApiService } from '../../common/api.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  title:string
  description:string

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const event = {
      'title': this.title,
      'description': this.description,
      'user_id': localStorage.getItem('id')
    };
    this.apiService.addData(event).subscribe({
      next:(res)=>console.log(res),
      error:(err)=>console.error(err)
    });
  }

}
