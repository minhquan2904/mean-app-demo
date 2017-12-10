import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  user: {
    username: "admin",
    firstname: "minh",
    lastname: "quan"
  }
  constructor() {
    // get current user
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));      
   }

  ngOnInit() {
  }

}
