import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFriendListComponent } from './chat-friend-list.component';

describe('ChatFriendListComponent', () => {
  let component: ChatFriendListComponent;
  let fixture: ComponentFixture<ChatFriendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFriendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
