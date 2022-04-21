import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../common/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user:any;
  getParamId: any;
  updateValidator: boolean; //If value is changed, updateValidator becomes true and update button is enabled
  
  constructor(private apiService:ApiService, private currRoute:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getParamId = this.currRoute.snapshot.paramMap.get('id');
    this.apiService.getSingleUserData(this.getParamId).subscribe({
      next:(res)=>{
        //console.log(res.data[0]);
        this.user = res.data[0];
        if(this.user){
          this.userForm.patchValue({
            name:this.user.name,
            email:this.user.email,
            password:this.user.password,
            confirmPassword: this.user.password,
            address:this.user.address,
            zipCode: this.user.zipCode
          })
        }
      },
      error:(err)=>console.error(err)
    })
    this.updateValidator = true;
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
    this.apiService.addUserData(this.userForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigate(['/login']);
      },
      error:(err)=>console.error(err)
    });
  }

  // To check if the input value is actually changed or not
  notChanged(){
    if(this.user){
    if(this.user.name == this.name?.value && this.user.address == this.address?.value && this.user.zipCode == this.zipCode?.value){
      this.updateValidator = true;
    } else{
      this.updateValidator = false;
    }
  }
}
  userEdit(){
    this.apiService.updateUserData(this.getParamId,this.userForm.value).subscribe({
      next:(res)=>console.log(res),
      error:(err)=>console.error(err)
    })
  }

}
