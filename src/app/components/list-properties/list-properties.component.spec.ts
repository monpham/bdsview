import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropertiesComponent } from './list-properties.component';

describe('ListPropertiesComponent', () => {
  let component: ListPropertiesComponent;
  let fixture: ComponentFixture<ListPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
