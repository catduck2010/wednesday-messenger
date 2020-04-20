import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  content = '<div class="form-wrapper">' +
  '<form>' +
  '<div class="form-group">' +
  // '<input type="text" class="form-control" placeholder="Firstname" required autofocus>' +
  '</div>' +
  '<div class="form-group">' +
  // ' <input type="text" class="form-control" placeholder="Lastname" required>' +
  '</div>' +
  '<div class="form-group">' +
  // '<input type="email" class="form-control" placeholder="Email" required>' +
  '</div>' +
  '<div class="form-group">' +
  // '<input type="password" class="form-control" placeholder="Password" required>' +
  '</div>' +
  // '<button class="btn btn-primary btn-block">Register</button>' +
  '<hr>' +
  // '<p class="text-muted">Already have an account?</p>' +
  // '<a href="./login.html" class="btn btn-outline-light btn-sm">Sign in!</a>' +
  '</form>' +
  '</div>';


  ngOnInit(): void {
  }

}
