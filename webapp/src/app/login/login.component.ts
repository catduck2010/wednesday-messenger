import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor() {
  }
// innerHTML
  content = '<div class="form-wrapper">' +
    '<div class="logo">' +

    '</div>' +


    '<form>' +
    /*'<div class="form-group">'+
        '<input type="text" class="form-control" placeholder="Username or email" required autofocus>'+
    '</div>'+
    '<div class="form-group">'+
        '<input type="password" class="form-control" placeholder="Password" required>'+
    '</div>'+*/

    '<div class="form-group d-flex justify-content-between">' +
    '<div class="custom-control custom-checkbox">' +
    /*'<input type="checkbox" class="custom-control-input" checked="" id="customCheck1">'+*/
    /*'<label class="custom-control-label" for="customCheck1">Remember me</label>' +*/
    '</div>' +
    /*'<a href="./reset-password.html">Reset password</a>'+*/
    '</div>' +

    /*'<button class="btn btn-primary btn-block">Sign in</button>'+*/
    /*'<hr>'+
    '<p class="text-muted">Login with your social media account.</p>'+
    '<ul class="list-inline">'+
        '<li class="list-inline-item">'+
            '<a href="#" class="btn btn-floating btn-facebook">'+
                '<i class="fa fa-facebook"></i>'+
            '</a>'+
        '</li>'+
        '<li class="list-inline-item">'+
            '<a href="#" class="btn btn-floating btn-twitter">'+
                '<i class="fa fa-twitter"></i>'+
            '</a>'+
        '</li>'+
        '<li class="list-inline-item">'+
            '<a href="#" class="btn btn-floating btn-dribbble">'+
                '<i class="fa fa-dribbble"></i>'+
            '</a>'+
        '</li>'+
        '<li class="list-inline-item">'+
            '<a href="#" class="btn btn-floating btn-linkedin">'+
                '<i class="fa fa-linkedin"></i>'+
            '</a>'+
        '</li>'+
        '<li class="list-inline-item">'+
            '<a href="#" class="btn btn-floating btn-google">'+
                '<i class="fa fa-google"></i>'+
            '</a>'+
        '</li>'+
        '<li class="list-inline-item">'+
            '<a href="#" class="btn btn-floating btn-behance">'+
                '<i class="fa fa-behance"></i>'+
            '</a>'+
        '</li>'+
        '<li class="list-inline-item">'+
            '<a href="#" class="btn btn-floating btn-instagram">'+
                '<i class="fa fa-instagram"></i>'+
            '</a>'+
        '</li>'+
    '</ul>'+

    '<hr>'+*/

    /*'<a href="./register.html" class="btn btn-outline-light btn-sm">Register now!</a>'+*/
    '</form>' +

    '</div>';


  ngOnInit(): void {
  }

}
