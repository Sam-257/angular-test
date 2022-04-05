import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user:any;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  userForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.pattern(/^[A-Za-z0-9_]*$/), Validators.minLength(4), Validators.maxLength(12)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{4,20}')]),
    confirmPassword: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    zipCode: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]/),Validators.minLength(6),Validators.maxLength(6)])
  })

  get name(){
    return this.userForm.get('name');
  }
  get email(){
    return this.userForm.get('email');
  }
  get password(){
    return this.userForm.get('password');
  }
  get confirmPassword(){
    return this.userForm.get('confirmPassword');
  }
  get address(){
    return this.userForm.get('address');
  }
  get zipCode(){
    return this.userForm.get('zipCode');
  }


  newUserSubmit(){
    console.log(this.userForm.value);
    this.user = this.userForm.value;
    this.apiService.addUserData(this.user).subscribe({
      next:(res)=>console.log(res),
      error:(err)=>console.error(err)
    });
  }
}
