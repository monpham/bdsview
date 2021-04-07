import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {ToastrService} from 'ngx-toastr';
import {SocketService} from '../../service/socket.service';
import {BehaviorSubject, from, merge, Observable, of, Subject, Subscription} from 'rxjs';
import {Message, SendMessageEvent, User} from '@progress/kendo-angular-conversational-ui';
import {StorageService} from '../../auth/storage.service';
import {environment} from '../../../environments/environment.prod';
import {scan} from 'rxjs/operators';
import {HttpsServiceService} from '../../service/https-service.service';

const SOCKET_API = environment.apiEndpoint + '/api/socket';

@Component({
  selector: 'code-socket',
  templateUrl: './code-socket.component.html',
  styleUrls: ['./code-socket.component.css']
})
export class CodeSocketComponent implements OnInit {
  public feed: Observable<Message[]>;
  private stompClient;
  isLoaded: boolean = false;
  private serverUrl = environment.apiEndpoint + '/socket';
  public user: User = {
    id: 1
  };
  subscription: Subscription;

  public toUser: User = {
    id: 0
  };
  messageList: Message[] = [];
  private local: Subject<Message> = new Subject<Message>();

  constructor(private storage: StorageService, private toastr: ToastrService, private socketService: SocketService,
              private httpService: HttpsServiceService) {
    this.feed = merge(
      this.local
    ).pipe(
      scan((acc: Message[], x: Message) => [...acc, x], [])
    );
  }

  ngOnInit(): void {
    this.user.id = this.storage.getUsername();
    this.user.name = this.storage.getName();
    this.initializeWebSocketConnection();
  }

  onParticipantClickedFromFriendsList($event: any) {
    this.toUser.id = $event.user.username;
    this.toUser.name = $event.user.fullName;
    this.openSocket();
  }

  openSocket() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
    this.feed = of([]);
    this.feed = merge(
      this.local
    ).pipe(
      scan((acc: Message[], x: Message) => [...acc, x], [])
    );
    this.httpService.post(SOCKET_API + '/getContact', {fromId: this.user.id, toId: this.toUser.id}).subscribe(
      data => {
        data.forEach(item => {
          this.local.next({
            author: {id: item.fromUser.username, name: item.fromUser.username == this.user.id ? this.user.name : this.toUser.name},
            text: item.content
          });
        });
      }
    );
    this.subscription = this.stompClient.subscribe('/socket-publisher/' + this.user.id, (message) => {
      this.handleResult(message);
    });
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/socket-publisher', (message) => {
      this.handleResult(message);
    });
  }

  handleResult(message) {
    if (message.body) {
      let messageResult: any = JSON.parse(message.body);
      this.local.next({
        author: {id: messageResult.fromId, name: messageResult.fromId == this.user.id ? this.user.name : this.toUser.name},
        text: messageResult.message
      });
      this.toastr.success('new message recieved', null, {
        'timeOut': 3000
      });
    }
  }

  public sendMessage(e: SendMessageEvent): void {
    let message: any = {message: e.message.text, fromId: this.user.id, toId: this.toUser.id};

    this.socketService.post(message).subscribe(res => {
      this.messageList.push({author: {id: 3, name: 'ggg'}, text: res.message});
      // this.local.next(e.message);
    });
  }

}
