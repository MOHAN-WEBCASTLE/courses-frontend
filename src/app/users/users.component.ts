import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormControl, Validators,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css','./users-overlay.component.css']
})
export class UsersComponent implements OnInit {
  sales:any;
  overlayStatus:boolean = false;
  addoverlay:boolean = false;
  editoverlay:boolean = false;
  usersList:any;
  filterForm:any;
  user_details:any;
  selectedUserId:any
  editUserForm:any;
  constructor(private userService:UsersService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    
    this.overlayStatus = false;
    this.addoverlay = false;
    this.editoverlay = false;

    let user:any = localStorage.getItem("user_details")
    this.user_details= JSON.parse(user);
    console.log(this.user_details);
    this.userService.getUsers('')
    .then((user_res)=>{
      console.log(user_res);
      this.usersList = user_res;
    })
    .catch((error)=>{
      console.log(error);
      
    })

    this.filterForm = this.formBuilder.group({
      name:new FormControl(''),
      status:new FormControl('')
    })
   
    this.editUserForm = this.formBuilder.group({
      name:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      status:new FormControl('',Validators.required)
    })


  }

  filter()
  {
     console.log(this.filterForm.value);
    this.userService.filterUsers("?name="+this.filterForm.value.name+"&status="+this.filterForm.value.status)
    .then((user_res)=>{
     console.log(user_res);
     this.usersList = user_res;
    })
    .catch((error)=>{
     console.log(error);
    })
  }

  showOverlay(type:any)
  {
    if(type == 'add')
    {
      this.addoverlay = true;
      this.editoverlay = false;
    }
    else if(type == 'edit')
    {
      this.editoverlay = true;
      this.addoverlay = false;
    }
    this.overlayStatus = true;
  }
  closeOverlay()
  {
    this.overlayStatus = false; 
  }


  edit(user:any)
  {
    console.log(user);
    this.editUserForm.setValue({
      name:user.name,
      email:user.email,
      phone:user.phone,
      status:user.status
    })
    this.selectedUserId = user._id;
  }

  
  update()
  {
    console.log(this.editUserForm.value);
    this.userService.updateUser(this.selectedUserId,this.editUserForm.value)
    .then((user_res)=>{
      console.log(user_res);
      this.ngOnInit();
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }
}
