import { Component, OnInit } from "@angular/core";
import { FormGroup,FormBuilder,Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService, AlertsService } from "../services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username;
  password;
  mouseoverLogin;
  loginInvalid = false;
  loginForm: FormGroup;
  private formSubmitAttempt: boolean;

  constructor( private authService:AuthService,
     private router:Router,
     private fb:FormBuilder,
     private alertsService: AlertsService

  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName:['', Validators.required],
      password:['', Validators.required]
    })
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  login(user) {
    this.authService.loginUser(user.userName, user.password)
      .subscribe(
        response => {
          console.log(response);
          if(response){
            localStorage.setItem('user',JSON.stringify(response));
            this.router.navigate(["/checkin"]);
          }else{
            this.alertsService.setAlert('error', 'Ooops! We encountered an error processing your request.');
          }
        },
        error => {
          this.alertsService.handleError(error);
        }
      );

  }

}