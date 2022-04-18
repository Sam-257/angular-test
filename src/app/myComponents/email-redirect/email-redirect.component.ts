import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/common/api.service';

@Component({
  selector: 'app-email-redirect',
  templateUrl: './email-redirect.component.html',
  styleUrls: ['./email-redirect.component.scss']
})
export class EmailRedirectComponent implements OnInit {
  token:any;
  constructor(private apiService: ApiService, private currRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.currRoute.snapshot.params['token'];
    console.log(this.token);
  }
  verify(){
    this.apiService.emailVerification(this.token).subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigate(['/login']);
      },
      error:(err)=>console.error(err)
    });
  }
}
function token(token: any) {
  throw new Error('Function not implemented.');
}

