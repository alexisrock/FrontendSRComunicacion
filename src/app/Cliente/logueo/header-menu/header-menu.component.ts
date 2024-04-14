import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  constructor(public auth: AuthService ,public router: Router,) { }

  ngOnInit(): void {
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('');
  }
}
