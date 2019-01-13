import { Component } from '@angular/core';
import { LoginTokenService } from './shared/loginToken/login-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private loginToken:LoginTokenService){

  }
  checkToken(){
      this.loginToken.checkToken();
  }
}
