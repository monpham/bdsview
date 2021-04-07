import {Component, OnInit} from '@angular/core';
import {LoginInfo} from '../../auth/login-info';
import {AuthService} from '../../auth/auth.service';
import {StorageService} from '../../auth/storage.service';
import {Router} from '@angular/router';
import {HttpsServiceService} from '../../service/https-service.service';
import {NotificationService} from '../../service/notification.service';
import {MatDialog} from '@angular/material';
import {SendemailComponent} from '../sendemail/sendemail.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username: string;
  private loginInfo: LoginInfo;
  isAdmin = false;

  constructor(private notification: NotificationService, private authService: AuthService, private tokenstorage: StorageService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  login() {
    this.loginInfo = new LoginInfo(this.form.username, this.form.password);
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        if (data.authorities[0].authority == 'ROLE_PM') {
          this.tokenstorage.setIsAdmin(true);
        }
        this.tokenstorage.saveAuthorities(data.authorities);
        this.tokenstorage.saveToken(data.token);
        this.tokenstorage.saveUsername(data.username);
        this.tokenstorage.saveName(data.name);
        this.tokenstorage.setIsAccountLoggedin(true);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.username = this.tokenstorage.getUsername();
        this.notification.showNotification('Đăng nhập thành công', 'Đăng nhập thành công', '');
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = '';
        console.log(error.error);
        if (error.error.errors) {
          error.error.errors.forEach(errorr => {
            this.errorMessage += errorr.field + ' ' + errorr.defaultMessage + '\n';
          });
        } else {
          this.errorMessage = error.error.message;
        }
        this.isLoginFailed = true;
      }
    );
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(ResetpasswordFormComponent, {
  //     width: '850px',
  //     height: '850px',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.ngOnInit();
  //   });
  // }
  resetpassword() {
    const dialogRef = this.dialog.open(SendemailComponent, {
      width: '650px',
      height: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.ngOnInit();
    });
  }
}
