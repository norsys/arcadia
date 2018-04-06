import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  @Input() swipeValue = false;
  @Output() onSwipe = new EventEmitter<boolean>();
  public resetemail: string;
  public error = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  displayResetPassword() {
    return this.swipeValue;
  }

  onSubmit() {
    console.log('-------------on submit reset password ');
  }

  swipsignin() {
    this.router.navigate(['/login']);
  }
}
