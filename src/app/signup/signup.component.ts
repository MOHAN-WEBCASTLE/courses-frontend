import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:any;
  submitted:any =false;
  
   constructor(private formBuilder:FormBuilder,
    private userService:UsersService ,
    private router:Router) { }
 
   ngOnInit(): void {
     this.signupForm = this.formBuilder.group({
       name:new FormControl('',Validators.required),
       email:new FormControl('',Validators.required),
       phone:new FormControl('',Validators.required),
       password:new FormControl('',Validators.required),
       user_type:new FormControl('admin',Validators.required)
   })
   }
  //  get loginControl() 
  //  {
  //      return this.loginForm.controls;
  //  }
   onSubmit()
   {
   
     console.log("SUBMIT EXECUTED");
     console.log(this.signupForm.value);
     this.userService.createUser(this.signupForm.value)
     .then((user_res)=>{
      console.log(user_res);
      localStorage.setItem("isLoggedIn", 'true');
      localStorage.setItem("user_details", JSON.stringify(user_res));
      this.router.navigate(['/']);
     })
     .catch((error)=>{
      console.log(error);
      prompt(error);
     })
     
   }
}
