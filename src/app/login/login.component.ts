import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
// import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  loginForm:any;
  submitted:any =false;
  
   constructor(private formBuilder:FormBuilder,
    private userService:UsersService,
    private router:Router) { }
 
   ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
       email:new FormControl('',Validators.required),
       password:new FormControl('',Validators.required)
   })
   }
  //  get loginControl() 
  //  {
  //      return this.loginForm.controls;
  //  }
   onSubmit()
   {
     console.log("SUBMIT EXECUTED");
     console.log(this.loginForm.value);
     
     this.userService.loginUser(this.loginForm.value)
     .then((user_res)=>{
      console.log(user_res);
  
       localStorage.setItem("isLoggedIn", 'true');
        localStorage.setItem("user_details", JSON.stringify(user_res));
        this.router.navigate(['/']);  
      })
     .catch((error)=>{
      console.log(error);
      
     })
  
     
   }
 
 }