import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InstitutionService } from '../services/institution.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.css','./institutions-overlay.component.css']
})
export class InstitutionsComponent implements OnInit {

  sales:any;
  overlayStatus:boolean = false;
  addoverlay:boolean = false;
  editoverlay:boolean = false;
  institutionForm :any;
  editInstitutionForm:any;
   institutionList:any;
   selectedInstitutionId:any;
   filterForm:any;
  constructor(private formBuilder:FormBuilder,
    private institutionService:InstitutionService,
    private router:Router) { }

  ngOnInit(): void {
    this.overlayStatus = false;
    this.addoverlay = false;
    this.editoverlay = false;
    this.institutionForm = this.formBuilder.group({
      name:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      location:new FormControl('',Validators.required)
    })

    this.editInstitutionForm = this.formBuilder.group({
      name:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      location:new FormControl('',Validators.required),
      status:new FormControl('',Validators.required)
    })

    this.filterForm = this.formBuilder.group({
      name:new FormControl(''),
      status:new FormControl('')
    })

    this.institutionService.getInstitutions()
    .then((ins_res)=>{
      console.log(ins_res);
      this.institutionList = ins_res;
    })
    .catch((err)=>{
      console.log(err);
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

  edit(institution:any)
  {
    console.log(institution);
    this.editInstitutionForm.setValue({
      name:institution.name,
      email:institution.email,
      phone:institution.phone,
      location:institution.location,
      status:institution.status
    })
    this.selectedInstitutionId = institution._id;
  }
  viewCourse(id:any)
  {
    this.router.navigate(['courses/'+id]);
  }

  update()
  {
    console.log(this.editInstitutionForm.value);
    this.institutionService.updateInstitution(this.selectedInstitutionId,this.editInstitutionForm.value)
    .then((ins_res)=>{
      console.log(ins_res);
      this.ngOnInit();
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }
  onSubmit()
  {
    console.log(this.institutionForm.value);   
    this.institutionService.createInstitution(this.institutionForm.value)
    .then((ins_res)=>{
      console.log(ins_res);
      this.ngOnInit();
    })
  }
  filter()
  {
     console.log(this.filterForm.value);
    this.institutionService.filterInstitution("?name="+this.filterForm.value.name+"&status="+this.filterForm.value.status)
    .then((course_res)=>{
     console.log(course_res);
     this.institutionList = course_res;
    })
    .catch((error)=>{
     console.log(error);
    })
  }

}
