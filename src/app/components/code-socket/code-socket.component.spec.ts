import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSocketComponent } from './code-socket.component';

describe('CodeSocketComponent', () => {
  let component: CodeSocketComponent;
  let fixture: ComponentFixture<CodeSocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeSocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
