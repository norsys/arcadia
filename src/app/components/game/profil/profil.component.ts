import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alien } from '../../../models';
import { AuthService } from '../../../services/auth.service';
import { DisplayService } from '../../../services/display.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public alien: Alien;

  public avatars: Array<String> = [
    'avatar-1',
    'avatar-2',
    'avatar-3',
    'avatar-5',
    'avatar-6',
    'avatar-7',
  ]

  constructor(private router: Router,
    private auth: AuthService,
    private displayService: DisplayService) {
  }
  ngOnInit() {
    this.alien = this.auth.getCurrentUser();
  }

  selectAvatar(avatar: string) {
    this.alien.avatar = avatar;
  }
  isSelected(avatar: string) {
    return this.alien.avatar === avatar;
  }

  onSubmit() {
    this.auth.updateUser(this.alien).then((response) => {
      this.auth.setAlienInLocalStorage(response.json());
      this.router.navigate(['/home']);
    }).catch(err => console.log(err));
  }

  logout() {
    this.auth.logout().then((alien) => {
      localStorage.removeItem("user_arcadia");
      this.displayService.setShowHeader(false);
      this.router.navigate(['/']);
    }).catch((err) => {
      localStorage.removeItem("user_arcadia");
      this.router.navigate(['/']);
      console.log(err);
    });
  }
}
