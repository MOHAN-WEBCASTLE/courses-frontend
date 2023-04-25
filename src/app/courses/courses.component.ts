import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css','./courses-overlay.component.css']
})
export class CoursesComponent implements OnInit {

  
  sales:any;
  overlayStatus:boolean = false;
  addoverlay:boolean = false;
  editoverlay:boolean = false;
  institutionId:any;
  courseList:any;
  selectedCourseId:any;

  filterForm:any;
  editCourseForm:any;
  courseForm:any;

  constructor(private route:ActivatedRoute,
              private formBuilder:FormBuilder,
              private courseService:CourseService ) { }

  ngOnInit(): void {
    this.overlayStatus = false;
    this.addoverlay = false;
    this.editoverlay = false;
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.institutionId = params['id'];
    });


    this.courseForm = this.formBuilder.group({
      name:new FormControl('',Validators.required),
      level:new FormControl('',Validators.required),
      duration:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required)
    })


    this.editCourseForm = this.formBuilder.group({
      name:new FormControl('',Validators.required),
      level:new FormControl('',Validators.required),
      duration:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required),
      status:new FormControl('',Validators.required)
    })


    this.filterForm = this.formBuilder.group({
      name:new FormControl(''),
      status:new FormControl('')
    })

   this.courseService.getCourse('?institutionId='+this.institutionId)
   .then((course_res)=>{
    console.log(course_res);
    this.courseList = course_res;
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

  onSubmit()
  {
    let data =this.courseForm.value;
    data.institutionId = this.institutionId;
    console.log(data);
    this.courseService.createCourse(data)
    .then((res)=>{
      console.log(res);
      this.courseForm.reset();
      this.ngOnInit();
    })
    .catch((error)=>{
      console.log(error); 
    })
  }

  edit(course:any)
  {
    console.log(course);
    this.editCourseForm.setValue({
      name:course.name,
      level:course.level,
      duration:course.duration,
      price:course.price,
      status:course.status
    })
    this.selectedCourseId = course._id;
  }

  update()
  {
    console.log(this.editCourseForm.value);
    this.courseService.updateCourse(this.selectedCourseId,this.editCourseForm.value)
    .then((course_res)=>{
      console.log(course_res);
      this.ngOnInit();
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }

  filter()
  {
     console.log(this.filterForm.value);
    this.courseService.filterCourse('?institutionId='+this.institutionId+"&name="+this.filterForm.value.name+"&status="+this.filterForm.value.status)
    .then((course_res)=>{
     console.log(course_res);
     this.courseList = course_res;
    })
    .catch((error)=>{
     console.log(error);
    })
  }
}
