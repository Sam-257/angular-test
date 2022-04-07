import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  correctCred:Boolean;
  constructor(private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
    
  }

  loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  loginClicked(){
    this.apiService.loginUser(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.correctCred = res.auth;
        console.log(this.correctCred);
        localStorage.setItem('Bearer',res.Bearer);
        localStorage.setItem('id',res.id);
        this.router.navigate(['/home']);
      },
      error:(err)=>{
        this.correctCred = false;
      }
    });
  }
}
