import { Component, OnInit, Input } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  userInfo: any;

  public sidebarOpened = false;
  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }

  constructor(
    config: NgbDropdownConfig, 
    private userService: UserService,
    private router: Router
  ) {
    config.placement = 'bottom-right';
   }

  ngOnInit() {
    this.userService.getUserInfo().subscribe((data: any) => {
      this.userInfo = data;
      
    },(err: any) => {

    });
  }

  Logout() {
    localStorage.removeItem('_token');
    this.router.navigate(['/login']);
    return false;
  }

}
