import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const COURSE_BACKEND_URL = environment.apiUrl +'courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

constructor(private http:HttpClient) { }

createCourse = async(obj:any)=> new Promise<any>((resolve,reject)=>{

 const data :any = obj;

 this.http.post<any>(COURSE_BACKEND_URL,data)
 .subscribe(
  (response)=>{
    resolve(response);
  },
  (error)=>{
    reject(error);
  }
 )


})


getCourse = async(query:any)=> new Promise<any>((resolve,reject)=>{
  this.http.get<any>(COURSE_BACKEND_URL+query)
  .subscribe(
   (response)=>{
     resolve(response);
   },
   (error)=>{
     reject(error);
   }
  )
 
 
 })


 updateCourse = async(id:any,obj:any)=> new Promise<any>((resolve,reject)=>{

  const data :any = obj;
 
  this.http.put<any>(COURSE_BACKEND_URL+"/"+id,data)
  .subscribe(
   (response)=>{
     resolve(response);
   },
   (error)=>{
     reject(error);
   })

 })


 filterCourse = async(query:any)=> new Promise<any>((resolve,reject)=>{
  this.http.get<any>(COURSE_BACKEND_URL+'/filter'+query)
  .subscribe(
   (response)=>{
     resolve(response);
   },
   (error)=>{
     reject(error);
   }
  )
 
 
 })

}
