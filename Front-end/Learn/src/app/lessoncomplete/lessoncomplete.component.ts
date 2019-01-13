import { Component, OnInit } from '@angular/core';
import { LoginTokenService } from '../shared/loginToken/login-token.service';

@Component({
  selector: 'app-lessoncomplete',
  templateUrl: './lessoncomplete.component.html',
  styleUrls: ['./lessoncomplete.component.scss']
})
export class LessoncompleteComponent implements OnInit {

  constructor(private logintoken:LoginTokenService) {
    this.logintoken.LoadComplete(false);
  }

  ngOnInit() {
  }

}
