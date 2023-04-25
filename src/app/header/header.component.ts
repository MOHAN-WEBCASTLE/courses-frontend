import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sidebar:any = [true,false];

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
    let url = this.router.url;
    let val = url.includes('institution');
    let val1 = url.includes('course');
    if(val || val1 )
    {
      this.sidebar = [false,true];
    }
    
    
  }

  sideBarDom(val:any)
  {
    this.sidebar[val]=true;
   for(let i=0;i<this.sidebar.length;i++)
   {
    if(i!=val)
    {
      this.sidebar[i]=false;
    }
   }
  }

  logout()
  {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_details');
    this.router.navigate(['/login']);
  }
}
