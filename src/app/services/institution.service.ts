import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const INSTITUTION_BACKEND_URL = environment.apiUrl +'institutions';

@Injectable({
  providedIn: 'root'
})

export class InstitutionService {

  constructor(private http:HttpClient ) { }

  createInstitution = async(obj:any) => new Promise<any>((resolve,reject)=>{
      const data:any =obj;
      console.log(data);

      this.http.post<any>(INSTITUTION_BACKEND_URL,data)
      .subscribe(
        response=>{
          resolve(response)
        },
        error =>{
          reject(error)
        }
      )
  })

  getInstitutions = async() => new Promise<any>((resolve,reject)=>{
    this.http.get<any>(INSTITUTION_BACKEND_URL)
    .subscribe(
      response=>{
        resolve(response)
      },
      error =>{
        reject(error)
      }
    )
})

updateInstitution = async(id:any,obj:any) => new Promise<any>((resolve,reject)=>{
  const data:any =obj;
  console.log(data);

  this.http.put<any>(INSTITUTION_BACKEND_URL+"/"+id,data)
  .subscribe(
    response=>{
      resolve(response)
    },
    error =>{
      reject(error)
    }
  )
})


filterInstitution = async(query:any)=> new Promise<any>((resolve,reject)=>{
  this.http.get<any>(INSTITUTION_BACKEND_URL+'/filter'+query)
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
