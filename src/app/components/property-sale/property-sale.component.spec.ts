import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySaleComponent } from './property-sale.component';

describe('PropertySaleComponent', () => {
  let component: PropertySaleComponent;
  let fixture: ComponentFixture<PropertySaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertySaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
