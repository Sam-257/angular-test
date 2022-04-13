import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../common/api.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  users:any;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getUserData().subscribe({
      next:(res)=>{
      this.users = res.data
      },
      error:(err)=>console.error(err)
    });
  }
  
  deleteClicked(id:any){
    this.apiService.deleteUserData(id).subscribe((res)=>{
      console.log(res);
      this.apiService.getUserData().subscribe((res)=>{
        this.users = res.data;
      });
    });
  }

}
