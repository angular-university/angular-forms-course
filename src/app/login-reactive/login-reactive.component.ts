import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'login',
    templateUrl: './login-reactive.component.html',
    styleUrls: ['./login-reactive.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LoginReactiveComponent implements OnInit {


  constructor() {


  }

  ngOnInit() {

  }

}
