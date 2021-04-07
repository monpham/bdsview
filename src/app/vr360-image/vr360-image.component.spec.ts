import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vr360ImageComponent } from './vr360-image.component';

describe('Vr360ImageComponent', () => {
  let component: Vr360ImageComponent;
  let fixture: ComponentFixture<Vr360ImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vr360ImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vr360ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
