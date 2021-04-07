import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message, SendMessageEvent, User} from '@progress/kendo-angular-conversational-ui';
import {StorageService} from '../../auth/storage.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../../environments/environment.prod';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private localStoreage: StorageService) {
  }

  ngOnInit(): void {

  }

  isSignIn() {
    return this.localStoreage.getToken() != null;

  }

}
