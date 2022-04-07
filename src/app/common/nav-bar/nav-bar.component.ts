import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/myComponents/api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userId:any;
  constructor(public apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
    
  }

  edit(){
    this.userId = localStorage.getItem('id');
    this.router.navigate(['/register',this.userId]);
  }
  logout(){
    localStorage.removeItem('Bearer');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }
  
}
