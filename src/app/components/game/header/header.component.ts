import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alien } from '../../../models'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public alien: Alien;

  constructor(private router: Router, private auth: AuthService) {
    this.alien = auth.getCurrentUser();
  }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem("user_arcadia");
    this.router.navigate(['/']);
  }
}
