import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '@progress/kendo-angular-conversational-ui';
import {HttpsServiceService} from '../../service/https-service.service';
import {environment} from '../../../environments/environment.prod';
import {StorageService} from '../../auth/storage.service';

const AGENT_API = environment.apiEndpoint + '/api/agent';

@Component({
  selector: 'app-chat-friend-list',
  templateUrl: './chat-friend-list.component.html',
  styleUrls: ['./chat-friend-list.component.scss',
  ]
})
export class ChatFriendListComponent implements OnInit {

  constructor(private httpsServiceService: HttpsServiceService, public storage : StorageService) {
  }

  isCollapsed = false;

  ngOnInit(): void {
    this.httpsServiceService.getAll(AGENT_API).subscribe(data => {
      console.log(data);
      this.participants = data;
    });
  }

  public participants: any[];

  @Input()
  public userId: any;

  @Input()
  public shouldDisplay: boolean;

  @Input()
  public searchEnabled: boolean;

  @Output()
  public onParticipantClicked: EventEmitter<any> = new EventEmitter();

  @Output()
  public onOptionPromptCanceled: EventEmitter<any> = new EventEmitter();

  @Output()
  public onOptionPromptConfirmed: EventEmitter<any> = new EventEmitter();

  public selectedUsersFromFriendsList: User[] = [];

  public searchInput: string = '';

  get filteredParticipants(): any[] {
    if (this.searchInput.length > 0) {
      // Searches in the friend list by the inputted search string
      return this.participants.filter(x => x.displayName.toUpperCase().includes(this.searchInput.toUpperCase()));
    }
    return this.participants;
  }

  isUserSelectedFromFriendsList(user: User): boolean {
    return (this.selectedUsersFromFriendsList.filter(item => item.id == user.id)).length > 0;
  }


  cleanUpUserSelection = () => this.selectedUsersFromFriendsList = [];

  // Toggle friends list visibility
  onChatTitleClicked(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onFriendsListCheckboxChange(selectedUser: User, isChecked: boolean): void {
    if (isChecked) {
      this.selectedUsersFromFriendsList.push(selectedUser);
    } else {
      this.selectedUsersFromFriendsList.splice(this.selectedUsersFromFriendsList.indexOf(selectedUser), 1);
    }
  }

  onUserClick(clickedUser: User): void {
    console.log(clickedUser);
    this.onParticipantClicked.emit(clickedUser);
  }

  onFriendsListActionCancelClicked(): void {
    this.onOptionPromptCanceled.emit();
    this.cleanUpUserSelection();
  }

  onFriendsListActionConfirmClicked(): void {
    this.onOptionPromptConfirmed.emit(this.selectedUsersFromFriendsList);
    this.cleanUpUserSelection();
  }

}
