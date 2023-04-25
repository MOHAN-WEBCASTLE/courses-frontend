import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const USER_BACKEND_URL = environment.apiUrl +'users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }


  getUsers = async(query:any)=> new Promise<any>((resolve,reject)=>{
    this.http.get<any>(USER_BACKEND_URL)
    .subscribe(
     (response)=>{
       resolve(response);
     },
     (error)=>{
       reject(error);
     }
    )
   
   
   })



   filterUsers = async(query:any)=> new Promise<any>((resolve,reject)=>{
    this.http.get<any>(USER_BACKEND_URL+'/filter'+query)
    .subscribe(
     (response)=>{
       resolve(response);
     },
     (error)=>{
       reject(error);
     }
    )
   })



   createUser = async(obj:any)=> new Promise<any>((resolve,reject)=>{

    const data :any = obj;
   
    this.http.post<any>(USER_BACKEND_URL+'/register',data)
    .subscribe(
     (response)=>{
       resolve(response);
     },
     (error)=>{
       reject(error);
     }
    )
   })

   loginUser = async(obj:any)=> new Promise<any>((resolve,reject)=>{

    const data :any = obj;
   
    this.http.post<any>(USER_BACKEND_URL+'/login',data)
    .subscribe(
     (response)=>{
       resolve(response);
     },
     (error)=>{
       reject(error);
     }
    )
   }) 

   updateUser = async(id:any,obj:any) => new Promise<any>((resolve,reject)=>{
    const data:any =obj;
    console.log(data);
  
    this.http.put<any>(USER_BACKEND_URL+"/"+id,data)
    .subscribe(
      response=>{
        resolve(response)
      },
      error =>{
        reject(error)
      }
    )
  })

}
