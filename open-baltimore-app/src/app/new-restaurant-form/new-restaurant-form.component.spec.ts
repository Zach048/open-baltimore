import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRestaurantFormComponent } from './new-restaurant-form.component';

describe('NewRestaurantFormComponent', () => {
  let component: NewRestaurantFormComponent;
  let fixture: ComponentFixture<NewRestaurantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRestaurantFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRestaurantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
