import { Component, OnInit } from '@angular/core';


interface LoginFormData {
  email?:string;
  password?:string
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  val: LoginFormData = {};

  constructor() {


  }

  ngOnInit() {

  }

  login(val: LoginFormData) {

    console.log('Received form value: ', val);

    console.log('Form value: ', this.val);

  }

}
