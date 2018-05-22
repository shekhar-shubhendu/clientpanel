import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  timeout = 3000;
  position: SnotifyPosition = SnotifyPosition.rightBottom;
  progressBar = true;
  closeClick = true;
  newTop = true;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 80;

  constructor(private auth: AuthService, private router: Router, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.auth.getAuth().subscribe( afauth => {
        if (afauth) {
          this.router.navigate(['/']);
        }
    });
  }

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }

  onSubmit = () => {
    this.auth.login(this.email, this.password).then(result => {
      this.snotifyService.success('Login Successful', this.getConfig());
      this.router.navigate(['/']);
    }).catch( err => {
      this.snotifyService.error(err.message, this.getConfig());
    });
  }

}
