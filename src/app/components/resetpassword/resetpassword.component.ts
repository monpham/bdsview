import {Component, OnInit} from '@angular/core';
import {HttpsServiceService} from '../../service/https-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../service/notification.service';
import {environment} from '../../../environments/environment.prod';

const USER_COUNT_API = environment.apiEndpoint + '/api/auth';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  public token: String;
  formm: any;
  password: String;
  rspassword: String;
  check: boolean = true;

  constructor(
    private httpService: HttpsServiceService,
    private router: ActivatedRoute,
    private route: Router,
    private notification: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.token = this.router.snapshot.queryParamMap.get('token');
  }

  resetpassword(token: String, password: String) {
    if (this.password !== this.rspassword) {
      this.notification.showNotification('Không hợp lệ', 'Mật khẩu không khớp', 'danger');
      this.check = false;
    }
    if (this.password == '') {
      this.notification.showNotification('Không hợp lệ', 'không được để trống mật khẩu', 'danger');
      this.check = false;
    }
    if (this.rspassword == '') {
      this.notification.showNotification('Không hợp lệ', 'không được để trống xác nhận mật khẩu', 'danger');
      this.check = false;
    }
    if (this.check) {
      this.httpService.postReq(USER_COUNT_API + '/reset_password', {token: token, password: password}).subscribe(data => {
        console.log(data);
        console.log({token: token, password: password});
      });
    }
  }
}
