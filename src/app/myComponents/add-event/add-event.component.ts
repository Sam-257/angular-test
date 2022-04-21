import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../common/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  user_id:any;
  start:any;
  end:any;
  constructor(private apiService:ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('id');
    this.eventForm.controls['user_id'].setValue(this.user_id);
  }

  eventForm = this.formBuilder.group({
    title:['',Validators.required],
    description:['',Validators.required],
    event_start:['',Validators.required],
    event_end:['',Validators.required],
    user_id: ['']
  });

  // 2022-04-14T13:10:32.000Z
  onSubmit(){
    console.log(this.eventForm.value);
    this.start = this.eventForm.controls['event_start'].value;
    console.log(this.start);
    this.apiService.addData(this.eventForm.value).subscribe({
      next:(res)=>console.log(res),
      error:(err)=>console.error(err)
    });
  }

}
